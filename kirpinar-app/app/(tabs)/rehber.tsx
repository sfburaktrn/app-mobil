import { router } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

import { GlassCard } from '../../src/components/GlassCard';
import { GrassBackground } from '../../src/components/GrassBackground';
import { rehberBolumleri } from '../../src/data/rehber';
import { tokens } from '../../src/theme/tokens';

const rehberStyle = {
  'kirkpinar-nedir': {
    icon: 'sparkles' as const,
    colors: ['rgba(212,175,55,0.22)', 'rgba(7,28,18,0.00)'],
  },
  'pesrev-ve-davul-zurna': {
    icon: 'musical-notes' as const,
    colors: ['rgba(245,230,200,0.18)', 'rgba(7,28,18,0.00)'],
  },
  'kispet-yaglanma-zembil': {
    icon: 'shield-half' as const,
    colors: ['rgba(212,175,55,0.12)', 'rgba(7,28,18,0.00)'],
  },
  'altin-kemer': {
    icon: 'trophy' as const,
    colors: ['rgba(212,175,55,0.26)', 'rgba(7,28,18,0.00)'],
  },
};

function RehberTile({ slug, baslik, ozet, index }: { slug: string; baslik: string; ozet: string; index: number }) {
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(10);
  Animated.timing(opacity, {
    toValue: 1,
    duration: 320,
    delay: index * 45,
    useNativeDriver: true,
  }).start();
  Animated.timing(translateY, {
    toValue: 0,
    duration: 320,
    delay: index * 45,
    useNativeDriver: true,
  }).start();

  const style = (rehberStyle as any)[slug] ?? {
    icon: 'book' as const,
    colors: ['rgba(245,230,200,0.12)', 'rgba(7,28,18,0.00)'],
  };

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Pressable
        onPress={() => {
          void Haptics.selectionAsync();
          router.push({ pathname: '/rehber/[slug]', params: { slug } });
        }}
        style={({ pressed }) => [
          {
            marginBottom: 12,
            transform: [{ scale: pressed ? 0.99 : 1 }],
          },
        ]}
      >
        <GlassCard padding={0} radius={tokens.radius.xl} intensity={18}>
          <LinearGradient colors={style.colors} style={{ padding: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: 'rgba(6,21,14,0.55)',
                    borderWidth: 1,
                    borderColor: tokens.color.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name={style.icon} size={18} color={tokens.color.gold} />
                </View>
                <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16 }}>
                  {baslik}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color={tokens.color.textFaint} />
            </View>

            <Text style={{ color: tokens.color.textMuted, marginTop: 10, lineHeight: 20 }}>
              {ozet}
            </Text>

            <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 999,
                  backgroundColor: 'rgba(212,175,55,0.12)',
                  borderWidth: 1,
                  borderColor: 'rgba(212,175,55,0.24)',
                }}
              >
                <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>Hızlı okuma</Text>
              </View>
              <Text style={{ color: tokens.color.textFaint }}>
                1 dk
              </Text>
            </View>
          </LinearGradient>
        </GlassCard>
      </Pressable>
    </Animated.View>
  );
}

export default function RehberScreen() {
  return (
    <GrassBackground opacity={0.6}>
      <View
        style={{
          flex: 1,
          paddingTop: 54,
          paddingHorizontal: tokens.space.lg,
        }}
      >
      <View>
        <Text style={{ color: tokens.color.text, ...tokens.font.title }}>
          Kırkpınar Rehberi
        </Text>
        <Text style={{ color: tokens.color.textMuted, marginTop: 10, lineHeight: 20 }}>
          Ritüeller, kavramlar ve geleneğin kısa notları. Her bölüm kısa, akıcı ve “hikâye” gibi.
        </Text>
      </View>

      <FlatList
        data={rehberBolumleri}
        keyExtractor={(x) => x.slug}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
        renderItem={({ item, index }) => (
          <RehberTile slug={item.slug} baslik={item.baslik} ozet={item.ozet} index={index} />
        )}
      />
      </View>
    </GrassBackground>
  );
}

