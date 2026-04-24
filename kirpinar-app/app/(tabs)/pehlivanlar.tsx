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

import { Card } from '../../src/components/Card';
import { type Pehlivan, pehlivanlar } from '../../src/data/pehlivanlar';
import { tokens } from '../../src/theme/tokens';

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
            borderRadius: 18,
            overflow: 'hidden',
            backgroundColor: tokens.color.surface,
            borderColor: tokens.color.border,
            borderWidth: 1,
            marginBottom: 12,
            transform: [{ scale: pressed ? 0.99 : 1 }],
          },
        ]}
      >
        <Image
          source={item.fotograf}
          style={{ width: '100%', height: Math.round(tileWidth * 0.78) }}
          resizeMode="cover"
        />
        <View style={{ padding: 12 }}>
          <Text style={{ color: tokens.color.text, fontWeight: '800' }}>
            {item.ad}
          </Text>
          <Text style={{ color: tokens.color.textMuted, marginTop: 6 }}>
            Detayı aç →
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function PehlivanlarScreen() {
  const [query, setQuery] = useState('');
  const { width } = useWindowDimensions();

  const data = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    if (!q) return pehlivanlar;
    return pehlivanlar.filter((p) =>
      p.ad.toLocaleLowerCase('tr-TR').includes(q),
    );
  }, [query]);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.bg }}>
      <View
        style={{
          paddingTop: 54,
          paddingHorizontal: tokens.space.lg,
          paddingBottom: 12,
        }}
      >
        <Text style={{ color: tokens.color.text, ...tokens.font.title }}>
          Pehlivanlar
        </Text>
        <Text style={{ color: tokens.color.textMuted, marginTop: 6 }}>
          Fotoğrafa dokun, kartları gez. (Offline)
        </Text>

        <Card padding={12} radius={tokens.radius.md}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ara: Recep Kara, Cengizhan Şimşek..."
            placeholderTextColor={tokens.color.textFaint}
            style={{ color: tokens.color.text, fontSize: 16 }}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Card>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        extraData={width}
        contentContainerStyle={{
          paddingHorizontal: tokens.space.lg,
          paddingBottom: 24,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 12 }}
        renderItem={({ item, index }) => {
          const gutter = tokens.space.lg * 2;
          const gap = 12;
          const tileWidth = Math.floor((width - gutter - gap) / 2);
          return <PehlivanTile item={item} index={index} tileWidth={tileWidth} />;
        }}
      />
    </View>
  );
}

