import type { PropsWithChildren } from 'react';
import { Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { tokens } from '../theme/tokens';

type Props = PropsWithChildren<{
  padding?: number;
  radius?: number;
  intensity?: number;
  variant?: 'default' | 'goldFoil';
}>;

export function GlassCard({
  children,
  padding = 16,
  radius = tokens.radius.xl,
  intensity = 18,
  variant = 'default',
}: Props) {
  // Android blur can be heavier; keep intensity modest.
  const i = Platform.OS === 'android' ? Math.min(intensity, 14) : intensity;

  const content = (
    <View
      style={{
        borderRadius: radius,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: variant === 'goldFoil' ? 'rgba(212,175,55,0.35)' : tokens.color.border,
        backgroundColor: 'rgba(6, 21, 14, 0.55)',
      }}
    >
      <BlurView intensity={i} tint="dark" style={{ padding }}>
        {children}
      </BlurView>
    </View>
  );

  if (variant !== 'goldFoil') return content;

  return (
    <LinearGradient
      colors={[
        'rgba(212,175,55,0.48)',
        'rgba(245,230,200,0.14)',
        'rgba(212,175,55,0.22)',
        'rgba(212,175,55,0.48)',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: radius,
        padding: 1,
      }}
    >
      {content}
    </LinearGradient>
  );
}

