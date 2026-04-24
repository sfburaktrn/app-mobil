import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import { GlassCard } from '../../src/components/GlassCard';
import { GrassBackground } from '../../src/components/GrassBackground';
import type { QuizMode, QuizQuestion } from '../../src/data/quiz';
import { quizModes, quizQuestions } from '../../src/data/quiz';
import { tokens } from '../../src/theme/tokens';

type Picked = QuizQuestion & { pickedIndex?: number; correct?: boolean; timedOut?: boolean };

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizRunScreen() {
  const { mode } = useLocalSearchParams<{ mode?: QuizMode }>();
  const quizMode: QuizMode = mode === 'quick' || mode === 'full' ? mode : 'quick';
  const cfg = quizModes[quizMode];

  const questions = useMemo(() => {
    const pool = shuffle(quizQuestions);
    return pool.slice(0, cfg.count);
  }, [cfg.count]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Picked[]>(() => questions.map((q) => ({ ...q })));
  const [locked, setLocked] = useState(false);
  const [ended, setEnded] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(cfg.secondsPerQuestion);

  const t = useRef(new Animated.Value(1)).current; // 1 -> 0 (visual)
  const glow = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = answers[idx];
  const total = answers.length;

  const score = useMemo(
    () => answers.filter((a) => a.correct).length,
    [answers],
  );

  const stopTick = () => {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = null;
  };

  const resetTimer = () => {
    stopTick();
    setSecondsLeft(cfg.secondsPerQuestion);
    t.stopAnimation();
    t.setValue(1);
    Animated.timing(t, {
      toValue: 0,
      duration: cfg.secondsPerQuestion * 1000,
      useNativeDriver: true,
    }).start();

    tickRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (locked) return s;
        if (s <= 1) {
          stopTick();
          // Let the bar finish visually then timeout
          onTimeout();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const cancelTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const goNext = () => {
    cancelTimeout();
    stopTick();
    setLocked(false);
    if (idx >= total - 1) {
      setEnded(true);
      return;
    }
    setIdx((x) => x + 1);
  };

  const onTimeout = () => {
    setLocked(true);
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setAnswers((prev) => {
      const copy = [...prev];
      const q = copy[idx];
      copy[idx] = { ...q, timedOut: true, pickedIndex: undefined, correct: false };
      return copy;
    });
    timeoutRef.current = setTimeout(goNext, 900);
  };

  const pick = (pickIndex: number) => {
    if (locked) return;
    setLocked(true);
    stopTick();
    const correct = pickIndex === current.answerIndex;
    void Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    );
    setAnswers((prev) => {
      const copy = [...prev];
      const q = copy[idx];
      copy[idx] = { ...q, pickedIndex: pickIndex, correct };
      return copy;
    });
    timeoutRef.current = setTimeout(goNext, 950);
  };

  useEffect(() => {
    setEnded(false);
    setLocked(false);
    resetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => {
      loop.stop();
      cancelTimeout();
      stopTick();
    };
  }, []);

  const progress = (idx + 1) / total;

  if (ended) {
    const perfect = score === total;
    return (
      <GrassBackground opacity={0.55}>
        <View style={{ paddingTop: 54, paddingHorizontal: tokens.space.lg, flex: 1 }}>
          <Pressable
            onPress={() => {
              void Haptics.selectionAsync();
              router.back();
            }}
            style={({ pressed }) => [
              {
                width: 44,
                height: 44,
                borderRadius: 22,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(245,230,200,0.06)',
                borderWidth: 1,
                borderColor: tokens.color.border,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Ionicons name="chevron-back" size={22} color={tokens.color.text} />
          </Pressable>

          <View style={{ marginTop: 18 }}>
            <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>Sonuç</Text>
            <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 30, marginTop: 6 }}>
              {score}/{total}
            </Text>
            <Text style={{ color: tokens.color.textMuted, marginTop: 10, lineHeight: 20 }}>
              {perfect
                ? 'Er meydanı bilgisi tam isabet. Tebrikler.'
                : 'Güzel. Bir tur daha at, rekorunu kır.'}
            </Text>
          </View>

          <View style={{ marginTop: 16, gap: 12 }}>
            <GlassCard padding={16} radius={tokens.radius.xl} intensity={18}>
              <Text style={{ color: tokens.color.text, fontWeight: '900' }}>Özet</Text>
              <Text style={{ color: tokens.color.textMuted, marginTop: 8, lineHeight: 20 }}>
                Doğru: {score} • Yanlış/Zaman aşımı: {total - score}
              </Text>
            </GlassCard>

            <Pressable
              onPress={() => {
                void Haptics.selectionAsync();
                router.replace({ pathname: '/quiz/run', params: { mode: quizMode } });
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
            >
              <GlassCard padding={16} radius={tokens.radius.xl} intensity={18}>
                <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>Tekrar dene</Text>
                <Text style={{ color: tokens.color.textMuted, marginTop: 8 }}>
                  Aynı modda yeni sorularla.
                </Text>
              </GlassCard>
            </Pressable>

            <Pressable
              onPress={() => {
                void Haptics.selectionAsync();
                router.replace('/quiz');
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
            >
              <GlassCard padding={16} radius={tokens.radius.xl} intensity={18}>
                <Text style={{ color: tokens.color.text, fontWeight: '900' }}>Mod değiştir</Text>
                <Text style={{ color: tokens.color.textMuted, marginTop: 8 }}>
                  Hızlı tur / Tam tur seç.
                </Text>
              </GlassCard>
            </Pressable>
          </View>
        </View>
      </GrassBackground>
    );
  }

  const timeScaleX = t.interpolate({ inputRange: [0, 1], outputRange: [0.02, 1] });
  const timeOpacity = t.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0.9, 0.9, 1] });
  const urgent = t.interpolate({ inputRange: [0, 0.25, 1], outputRange: [1, 0, 0] }); // helper for color switch via opacity layers

  return (
    <GrassBackground opacity={0.55}>
      <View style={{ paddingTop: 54, paddingHorizontal: tokens.space.lg, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable
            onPress={() => {
              void Haptics.selectionAsync();
              router.back();
            }}
            style={({ pressed }) => [
              {
                width: 44,
                height: 44,
                borderRadius: 22,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(245,230,200,0.06)',
                borderWidth: 1,
                borderColor: tokens.color.border,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Ionicons name="chevron-back" size={22} color={tokens.color.text} />
          </Pressable>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: tokens.color.textFaint }}>
              {quizModes[quizMode].title}
            </Text>
            <Text style={{ color: tokens.color.text, fontWeight: '900' }}>
              {idx + 1}/{total}
            </Text>
          </View>
        </View>

        {/* Overall progress */}
        <View style={{ marginTop: 14, height: 6, borderRadius: 999, backgroundColor: 'rgba(245,230,200,0.10)', overflow: 'hidden' }}>
          <View style={{ width: `${Math.round(progress * 100)}%`, height: 6, backgroundColor: 'rgba(212,175,55,0.65)' }} />
        </View>

        {/* Time HUD */}
        <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 16,
                backgroundColor: 'rgba(6,21,14,0.55)',
                borderWidth: 1,
                borderColor: tokens.color.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="hourglass" size={18} color={tokens.color.gold} />
            </View>
            <View>
              <Text style={{ color: tokens.color.textFaint }}>Süre</Text>
              <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 18 }}>
                {secondsLeft}s
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: tokens.color.textFaint }}>Skor</Text>
            <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 18 }}>
              {score}
            </Text>
          </View>
        </View>

        {/* Time bar (more “alive”) */}
        <View style={{ marginTop: 10, height: 12, borderRadius: 999, backgroundColor: 'rgba(6,21,14,0.55)', overflow: 'hidden', borderWidth: 1, borderColor: tokens.color.border }}>
          <Animated.View
            style={{
              height: 12,
              width: '100%',
              opacity: timeOpacity,
              transform: [{ scaleX: timeScaleX }],
              backgroundColor: 'rgba(212,175,55,0.55)',
              transformOrigin: 'left',
            }}
          />
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              opacity: urgent,
              backgroundColor: 'rgba(255, 94, 94, 0.25)',
            }}
          />
        </View>

        <View style={{ marginTop: 14, flex: 1 }}>
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 6,
              left: 0,
              right: 0,
              height: 180,
              opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.18, 0.32] }),
              transform: [{ scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.98, 1.02] }) }],
            }}
          >
            <LinearGradient
              colors={['rgba(212,175,55,0.10)', 'rgba(245,230,200,0.00)']}
              style={{ flex: 1, borderRadius: 28 }}
            />
          </Animated.View>

          <GlassCard padding={16} radius={tokens.radius.xl} intensity={18}>
            <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 18, lineHeight: 24 }}>
              {current.question}
            </Text>
            <Text style={{ color: tokens.color.textFaint, marginTop: 10 }}>
              Tek dokunuş • düşünme yok, refleks var
            </Text>
          </GlassCard>

          <View style={{ marginTop: 12, gap: 10 }}>
            {current.options.map((opt, optIdx) => {
              const isPicked = current.pickedIndex === optIdx;
              const reveal = locked && (current.pickedIndex !== undefined || current.timedOut);
              const isCorrect = optIdx === current.answerIndex;

              const bg = !reveal
                ? 'rgba(245,230,200,0.06)'
                : isCorrect
                  ? 'rgba(74, 201, 121, 0.18)'
                  : isPicked
                    ? 'rgba(255, 94, 94, 0.16)'
                    : 'rgba(245,230,200,0.04)';

              return (
                <Pressable
                  key={opt}
                  onPress={() => pick(optIdx)}
                  style={({ pressed }) => [
                    {
                      paddingVertical: 14,
                      paddingHorizontal: 14,
                      borderRadius: 18,
                      borderWidth: 1,
                      borderColor: tokens.color.border,
                      backgroundColor: bg,
                      opacity: pressed ? 0.92 : 1,
                      transform: [{ scale: pressed ? 0.99 : 1 }],
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <Text style={{ color: tokens.color.textMuted, fontWeight: '900', flex: 1, lineHeight: 22 }}>
                      {String.fromCharCode(65 + optIdx)}. {opt}
                    </Text>
                    {locked && isCorrect && (
                      <Ionicons name="checkmark-circle" size={18} color="rgba(74, 201, 121, 0.95)" />
                    )}
                    {locked && isPicked && !isCorrect && (
                      <Ionicons name="close-circle" size={18} color="rgba(255, 94, 94, 0.95)" />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {(locked || current.timedOut) && (
            <View style={{ marginTop: 12 }}>
              <GlassCard padding={14} radius={tokens.radius.xl} intensity={16}>
                <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                  {current.timedOut ? 'Süre doldu' : current.correct ? 'Doğru' : 'Yanlış'}
                </Text>
                <Text style={{ color: tokens.color.textMuted, marginTop: 8, lineHeight: 20 }}>
                  {current.explain}
                </Text>
              </GlassCard>
            </View>
          )}
        </View>
      </View>
    </GrassBackground>
  );
}

