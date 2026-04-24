import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { tokens } from '../theme/tokens';

type Props = PropsWithChildren<{
  padding?: number;
  radius?: number;
}>;

export function Card({ children, padding = 16, radius = tokens.radius.lg }: Props) {
  return (
    <View
      style={{
        // Default to stronger surface for consistent readability.
        backgroundColor: tokens.color.surfaceStrong,
        borderColor: tokens.color.border,
        borderWidth: 1,
        borderRadius: radius,
        padding,
      }}
    >
      {children}
    </View>
  );
}

