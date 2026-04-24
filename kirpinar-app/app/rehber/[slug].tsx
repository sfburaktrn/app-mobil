import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';

import { GlassCard } from '../../src/components/GlassCard';
import { GrassBackground } from '../../src/components/GrassBackground';
import { rehberBolumleri } from '../../src/data/rehber';
import { tokens } from '../../src/theme/tokens';

export default function RehberDetayScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const item = rehberBolumleri.find((x) => x.slug === slug);

  if (!item) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: tokens.color.bg,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: tokens.space.lg,
        }}
      >
        <Text style={{ color: tokens.color.text, fontWeight: '900' }}>
          İçerik bulunamadı.
        </Text>
      </View>
    );
  }

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [done, setDone] = useState<Record<number, boolean>>({});

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 320, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY]);

  const accent = useMemo<{
    icon: keyof typeof Ionicons.glyphMap;
    colors: readonly [string, string];
  }>(() => {
    switch (item.slug) {
      case 'pesrev-ve-davul-zurna':
        return { icon: 'musical-notes', colors: ['rgba(245,230,200,0.18)', 'rgba(7,28,18,0.00)'] as const };
      case 'kispet-yaglanma-zembil':
        return { icon: 'shield-half', colors: ['rgba(212,175,55,0.12)', 'rgba(7,28,18,0.00)'] as const };
      case 'altin-kemer':
        return { icon: 'trophy', colors: ['rgba(212,175,55,0.26)', 'rgba(7,28,18,0.00)'] as const };
      default:
        return { icon: 'sparkles', colors: ['rgba(212,175,55,0.22)', 'rgba(7,28,18,0.00)'] as const };
    }
  }, [item.slug]);

  return (
    <GrassBackground opacity={0.5}>
      {/* Reading progress */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: 'rgba(245,230,200,0.10)',
          zIndex: 5,
        }}
      >
        <Animated.View
          style={{
            height: 3,
            width: '100%',
            backgroundColor: tokens.color.gold,
            transform: [
              {
                scaleX: scrollY.interpolate({
                  inputRange: [0, 650],
                  outputRange: [0.02, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
            transformOrigin: 'left',
          }}
        />
      </Animated.View>

      <View
        style={{
          paddingTop: 52,
          paddingHorizontal: tokens.space.lg,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
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

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: tokens.color.text, fontSize: 18, fontWeight: '900' }}>
            {item.baslik}
          </Text>
          <Text numberOfLines={1} style={{ color: tokens.color.textFaint, marginTop: 2 }}>
            Kısa rehber • {item.maddeler.length} madde
          </Text>
        </View>
      </View>

      <Animated.ScrollView
        contentContainerStyle={{ padding: tokens.space.lg, paddingBottom: 34, gap: 12 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        {/* Hero */}
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <GlassCard padding={0} radius={tokens.radius.xl} intensity={18}>
            <LinearGradient colors={accent.colors} style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(6,21,14,0.55)',
                    borderWidth: 1,
                    borderColor: tokens.color.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name={accent.icon} size={18} color={tokens.color.gold} />
                </View>
                <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>Rehber</Text>
              </View>

              <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 22, marginTop: 12, lineHeight: 28 }}>
                {item.baslik}
              </Text>
              <Text style={{ color: tokens.color.textMuted, marginTop: 10, lineHeight: 22 }}>
                {item.ozet}
              </Text>
            </LinearGradient>
          </GlassCard>
        </Animated.View>

        {/* Highlights (interactive) */}
        <Animated.View
          style={{
            opacity,
            transform: [{ translateY: Animated.add(translateY, new Animated.Value(4)) }],
          }}
        >
          <GlassCard padding={14} radius={tokens.radius.xl} intensity={16}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16 }}>
                Öne çıkanlar
              </Text>
              <Text style={{ color: tokens.color.textFaint }}>
                {Object.values(done).filter(Boolean).length}/{item.maddeler.length}
              </Text>
            </View>

            <View style={{ marginTop: 12, gap: 10 }}>
              {item.maddeler.map((m, idx) => {
                const checked = !!done[idx];
                return (
                  <Pressable
                    key={`${idx}-${m}`}
                    onPress={() => {
                      void Haptics.selectionAsync();
                      setDone((prev) => ({ ...prev, [idx]: !prev[idx] }));
                    }}
                    style={({ pressed }) => [
                      {
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: tokens.color.border,
                        backgroundColor: checked ? 'rgba(212,175,55,0.10)' : 'rgba(245,230,200,0.06)',
                        opacity: pressed ? 0.92 : 1,
                      },
                    ]}
                  >
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          borderWidth: 1,
                          borderColor: checked ? 'rgba(212,175,55,0.55)' : tokens.color.border,
                          backgroundColor: checked ? 'rgba(212,175,55,0.22)' : 'rgba(6,21,14,0.30)',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 1,
                        }}
                      >
                        {checked ? (
                          <Ionicons name="checkmark" size={14} color={tokens.color.gold} />
                        ) : (
                          <Text style={{ color: tokens.color.textFaint, fontWeight: '900', fontSize: 12 }}>
                            {idx + 1}
                          </Text>
                        )}
                      </View>
                      <Text style={{ color: checked ? tokens.color.text : tokens.color.textMuted, flex: 1, lineHeight: 22 }}>
                        {m}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Text style={{ color: tokens.color.textFaint, marginTop: 12 }}>
              İpucu: Maddelere dokun, okuduklarını işaretle.
            </Text>
          </GlassCard>
        </Animated.View>
      </Animated.ScrollView>
    </GrassBackground>
  );
}

