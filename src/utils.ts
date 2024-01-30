import { BigInt, ByteArray, Bytes } from '@graphprotocol/graph-ts';
import { User, VoteHourData } from '../generated/schema';
import { EventVote } from '../generated/RiffianBoard/RiffianBoard';

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

export function createOrLoadUser(bytesAddress: Bytes): User {
  let user = User.load(bytesAddress.toHex());
  if (user == null) {
    user = new User(bytesAddress.toHex());
    user.address = bytesAddress;
    user.holding = BigInt.zero();
    user.rewardClaimed = BigInt.zero();
    user.save();
  }
  return user as User;
}

export function updateVoteHourData(event: EventVote): VoteHourData {
  let ts = event.block.timestamp.toI32();
  let hourId = ts / 3600;
  let price = event.params.value;
  let voteHourId = event.params.subject
    .toHex()
    .concat('-')
    .concat(hourId.toString());

  let voteHourData = VoteHourData.load(voteHourId);
  if (voteHourData == null) {
    voteHourData = new VoteHourData(voteHourId);
    voteHourData.subject = event.params.subject.toHex();
    voteHourData.date = event.block.timestamp;
    voteHourData.volume = BigInt.zero();
    voteHourData.open = price;
    voteHourData.high = price;
    voteHourData.low = price;
    voteHourData.close = price;
  }
  if (price.gt(voteHourData.high)) {
    voteHourData.high = price;
  }
  if (price.lt(voteHourData.low)) {
    voteHourData.low = price;
  }
  // TODO vol += amount * price ???
  voteHourData.volume.plus(event.params.amount);
  voteHourData.close = price;
  voteHourData.save();
  return voteHourData;
}
