/// <reference types="nativewind/types" />

import { ComponentType } from 'react';
import { StyledComponent } from 'nativewind';

declare module 'react-native-gesture-handler' {
  // Isso adiciona suporte a className no RectButton e outros componentes do pacote
  export const RectButton: StyledComponent<ComponentType<any>>;
}