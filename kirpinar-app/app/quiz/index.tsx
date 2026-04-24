import { router } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import { GlassCard } from '../../src/components/GlassCard';
import { GrassBackground } from '../../src/components/GrassBackground';
import { quizModes } from '../../src/data/quiz';
import { tokens } from '../../src/theme/tokens';

function ModeCard({
  mode,
  title,
  subtitle,
  icon,
  colors,
}: {
  mode: 'quick' | 'full';
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: readonly [string, string];
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 340, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 340, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Pressable
        onPress={() => {
          void Haptics.selectionAsync();
          router.push({ pathname: '/quiz/run', params: { mode } });
        }}
        style={({ pressed }) => [
          {
            transform: [{ scale: pressed ? 0.99 : 1 }],
          },
        ]}
      >
        <GlassCard padding={16} radius={tokens.radius.xl} intensity={18}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 18,
                  backgroundColor: colors[0],
                  borderWidth: 1,
                  borderColor: 'rgba(212,175,55,0.26)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name={icon} size={22} color={tokens.color.gold} />
              </View>
              <View>
                <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 18 }}>
                  {title}
                </Text>
                <Text style={{ color: tokens.color.textMuted, marginTop: 4 }}>
                  {subtitle}
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 999,
                backgroundColor: 'rgba(245,230,200,0.06)',
                borderWidth: 1,
                borderColor: tokens.color.border,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Text style={{ color: tokens.color.textFaint, fontWeight: '900' }}>Başla</Text>
              <Ionicons name="play" size={14} color={tokens.color.textFaint} />
            </View>
          </View>
        </GlassCard>
      </Pressable>
    </Animated.View>
  );
}

export default function QuizHomeScreen() {
  const pulse = useRef(new Animated.Value(0)).current;
  const beam = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(beam, { toValue: 1, duration: 2200, useNativeDriver: true }),
        Animated.timing(beam, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [beam]);

  const modes = useMemo(
    () => [
      {
        mode: 'quick' as const,
        title: quizModes.quick.title,
        subtitle: `${quizModes.quick.count} soru • ${quizModes.quick.secondsPerQuestion} sn/soru`,
        icon: 'flash' as const,
        colors: ['rgba(212,175,55,0.22)', 'rgba(7,28,18,0.00)'] as const,
      },
      {
        mode: 'full' as const,
        title: quizModes.full.title,
        subtitle: `${quizModes.full.count} soru • ${quizModes.full.secondsPerQuestion} sn/soru`,
        icon: 'sparkles' as const,
        colors: ['rgba(245,230,200,0.16)', 'rgba(7,28,18,0.00)'] as const,
      },
    ],
    [],
  );

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

        <View style={{ marginTop: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ color: tokens.color.text, ...tokens.font.h1 }}>Quiz</Text>
            <Animated.View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: tokens.color.gold,
                transform: [
                  {
                    scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] }),
                  },
                ],
                opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1] }),
              }}
            />
          </View>
          <Text style={{ color: tokens.color.textMuted, marginTop: 10, lineHeight: 20 }}>
            Süre akarken karar ver. Her sorudan sonra mini bir bilgi kırıntısı.
          </Text>
        </View>

        {/* Hero beam */}
        <Animated.View
          pointerEvents="none"
          style={{
            marginTop: 14,
            height: 86,
            opacity: beam.interpolate({ inputRange: [0, 1], outputRange: [0.16, 0.30] }),
            transform: [
              {
                translateX: beam.interpolate({ inputRange: [0, 1], outputRange: [-30, 30] }),
              },
            ],
          }}
        >
          <View
            style={{
              height: 86,
              borderRadius: 24,
              backgroundColor: 'rgba(212,175,55,0.14)',
              borderWidth: 1,
              borderColor: 'rgba(212,175,55,0.18)',
            }}
          />
        </Animated.View>

        <View style={{ marginTop: 12, gap: 12 }}>
          {modes.map((m) => (
            <ModeCard key={m.mode} {...m} />
          ))}
        </View>
      </View>
    </GrassBackground>
  );
}

