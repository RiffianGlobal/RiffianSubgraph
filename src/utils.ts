import { BigInt, ByteArray } from '@graphprotocol/graph-ts';

export const DOID_NODE =
  '6b72dd7f9f8150600ddd5344f1cce104abe98b28da6f4b5bbd65fb0d9541149c';
export const ROOT_NODE =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

// Helper for concatenating two byte arrays
export function concat(a: ByteArray, b: ByteArray): ByteArray {
  return a.concat(b);
  // let out = new Uint8Array(a.length + b.length);
  // for (let i = 0; i < a.length; i++) {
  //   out[i] = a[i];
  // }
  // for (let j = 0; j < b.length; j++) {
  //   out[a.length + j] = b[j];
  // }
  // // return out as ByteArray
}

export function byteArrayFromHex(s: string): ByteArray {
  return ByteArray.fromHexString(s);
  // if (s.length % 2 !== 0) {
  //   throw new TypeError('Hex string must have an even number of characters');
  // }
  // let out = new Uint8Array(s.length / 2);
  // for (var i = 0; i < s.length; i += 2) {
  //   out[i / 2] = parseInt(s.substring(i, i + 2), 16) as u32;
  // }
  // return <ByteArray>out;
  // return out as ByteArray;
}

export function uint256ToByteArray(i: BigInt): ByteArray {
  let hex = i.toString().slice(2).padStart(64, '0');
  return byteArrayFromHex(hex);
}
