import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

import { Card } from '../../src/components/Card';
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
        <Card padding={12} radius={tokens.radius.md}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ara: 2024, Yusuf Can..."
            placeholderTextColor={tokens.color.textFaint}
            style={{ color: tokens.color.text, fontSize: 16 }}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Card>
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
            <Card>
              <Text style={{ color: tokens.color.gold, fontWeight: '900' }}>
                {item.yil} • {item.kategori}
              </Text>
              <Text style={{ color: tokens.color.text, fontWeight: '900', fontSize: 16, marginTop: 8 }}>
                {item.kazanan}
              </Text>
              <Text style={{ color: tokens.color.textFaint, marginTop: 8 }}>
                Detay ekranı yakında (final, rakipler, notlar).
              </Text>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}

