import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, Image, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { pehlivanlar } from '../../src/data/pehlivanlar';
import { tokens } from '../../src/theme/tokens';
import { Card } from '../../src/components/Card';
import { GrassBackground } from '../../src/components/GrassBackground';

export default function PehlivanDetayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = pehlivanlar.find((p) => p.id === id);
  const { width } = useWindowDimensions();

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
        <Text style={{ color: tokens.color.text, fontWeight: '800' }}>
          Pehlivan bulunamadı.
        </Text>
      </View>
    );
  }

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const dy4 = useMemo(() => Animated.add(translateY, 4), [translateY]);
  const dy8 = useMemo(() => Animated.add(translateY, 8), [translateY]);
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 280, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 280, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [glow]);

  return (
    <GrassBackground opacity={0.5}>
      <View style={{ height: 520 }}>
        {/* Background atmosphere (fills area) */}
        <Image
          source={item.fotograf}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.35 }}
          resizeMode="cover"
          blurRadius={18}
        />
        {/* Foreground photo: fixed 4:5 frame so it can be big without cropping */}
        <View
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
        >
          <View style={{ width: Math.min(Math.round(width * 0.86), 380) }}>
            {/* Animated glow ring */}
            <Animated.View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: -10,
                left: -10,
                right: -10,
                bottom: -10,
                borderRadius: 38,
                opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.9] }),
                transform: [
                  {
                    scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.992, 1.01] }),
                  },
                ],
              }}
            >
              <LinearGradient
                colors={[
                  'rgba(212,175,55,0.00)',
                  'rgba(212,175,55,0.32)',
                  'rgba(245,230,200,0.14)',
                  'rgba(212,175,55,0.26)',
                  'rgba(212,175,55,0.00)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  flex: 1,
                  borderRadius: 38,
                  borderWidth: 1,
                  borderColor: 'rgba(212,175,55,0.35)',
                }}
              />
            </Animated.View>

            {/* Photo frame */}
            <View
              style={{
                width: '100%',
                aspectRatio: 4 / 5,
                borderRadius: 28,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: tokens.color.borderStrong,
                backgroundColor: 'rgba(6,21,14,0.35)',
              }}
            >
              <Image
                source={item.fotograf}
                style={{ width: '100%', height: '100%' }}
                // Image is already normalized to 4:5, so cover does NOT crop here.
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(7,28,18,0.00)', 'rgba(7,28,18,0.35)', 'rgba(7,28,18,0.72)']}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '48%' }}
              />
            </View>
          </View>
        </View>
        <LinearGradient
          // Keep top clearer, darken only towards bottom for text legibility.
          colors={['rgba(7,28,18,0.05)', 'rgba(7,28,18,0.35)', 'rgba(7,28,18,0.72)', tokens.color.bg]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        <View
          style={{
            position: 'absolute',
            top: 52,
            left: tokens.space.lg,
            right: tokens.space.lg,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                width: 44,
                height: 44,
                borderRadius: 22,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(6,21,14,0.65)',
                borderWidth: 1,
                borderColor: tokens.color.borderStrong,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Ionicons name="chevron-back" size={22} color={tokens.color.text} />
          </Pressable>

          <View style={{ width: 44, height: 44 }} />
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 30,
            left: tokens.space.lg,
            right: tokens.space.lg,
          }}
        >
          <Text style={{ color: tokens.color.text, fontSize: 34, fontWeight: '900' }}>
            {item.ad}
          </Text>
          {!!item.memleket && (
            <View
              style={{
                alignSelf: 'flex-start',
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 999,
                backgroundColor: 'rgba(6,21,14,0.62)',
                borderWidth: 1,
                borderColor: tokens.color.borderStrong,
              }}
            >
              <Ionicons name="location" size={16} color={tokens.color.gold} />
              <Text style={{ color: tokens.color.text, fontWeight: '800' }}>
                {item.memleket}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          // Reduce overlap so hero photo is more visible.
          marginTop: -10,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          backgroundColor: 'rgba(6,21,14,0.78)',
          borderTopWidth: 1,
          borderTopColor: tokens.color.border,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 6,
          }}
        >
          <View
            style={{
              width: 42,
              height: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(245,230,200,0.22)',
            }}
          />
        </View>

        <ScrollView
          contentContainerStyle={{ padding: tokens.space.lg, paddingBottom: 34 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ opacity, transform: [{ translateY }] }}>
            <Card>
              <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16 }}>
                Kısa bilgi
              </Text>
              <Text style={{ color: tokens.color.textMuted, marginTop: 8, lineHeight: 22 }}>
                {item.kisaBiyografi ?? 'Bu pehlivan için detay içerik yakında genişletilecek.'}
              </Text>
            </Card>
          </Animated.View>

          {!!item.basarilar?.length && (
            <Animated.View
              style={{
                marginTop: 12,
                opacity,
                transform: [{ translateY: dy4 }],
              }}
            >
              <Card>
                <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16 }}>
                  Başarılar
                </Text>
                <View style={{ marginTop: 10, gap: 8 }}>
                  {item.basarilar.map((b) => (
                    <View key={b} style={{ flexDirection: 'row', gap: 10 }}>
                      <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>•</Text>
                      <Text style={{ color: tokens.color.textMuted, flex: 1, lineHeight: 22 }}>
                        {b}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card>
            </Animated.View>
          )}
        </ScrollView>
      </View>
    </GrassBackground>
  );
}

