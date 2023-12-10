import { newMockEvent, newTypedMockEventWithParams } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  ClaimAlbumRewards,
  ClaimDailyRewards,
  Initialized,
  NewRewardDistribution,
  OwnershipTransferred,
} from '../generated/RiffianBoard/Riffian';
import { EventVote, NewSubject } from '../generated/RiffianBoard/RiffianBoard';

export function createClaimAlbumRewardsEvent(
  account: Address,
  album: Address,
  reward: BigInt
): ClaimAlbumRewards {
  let claimAlbumRewardsEvent = changetype<ClaimAlbumRewards>(newMockEvent());

  claimAlbumRewardsEvent.parameters = new Array();

  claimAlbumRewardsEvent.parameters.push(
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account))
  );
  claimAlbumRewardsEvent.parameters.push(
    new ethereum.EventParam('album', ethereum.Value.fromAddress(album))
  );
  claimAlbumRewardsEvent.parameters.push(
    new ethereum.EventParam('reward', ethereum.Value.fromUnsignedBigInt(reward))
  );

  return claimAlbumRewardsEvent;
}

export function createClaimDailyRewardsEvent(
  account: Address,
  reward: BigInt
): ClaimDailyRewards {
  let claimDailyRewardsEvent = changetype<ClaimDailyRewards>(newMockEvent());

  claimDailyRewardsEvent.parameters = new Array();

  claimDailyRewardsEvent.parameters.push(
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account))
  );
  claimDailyRewardsEvent.parameters.push(
    new ethereum.EventParam('reward', ethereum.Value.fromUnsignedBigInt(reward))
  );

  return claimDailyRewardsEvent;
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent());

  initializedEvent.parameters = new Array();

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      'version',
      ethereum.Value.fromUnsignedBigInt(version)
    )
  );

  return initializedEvent;
}

export function createNewAlbumEvent(
  owner: Address,
  album: Bytes,
  name: string,
  image: string,
  url: string
): NewSubject {
  return newTypedMockEventWithParams<NewSubject>([
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)),
    new ethereum.EventParam('subject', ethereum.Value.fromBytes(album)),
    new ethereum.EventParam('name', ethereum.Value.fromString(name)),
    new ethereum.EventParam('image', ethereum.Value.fromString(image)),
    new ethereum.EventParam('url', ethereum.Value.fromString(url)),
  ]);
}

export function createNewRewardDistributionEvent(
  _team: BigInt,
  _artist: BigInt,
  _daily: BigInt,
  _album: BigInt
): NewRewardDistribution {
  let newRewardDistributionEvent = changetype<NewRewardDistribution>(
    newMockEvent()
  );

  newRewardDistributionEvent.parameters = new Array();

  newRewardDistributionEvent.parameters.push(
    new ethereum.EventParam('_team', ethereum.Value.fromUnsignedBigInt(_team))
  );
  newRewardDistributionEvent.parameters.push(
    new ethereum.EventParam(
      '_artist',
      ethereum.Value.fromUnsignedBigInt(_artist)
    )
  );
  newRewardDistributionEvent.parameters.push(
    new ethereum.EventParam('_daily', ethereum.Value.fromUnsignedBigInt(_daily))
  );
  newRewardDistributionEvent.parameters.push(
    new ethereum.EventParam('_album', ethereum.Value.fromUnsignedBigInt(_album))
  );

  return newRewardDistributionEvent;
}

export function createEventVoteEvent(
  voter: Address,
  subject: Bytes,
  isVote: boolean,
  amount: BigInt,
  value: BigInt,
  supply: BigInt
): EventVote {
  return newTypedMockEventWithParams<EventVote>([
    new ethereum.EventParam('voter', ethereum.Value.fromAddress(voter)),
    new ethereum.EventParam('subject', ethereum.Value.fromBytes(subject)),
    new ethereum.EventParam('isVote', ethereum.Value.fromBoolean(isVote)),
    new ethereum.EventParam(
      'amount',
      ethereum.Value.fromUnsignedBigInt(amount)
    ),
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value)),
    new ethereum.EventParam(
      'supply',
      ethereum.Value.fromUnsignedBigInt(supply)
    ),
  ]);
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  );

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      'previousOwner',
      ethereum.Value.fromAddress(previousOwner)
    )
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam('newOwner', ethereum.Value.fromAddress(newOwner))
  );

  return ownershipTransferredEvent;
}
