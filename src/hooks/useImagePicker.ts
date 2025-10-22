import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform } from 'react-native';

export async function pickImageFromGallery() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) throw new Error('Permission denied');

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
    allowsEditing: true,
  });

  if (result.canceled) return null;

  const compressed = await compressImage(result.assets[ 0 ].uri);
  return compressed;
}

export async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) throw new Error('Permission denied');

  const result = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: true,
  });
  if (result.canceled) return null;
  const compressed = await compressImage(result.assets[ 0 ].uri);
  return compressed;
}

async function compressImage(uri: string) {
  try {
    const actions = [{ resize: { width: 1024 } }];
    const manipResult = await ImageManipulator.manipulateAsync(uri, actions, {
      compress: 0.7,
      format: ImageManipulator.SaveFormat.JPEG,
    });
    return manipResult.uri;
  } catch (e) {
    console.warn('compressImage failed', e);
    return uri;
  }
}
