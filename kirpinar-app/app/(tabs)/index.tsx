import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';

import { Card } from '../../src/components/Card';
import { GlassCard } from '../../src/components/GlassCard';
import { pehlivanlar } from '../../src/data/pehlivanlar';
import {
  cazgirQuotes,
  homeSpotlights,
  kirkpinarGlossary,
  kirkpinarTimeline,
  kirkpinar2026,
  tarihiKareler,
  miniQuizzes,
} from '../../src/data/home';
import { rehberBolumleri } from '../../src/data/rehber';
import { sampiyonlar } from '../../src/data/sampiyonlar';
import { tokens } from '../../src/theme/tokens';
import { GrassBackground } from '../../src/components/GrassBackground';

function QuickActionCard({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [
        {
          flex: 1,
          borderRadius: tokens.radius.xl,
          overflow: 'hidden',
          backgroundColor: tokens.color.surfaceStrong,
          borderWidth: 1,
          borderColor: 'rgba(212,175,55,0.28)',
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
    >
      <LinearGradient
        colors={['rgba(212,175,55,0.18)', 'rgba(245,230,200,0.06)', 'rgba(7,28,18,0.00)']}
        style={{ padding: 14 }}
      >
        <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16 }}>
          {title}
        </Text>
        <Text style={{ color: tokens.color.textMuted, marginTop: 6, lineHeight: 18 }}>
          {subtitle}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;

  const heroScale = scrollY.interpolate({
    inputRange: [-60, 0, 220],
    outputRange: [1.06, 1, 0.94],
    extrapolate: 'clamp',
  });
  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 140, 220],
    outputRange: [1, 0.92, 0.8],
    extrapolate: 'clamp',
  });

  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1300, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1300, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const spotlight = useMemo(() => pehlivanlar.slice(0, 8), []);
  const guidePicks = useMemo(() => rehberBolumleri.slice(0, 3), []);
  const quote = useMemo(() => {
    const idx = Math.floor(Math.random() * cazgirQuotes.length);
    return cazgirQuotes[idx];
  }, []);
  const quiz = useMemo(() => {
    const idx = Math.floor(Math.random() * miniQuizzes.length);
    return miniQuizzes[idx];
  }, []);
  const latestChampion = useMemo(() => {
    const list = [...sampiyonlar].sort((a, b) => b.yil - a.yil);
    return list[0];
  }, []);
  const featuredChampion = useMemo(() => {
    const winner = latestChampion?.kazanan?.toLocaleLowerCase('tr-TR') ?? '';
    const match = pehlivanlar.find(
      (p) => p.ad.toLocaleLowerCase('tr-TR') === winner,
    );
    return match ?? pehlivanlar.find((p) => p.id === 'orhan-okulu') ?? null;
  }, [latestChampion]);

  const tile = Math.floor((width - tokens.space.lg * 2 - 12) / 2);

  const [countdown, setCountdown] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
    done: false,
  });

  useEffect(() => {
    const target = new Date(kirkpinar2026.startIso).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const total = Math.floor(diff / 1000);
      setCountdown({
        d: Math.floor(total / (3600 * 24)),
        h: Math.floor((total % (3600 * 24)) / 3600),
        m: Math.floor((total % 3600) / 60),
        s: total % 60,
        done: diff === 0,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <GrassBackground opacity={0.65}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 28 }}
      >
        <Animated.View
          style={{
            paddingTop: 54,
            paddingHorizontal: tokens.space.lg,
            opacity: heroOpacity,
            transform: [{ scale: heroScale }],
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text
              style={{
                color: tokens.color.text,
                ...tokens.font.h1,
                letterSpacing: 0.2,
              }}
            >
              Tarihi Kırkpınar
            </Text>
            <Animated.View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: tokens.color.gold,
                transform: [
                  {
                    scale: pulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.25],
                    }),
                  },
                ],
                opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1] }),
              }}
            />
          </View>

          <Text
            style={{
              color: tokens.color.textMuted,
              ...tokens.font.body,
              marginTop: tokens.space.sm,
              lineHeight: 22,
            }}
          >
            Edirne Sarayiçi’nde asırlardır süren yağlı güreş geleneği: peşrev, cazgır manileri,
            davul‑zurna ve Altın Kemer… Er meydanını keşfet.
          </Text>
        </Animated.View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 14 }}>
          <GlassCard padding={14} radius={tokens.radius.xl} intensity={20} variant="goldFoil">
            <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 22, marginTop: 2 }}>
              665. Tarihi Kırkpınar Yağlı{'\n'}Güreşleri
            </Text>
            <Text style={{ color: tokens.color.textMuted, marginTop: 8, fontWeight: '700' }}>
              Sarayiçi Er Meydanı • Edirne
            </Text>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: 'rgba(212,175,55,0.22)',
                  backgroundColor: 'rgba(10,20,14,0.55)',
                }}
              >
                <Text style={{ color: tokens.color.textMuted, fontWeight: '900', fontSize: 10, letterSpacing: 0.3 }}>
                  UNESCO
                </Text>
                <Text style={{ color: tokens.color.text, fontWeight: '900', marginTop: 2 }}>
                  Temsili Liste
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: 'rgba(212,175,55,0.22)',
                  backgroundColor: 'rgba(10,20,14,0.55)',
                }}
              >
                <Text style={{ color: tokens.color.textMuted, fontWeight: '900', fontSize: 10, letterSpacing: 0.3 }}>
                  ÖDÜL
                </Text>
                <Text style={{ color: tokens.color.text, fontWeight: '900', marginTop: 2 }}>
                  Altın Kemer
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              {countdown.done ? (
                <View
                  style={{
                    paddingVertical: 16,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: 'rgba(212,175,55,0.18)',
                    backgroundColor: 'rgba(10,20,14,0.55)',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 20 }}>
                    Başladı!
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {(
                    [
                      { label: 'GÜN', value: countdown.d },
                      { label: 'SAAT', value: countdown.h },
                      { label: 'DAK', value: countdown.m },
                      { label: 'SN', value: countdown.s },
                    ] as const
                  ).map((t) => (
                    <View
                      key={t.label}
                      style={{
                        flex: 1,
                        paddingVertical: 12,
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: 'rgba(212,175,55,0.22)',
                        backgroundColor: 'rgba(10,20,14,0.55)',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 22 }}>
                        {t.value}
                      </Text>
                      <Text style={{ color: tokens.color.textMuted, fontWeight: '900', marginTop: 6, fontSize: 10, letterSpacing: 0.4 }}>
                        {t.label}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <Text style={{ color: tokens.color.textMuted, marginTop: 12, fontWeight: '700' }}>
              İlk tur tahminleri kura sonrası kapanır.
            </Text>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
              {['3 Tem', '4 Tem', '5 Tem'].map((x, i) => (
                <View
                  key={x}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: tokens.color.border,
                    backgroundColor: i === 0 ? 'rgba(212,175,55,0.12)' : 'rgba(245,230,200,0.06)',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: tokens.color.textMuted, fontWeight: '900' }}>{x}</Text>
                </View>
              ))}
            </View>
          </GlassCard>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 12 }}>
          <Pressable
            onPress={() => {
              void Haptics.selectionAsync();
              if (featuredChampion?.id) {
                router.push({ pathname: '/pehlivan/[id]', params: { id: featuredChampion.id } });
                return;
              }
              router.push('/sampiyonlar');
            }}
            style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.99 : 1 }] }]}
          >
            <GlassCard padding={0} radius={tokens.radius.xl} intensity={22} variant="goldFoil">
              <View style={{ borderRadius: tokens.radius.xl, overflow: 'hidden' }}>
                <View style={{ height: 118 }}>
                  <Image
                    source={
                      featuredChampion?.fotograf ??
                      require('../../assets/images/pehlivanlar-normalized/orhan-okulu.webp')
                    }
                    style={{ position: 'absolute', top: 0, right: 0, width: 170, height: 170, opacity: 0.95 }}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['rgba(7,28,18,0.96)', 'rgba(7,28,18,0.62)', 'rgba(7,28,18,0.15)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0.4 }}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                  />
                  <View style={{ padding: 14, paddingRight: 110 }}>
                    <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>Öne çıkan</Text>
                    <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 18, marginTop: 6 }}>
                      {latestChampion ? `${latestChampion.yil} Başpehlivanı` : 'Şampiyonlar'}
                    </Text>
                    <Text style={{ color: tokens.color.textMuted, marginTop: 6, fontWeight: '800' }}>
                      {featuredChampion?.ad ?? latestChampion?.kazanan ?? 'Arşive göz at.'}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(212,175,55,0.12)',
                    backgroundColor: 'rgba(10,20,14,0.40)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: tokens.color.textFaint, fontWeight: '700' }}>
                    Detayı aç
                  </Text>
                  <Ionicons name="chevron-forward" size={18} color={tokens.color.gold} />
                </View>
              </View>
            </GlassCard>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 14, gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ width: tile }}>
              <QuickActionCard
                title="Pehlivanlar"
                subtitle="Kartlar, detaylar, arama"
                onPress={() => router.push('/pehlivanlar')}
              />
            </View>
            <View style={{ width: tile }}>
              <QuickActionCard
                title="Şampiyonlar"
                subtitle="Yıllara göre arşiv"
                onPress={() => router.push('/sampiyonlar')}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ width: tile }}>
              <QuickActionCard
                title="Rehber"
                subtitle="Ritüeller ve kavramlar"
                onPress={() => router.push('/rehber')}
              />
            </View>
            <View style={{ width: tile }}>
              <QuickActionCard
                title="Quiz"
                subtitle="Süreli, modern test"
                onPress={() => router.push('/quiz')}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 18 }}>
          <GlassCard padding={14} radius={tokens.radius.xl} intensity={18} variant="goldFoil">
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                Cazgırdan bir nefes
              </Text>
              <Ionicons name="musical-notes" size={18} color={tokens.color.gold} />
            </View>
            <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 18, marginTop: 10, lineHeight: 24 }}>
              {quote}
            </Text>
          </GlassCard>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 18 }}>
          <Text style={{ color: tokens.color.text, fontSize: 18, fontWeight: '900' }}>
            Ritüeller ve simgeler
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
          >
            {homeSpotlights.map((s, i) => (
              <Pressable
                key={s.id}
                onPress={() => {
                  void Haptics.selectionAsync();
                  router.push(s.route as any);
                }}
                style={({ pressed }) => [
                  {
                    width: 250,
                    borderRadius: tokens.radius.xl,
                    overflow: 'hidden',
                    backgroundColor: tokens.color.surfaceStrong,
                    borderWidth: 1,
                    borderColor: 'rgba(212,175,55,0.26)',
                    transform: [{ scale: pressed ? 0.985 : 1 }],
                  },
                ]}
              >
                <LinearGradient
                  colors={[
                    i % 2 === 0 ? 'rgba(212,175,55,0.18)' : 'rgba(245,230,200,0.12)',
                    'rgba(7,28,18,0.00)',
                  ]}
                  style={{ padding: 14 }}
                >
                  <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16 }}>
                    {s.title}
                  </Text>
                  <Text style={{ color: tokens.color.textMuted, marginTop: 8, lineHeight: 20 }}>
                    {s.subtitle}
                  </Text>
                  <Text style={{ color: tokens.color.gold, marginTop: 10, fontWeight: '900' }}>
                    {s.cta} →
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 18 }}>
          <Text style={{ color: tokens.color.text, fontSize: 18, fontWeight: '900' }}>
            Öne çıkan pehlivanlar
          </Text>
          <Text style={{ color: tokens.color.textFaint, marginTop: 6 }}>
            Birine dokun, hızlıca detaya geç.
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
          >
            {spotlight.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => {
                  void Haptics.selectionAsync();
                  router.push({ pathname: '/pehlivan/[id]', params: { id: p.id } });
                }}
                style={({ pressed }) => [
                  {
                    width: 168,
                    borderRadius: tokens.radius.xl,
                    overflow: 'hidden',
                    backgroundColor: tokens.color.surfaceStrong,
                    borderWidth: 1,
                    borderColor: 'rgba(212,175,55,0.26)',
                    transform: [{ scale: pressed ? 0.985 : 1 }],
                  },
                ]}
              >
                <Image source={p.fotograf} style={{ width: '100%', height: 190 }} resizeMode="cover" />
                <View style={{ padding: 12 }}>
                  <Text numberOfLines={1} style={{ color: tokens.color.text, fontWeight: '900' }}>
                    {p.ad}
                  </Text>
                  <Text style={{ color: tokens.color.textFaint, marginTop: 6 }}>
                    Detayı aç →
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 6 }}>
          <Text style={{ color: tokens.color.text, fontSize: 18, fontWeight: '900' }}>
            Rehberden seçmeler
          </Text>
          <View style={{ marginTop: 12, gap: 12 }}>
            {guidePicks.map((g) => (
              <Pressable
                key={g.slug}
                onPress={() => {
                  void Haptics.selectionAsync();
                  router.push({ pathname: '/rehber/[slug]', params: { slug: g.slug } });
                }}
                style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.99 : 1 }] }]}
              >
                <GlassCard padding={14} radius={tokens.radius.xl} intensity={18} variant="goldFoil">
                  <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                    {g.baslik}
                  </Text>
                  <Text style={{ color: tokens.color.textMuted, marginTop: 8, lineHeight: 20 }}>
                    {g.ozet}
                  </Text>
                </GlassCard>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 18 }}>
          <Text style={{ color: tokens.color.text, fontSize: 18, fontWeight: '900' }}>
            Zaman tüneli (kısa akış)
          </Text>
          <View style={{ marginTop: 12, gap: 10 }}>
            {kirkpinarTimeline.map((t, idx) => (
              <View key={t.title} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <View style={{ alignItems: 'center', width: 18 }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: idx === 0 ? tokens.color.gold : 'rgba(245,230,200,0.25)',
                      marginTop: 4,
                    }}
                  />
                  {idx !== kirkpinarTimeline.length - 1 && (
                    <View style={{ width: 2, flex: 1, backgroundColor: 'rgba(245,230,200,0.10)', marginTop: 6 }} />
                  )}
                </View>
                <GlassCard padding={12} radius={tokens.radius.lg} intensity={16} variant="goldFoil">
                  <Text style={{ color: tokens.color.text, fontWeight: '900' }}>
                    {t.title}
                  </Text>
                  <Text style={{ color: tokens.color.textMuted, marginTop: 6 }}>
                    {t.note}
                  </Text>
                </GlassCard>
              </View>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: tokens.color.text, fontSize: 18, fontWeight: '900' }}>
              Tarihten Kareler
            </Text>
            <Pressable
              onPress={() => {
                void Haptics.selectionAsync();
                router.push('/galeri/tarih');
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
            >
              <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                Hepsini gör →
              </Text>
            </Pressable>
          </View>
          <Text style={{ color: tokens.color.textFaint, marginTop: 6 }}>
            Er meydanının hafızası: çayır, seyir ve ritüel.
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
          >
            {tarihiKareler.map((x) => (
              <Pressable
                key={x.id}
                onPress={() => {
                  void Haptics.selectionAsync();
                  router.push('/galeri/tarih');
                }}
                style={({ pressed }) => [
                  {
                    width: 270,
                    borderRadius: tokens.radius.xl,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: 'rgba(212,175,55,0.26)',
                    backgroundColor: tokens.color.surfaceStrong,
                    transform: [{ scale: pressed ? 0.985 : 1 }],
                  },
                ]}
              >
                <Image source={x.image} style={{ width: '100%', height: 160 }} resizeMode="cover" />
                <View style={{ padding: 12 }}>
                  <Text numberOfLines={1} style={{ color: tokens.color.text, fontWeight: '900' }}>
                    {x.title}
                  </Text>
                  <Text numberOfLines={2} style={{ color: tokens.color.textMuted, marginTop: 6, lineHeight: 18 }}>
                    {x.note}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 18 }}>
          <Text style={{ color: tokens.color.text, fontSize: 18, fontWeight: '900' }}>
            Er meydanı sözlüğü
          </Text>
          <Text style={{ color: tokens.color.textFaint, marginTop: 6 }}>
            Küçük terimler, büyük anlamlar.
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 12, gap: 10 }}
          >
            {kirkpinarGlossary.map((g) => (
              <View
                key={g.term}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  backgroundColor: tokens.color.surfaceStrong,
                  borderWidth: 1,
                  borderColor: tokens.color.border,
                }}
              >
                <Text style={{ color: tokens.color.text, fontWeight: '900' }}>{g.term}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={{ gap: 10 }}>
            {kirkpinarGlossary.slice(0, 3).map((g) => (
              <GlassCard key={g.term} padding={14} radius={tokens.radius.xl} intensity={16} variant="goldFoil">
                <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>{g.term}</Text>
                <Text style={{ color: tokens.color.textMuted, marginTop: 8, lineHeight: 20 }}>
                  {g.short}
                </Text>
              </GlassCard>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: tokens.space.lg, marginTop: 18 }}>
          <Text style={{ color: tokens.color.text, fontSize: 18, fontWeight: '900' }}>
            Mini Quiz
          </Text>
          <Text style={{ color: tokens.color.textFaint, marginTop: 6 }}>
            Yeni: süreli modlar ile “farklı” quiz deneyimi.
          </Text>

          <View style={{ marginTop: 12 }}>
            <GlassCard padding={14} radius={tokens.radius.xl} intensity={18} variant="goldFoil">
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                    Bugünün sorusu
                  </Text>
                  <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16, lineHeight: 22, marginTop: 8 }}>
                    {quiz.question}
                  </Text>
                  <Text style={{ color: tokens.color.textFaint, marginTop: 10 }}>
                    Tam deneyim için süreli quiz’e geç.
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    void Haptics.selectionAsync();
                    router.push('/quiz');
                  }}
                  style={({ pressed }) => [
                    {
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(212,175,55,0.14)',
                      borderWidth: 1,
                      borderColor: 'rgba(212,175,55,0.26)',
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    },
                  ]}
                >
                  <Ionicons name="play" size={20} color={tokens.color.gold} />
                </Pressable>
              </View>
            </GlassCard>
          </View>
        </View>
      </Animated.ScrollView>
    </GrassBackground>
  );
}

