import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';

import { GlassCard } from '../../src/components/GlassCard';
import { pehlivanlar } from '../../src/data/pehlivanlar';
import { sampiyonlar } from '../../src/data/sampiyonlar';
import { tokens } from '../../src/theme/tokens';

export default function SampiyonlarScreen() {
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    const base = [...sampiyonlar].sort((a, b) => b.yil - a.yil);
    if (!q) return base;
    return base.filter((x) => {
      const hay = `${x.yil} ${x.kazanan}`.toLocaleLowerCase('tr-TR');
      return hay.includes(q);
    });
  }, [query]);

  const featured = useMemo(() => {
    const base = [...sampiyonlar].sort((a, b) => b.yil - a.yil);
    const top = base[0];
    const match = pehlivanlar.find(
      (p) => p.ad.toLocaleLowerCase('tr-TR') === top?.kazanan.toLocaleLowerCase('tr-TR'),
    );
    return { record: top, pehlivan: match ?? null };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tokens.color.bg,
        paddingTop: 54,
        paddingHorizontal: tokens.space.lg,
      }}
    >
      <Text style={{ color: tokens.color.text, ...tokens.font.title }}>
        Şampiyonlar
      </Text>
      <Text style={{ color: tokens.color.textMuted, marginTop: 10 }}>
        Yıllara göre başpehlivan arşivi. (Offline demo)
      </Text>

      <View style={{ marginTop: 12 }}>
        <Pressable
          onPress={() => {
            if (featured.pehlivan?.id) {
              router.push({ pathname: '/pehlivan/[id]', params: { id: featured.pehlivan.id } });
            }
          }}
          style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.995 : 1 }] }]}
        >
          <GlassCard padding={0} radius={tokens.radius.xl} intensity={22} variant="goldFoil">
            <View style={{ borderRadius: tokens.radius.xl, overflow: 'hidden' }}>
              <View style={{ height: 120 }}>
                {!!featured.pehlivan?.fotograf && (
                  <Image
                    source={featured.pehlivan.fotograf}
                    style={{ position: 'absolute', top: -10, right: -6, width: 200, height: 200, opacity: 0.92 }}
                    resizeMode="cover"
                  />
                )}
                <LinearGradient
                  colors={['rgba(7,28,18,0.96)', 'rgba(7,28,18,0.62)', 'rgba(7,28,18,0.20)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0.4 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
                <View style={{ padding: 14, paddingRight: 124 }}>
                  <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>Son başpehlivan</Text>
                  <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 20, marginTop: 8 }}>
                    {featured.record?.yil ?? ''} • {featured.record?.kazanan ?? ''}
                  </Text>
                  <Text style={{ color: tokens.color.textFaint, marginTop: 8, fontWeight: '700' }}>
                    Kırkpınar arşivine göz at
                  </Text>
                </View>
              </View>
            </View>
          </GlassCard>
        </Pressable>
      </View>

      <View style={{ marginTop: 12 }}>
        <GlassCard padding={12} radius={tokens.radius.lg} intensity={22} variant="goldFoil">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="search" size={18} color={tokens.color.textFaint} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Ara: 2024, Yusuf Can..."
              placeholderTextColor={tokens.color.textFaint}
              style={{ color: tokens.color.text, fontSize: 16, flex: 1 }}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {!!query && (
              <Pressable onPress={() => setQuery('')} hitSlop={10} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
                <Ionicons name="close-circle" size={20} color={tokens.color.textFaint} />
              </Pressable>
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: tokens.color.textFaint, fontWeight: '700' }}>{data.length} kayıt</Text>
            <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>Yıl • Kategori</Text>
          </View>
        </GlassCard>
      </View>

      <FlatList
        data={data}
        keyExtractor={(x) => `${x.kategori}-${x.yil}`}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              {
                marginBottom: 12,
                transform: [{ scale: pressed ? 0.995 : 1 }],
              },
            ]}
          >
            <GlassCard padding={12} radius={tokens.radius.lg} intensity={18} variant="goldFoil">
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                  {item.yil} • {item.kategori}
                </Text>
                <Ionicons name="trophy" size={16} color="rgba(212,175,55,0.85)" />
              </View>
              <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16, marginTop: 8 }}>
                {item.kazanan}
              </Text>
              <Text style={{ color: tokens.color.textFaint, marginTop: 8 }}>
                Detay ekranı yakında (final, rakipler, notlar).
              </Text>
            </GlassCard>
          </Pressable>
        )}
      />
    </View>
  );
}

