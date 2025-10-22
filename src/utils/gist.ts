import md5 from 'md5';

export function getUuidFromHexadecimalText(hexadecimalText: string) {
  return (
    hexadecimalText.slice(0, 8) +
    '-' +
    hexadecimalText.slice(8, 12) +
    '-' +
    hexadecimalText.slice(12, 16) +
    '-' +
    hexadecimalText.slice(16, 20) +
    '-' +
    hexadecimalText.slice(20, 32)
  );
}

export function getRandomByteArray(byteCount: number) {
  let byteArray = new Uint8Array(byteCount);

  for (let byteIndex = 0; byteIndex < byteCount; ++byteIndex) {
    byteArray[byteIndex] = Math.floor(Math.random() * 256);
  }

  return byteArray;
}

export function getRandomHexadecimalText(byteCount: number) {
  let byteArray = getRandomByteArray(byteCount);
  let hexadecimalText = '';

  for (let byteIndex = 0; byteIndex < byteArray.length; ++byteIndex) {
    hexadecimalText += ('0' + byteArray[byteIndex].toString(16)).slice(-2);
  }

  return hexadecimalText;
}

export function getUuidFromText(text: string) {
  if (text === '') {
    return '00000000-0000-0000-0000-000000000000';
  } else {
    return getUuidFromHexadecimalText(md5(text));
  }
}

export function getRandomUuid() {
  return getUuidFromHexadecimalText(getRandomHexadecimalText(16));
}
