import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';

import { GlassCard } from '../../src/components/GlassCard';
import { type Pehlivan, pehlivanlar } from '../../src/data/pehlivanlar';
import { tokens } from '../../src/theme/tokens';
import { GrassBackground } from '../../src/components/GrassBackground';

function PehlivanTile({
  item,
  index,
  tileWidth,
}: {
  item: Pehlivan;
  index: number;
  tileWidth: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    const d = Math.min(index * 25, 250);
    const a1 = Animated.timing(opacity, {
      toValue: 1,
      duration: 260,
      delay: d,
      useNativeDriver: true,
    });
    const a2 = Animated.timing(translateY, {
      toValue: 0,
      duration: 260,
      delay: d,
      useNativeDriver: true,
    });
    Animated.parallel([a1, a2]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View style={{ width: tileWidth, opacity, transform: [{ translateY }] }}>
      <Pressable
        onPress={() =>
          router.push({ pathname: '/pehlivan/[id]', params: { id: item.id } })
        }
        style={({ pressed }) => [
          {
            marginBottom: 12,
            transform: [{ scale: pressed ? 0.99 : 1 }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(212,175,55,0.48)',
            'rgba(245,230,200,0.12)',
            'rgba(212,175,55,0.22)',
            'rgba(212,175,55,0.48)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 18, padding: 1 }}
        >
          <View
            style={{
              borderRadius: 17,
              overflow: 'hidden',
              backgroundColor: tokens.color.surfaceStrong,
            }}
          >
            <View style={{ height: Math.round(tileWidth * 0.78) }}>
              <Image source={item.fotograf} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.55)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
            </View>

            <View style={{ padding: 12 }}>
              <Text numberOfLines={1} style={{ color: tokens.color.text, fontWeight: '900', fontSize: 14 }}>
                {item.ad}
              </Text>
              <Text numberOfLines={1} style={{ color: tokens.color.textFaint, fontWeight: '700', fontSize: 12, marginTop: 4 }}>
                {item.memleket ?? 'Konum yok'}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={{ color: tokens.color.textMuted, fontWeight: '800', fontSize: 12 }}>
                  Detayı aç
                </Text>
                <Ionicons name="chevron-forward" size={16} color={tokens.color.gold} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

export default function PehlivanlarScreen() {
  const [query, setQuery] = useState('');
  const { width } = useWindowDimensions();

  const featured = useMemo(() => pehlivanlar.find((p) => p.id === 'orhan-okulu') ?? pehlivanlar[0], []);

  const data = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    if (!q) return pehlivanlar;
    return pehlivanlar.filter((p) =>
      p.ad.toLocaleLowerCase('tr-TR').includes(q),
    );
  }, [query]);

  return (
    <GrassBackground opacity={0.7}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        extraData={width}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: tokens.space.lg,
          paddingBottom: 110,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 12 }}
        ListHeaderComponent={
          <View style={{ paddingTop: 54, paddingBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ color: tokens.color.text, ...tokens.font.title }}>
                  Pehlivanlar
                </Text>
                <Text style={{ color: tokens.color.textMuted, marginTop: 6 }}>
                  Premium arşiv • kartlara dokun
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: tokens.color.gold, fontWeight: '900', fontSize: 18 }}>
                  {data.length}
                </Text>
                <Text style={{ color: tokens.color.textFaint, fontWeight: '700' }}>
                  isim
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <GlassCard padding={12} radius={tokens.radius.xl} intensity={22} variant="goldFoil">
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Ionicons name="search" size={18} color={tokens.color.textFaint} />
                  <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Ara: Orhan Okulu, Recep Kara..."
                    placeholderTextColor={tokens.color.textFaint}
                    style={{ color: tokens.color.text, fontSize: 16, flex: 1 }}
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                  {!!query && (
                    <Pressable
                      onPress={() => setQuery('')}
                      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                      hitSlop={10}
                    >
                      <Ionicons name="close-circle" size={20} color={tokens.color.textFaint} />
                    </Pressable>
                  )}
                </View>
                <Text style={{ color: tokens.color.textFaint, marginTop: 10, fontWeight: '700' }}>
                  İpucu: “Okulu”, “Kara”, “Zeybek” yaz.
                </Text>
              </GlassCard>
            </View>

            {!!featured && !query && (
              <View style={{ marginTop: 12 }}>
                <Pressable
                  onPress={() => router.push({ pathname: '/pehlivan/[id]', params: { id: featured.id } })}
                  style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.995 : 1 }] }]}
                >
                  <LinearGradient
                    colors={[
                      'rgba(212,175,55,0.48)',
                      'rgba(245,230,200,0.12)',
                      'rgba(212,175,55,0.22)',
                      'rgba(212,175,55,0.48)',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: tokens.radius.xl, padding: 1 }}
                  >
                    <View
                      style={{
                        borderRadius: tokens.radius.xl - 1,
                        overflow: 'hidden',
                        backgroundColor: tokens.color.surfaceStrong,
                      }}
                    >
                      <View style={{ height: 140 }}>
                        <Image
                          source={featured.fotograf}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="cover"
                        />
                        <LinearGradient
                          colors={[
                            'rgba(0,0,0,0.00)',
                            'rgba(0,0,0,0.25)',
                            'rgba(0,0,0,0.65)',
                          ]}
                          start={{ x: 0.5, y: 0 }}
                          end={{ x: 0.5, y: 1 }}
                          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        />
                      </View>

                      <View style={{ padding: 14 }}>
                        <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                          Öne çıkan
                        </Text>
                        <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 18, marginTop: 8 }}>
                          {featured.ad}
                        </Text>
                        <Text style={{ color: tokens.color.textFaint, fontWeight: '700', marginTop: 6 }}>
                          {featured.memleket ?? 'Konum yok'}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                          <Text style={{ color: tokens.color.textMuted, fontWeight: '800' }}>
                            Kartı aç
                          </Text>
                          <Ionicons name="chevron-forward" size={18} color={tokens.color.gold} />
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </Pressable>
              </View>
            )}

            <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: tokens.color.textFaint, fontWeight: '700' }}>
                Grid görünüm
              </Text>
              <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                Dokun → Detay
              </Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => {
          const gutter = tokens.space.lg * 2;
          const gap = 12;
          const tileWidth = Math.floor((width - gutter - gap) / 2);
          return <PehlivanTile item={item} index={index} tileWidth={tileWidth} />;
        }}
      />
    </GrassBackground>
  );
}

