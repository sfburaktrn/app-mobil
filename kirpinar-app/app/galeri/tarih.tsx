import { router } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, Image, Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import { GrassBackground } from '../../src/components/GrassBackground';
import { GlassCard } from '../../src/components/GlassCard';
import { tarihiKareler } from '../../src/data/home';
import { tokens } from '../../src/theme/tokens';

export default function TarihGalerisiScreen() {
  const { width } = useWindowDimensions();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 320, useNativeDriver: true }).start();
  }, [fade]);

  const cardW = useMemo(() => Math.min(width - tokens.space.lg * 2, 420), [width]);
  const cardH = Math.round(cardW * 0.62);

  return (
    <GrassBackground opacity={0.55}>
      <View style={{ flex: 1, paddingTop: 54, paddingHorizontal: tokens.space.lg }}>
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
            <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>Tarihten Kareler</Text>
            <Text style={{ color: tokens.color.textFaint, marginTop: 2 }}>Kırkpınar arşiv atmosferi</Text>
          </View>
        </View>

        <Animated.ScrollView
          style={{ marginTop: 14, opacity: fade }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, gap: 12 }}
        >
          {tarihiKareler.map((x) => (
            <GlassCard key={x.id} padding={0} radius={tokens.radius.xl} intensity={18} variant="goldFoil">
              <View style={{ borderRadius: tokens.radius.xl, overflow: 'hidden' }}>
                <Image
                  source={x.image}
                  style={{ width: cardW, height: cardH }}
                  resizeMode="cover"
                />
                <View style={{ padding: 14 }}>
                  <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16 }}>
                    {x.title}
                  </Text>
                  <Text style={{ color: tokens.color.textMuted, marginTop: 8, lineHeight: 20 }}>
                    {x.note}
                  </Text>
                </View>
              </View>
            </GlassCard>
          ))}
        </Animated.ScrollView>
      </View>
    </GrassBackground>
  );
}

