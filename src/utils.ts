import { BigInt, ByteArray, Bytes } from '@graphprotocol/graph-ts';
import { User, VoteHourData } from '../generated/schema';
import { EventVote } from '../generated/RiffianBoard/RiffianBoard';

export const DOID_NODE =
  '6b72dd7f9f8150600ddd5344f1cce104abe98b28da6f4b5bbd65fb0d9541149c';
// export const ROOT_NODE =
//   '0x0000000000000000000000000000000000000000000000000000000000000000';
export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ROOT_NODE: ByteArray = ByteArray.fromHexString(DOID_NODE);

export function uint256ToByteArray(i: BigInt): ByteArray {
  let hex = i.toHex().slice(2).padStart(64, '0');
  return ByteArray.fromHexString(hex);
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
  let hourId = event.block.timestamp.toI32() / 3600;
  let price = event.params.value;
  let voteHourId = event.params.subject
    .toHex()
    .concat('-')
    .concat(hourId.toString());

  let voteHourData = VoteHourData.load(voteHourId);
  if (voteHourData == null) {
    voteHourData = new VoteHourData(voteHourId);
    voteHourData.subject = event.params.subject.toHex();
    voteHourData.date = hourId;
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
  voteHourData.volume = voteHourData.volume.plus(event.params.amount);
  voteHourData.close = price;
  voteHourData.save();
  return voteHourData;
}
