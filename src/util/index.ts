import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export function normalize(size: number): number {
  const scale = width / 320;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
