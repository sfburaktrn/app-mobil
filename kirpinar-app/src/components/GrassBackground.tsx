import type { PropsWithChildren } from 'react';
import { ImageBackground, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { tokens } from '../theme/tokens';

type Props = PropsWithChildren<{
  opacity?: number;
}>;

export function GrassBackground({ children, opacity = 1 }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: tokens.color.bg }}>
      <ImageBackground
        source={require('../../assets/images/grass-bg.png')}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{ opacity }}
      >
        {/* Darken + vignette for readability */}
        <LinearGradient
          colors={['rgba(4,12,8,0.72)', 'rgba(6,21,14,0.82)', tokens.color.bg]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0.00)', 'rgba(0,0,0,0.65)']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        {children}
      </ImageBackground>
    </View>
  );
}

