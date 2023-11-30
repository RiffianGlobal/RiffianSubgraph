import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';
import {
  ClaimAlbumRewards,
  ClaimDailyRewards,
  Initialized,
  NewAlbum,
  NewRewardDistribution,
  NewVote,
  OwnershipTransferred,
} from '../generated/RiffianBoard/Riffian';
import { EventVote } from '../generated/RiffianBoard/RiffianBoard';

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

export function createNewAlbumEvent(owner: Address, album: Address): NewAlbum {
  let newAlbumEvent = changetype<NewAlbum>(newMockEvent());

  newAlbumEvent.parameters = new Array();

  newAlbumEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  );
  newAlbumEvent.parameters.push(
    new ethereum.EventParam('album', ethereum.Value.fromAddress(album))
  );

  return newAlbumEvent;
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

export function createNewVoteEvent(
  from: Address,
  to: Address,
  amount: BigInt,
  dailyRewardAmount: BigInt,
  albumPoolRewardAmount: BigInt,
  teamRewardAmount: BigInt,
  artistRewardAmount: BigInt,
  seq: BigInt
): NewVote {
  let newVoteEvent = changetype<NewVote>(newMockEvent());

  newVoteEvent.parameters = new Array();

  newVoteEvent.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from))
  );
  newVoteEvent.parameters.push(
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to))
  );
  newVoteEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      'dailyRewardAmount',
      ethereum.Value.fromUnsignedBigInt(dailyRewardAmount)
    )
  );
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      'albumPoolRewardAmount',
      ethereum.Value.fromUnsignedBigInt(albumPoolRewardAmount)
    )
  );
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      'teamRewardAmount',
      ethereum.Value.fromUnsignedBigInt(teamRewardAmount)
    )
  );
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      'artistRewardAmount',
      ethereum.Value.fromUnsignedBigInt(artistRewardAmount)
    )
  );
  newVoteEvent.parameters.push(
    new ethereum.EventParam('seq', ethereum.Value.fromUnsignedBigInt(seq))
  );

  return newVoteEvent;
}

export function createEventVoteEvent(
  voter: Address,
  album: Address,
  isVote: boolean,
  amount: BigInt,
  value: BigInt,
  supply: BigInt
): EventVote {
  let eventVoteEvent = changetype<EventVote>(newMockEvent());

  eventVoteEvent.parameters = new Array();

  // (address voter, address album, bool isVote, uint256 amount, uint256 value, uint256 supply);
  eventVoteEvent.parameters.push(
    new ethereum.EventParam('voter', ethereum.Value.fromAddress(voter))
  );
  eventVoteEvent.parameters.push(
    new ethereum.EventParam('album', ethereum.Value.fromAddress(album))
  );
  eventVoteEvent.parameters.push(
    new ethereum.EventParam('isVote', ethereum.Value.fromBoolean(isVote))
  );
  eventVoteEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  eventVoteEvent.parameters.push(
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value))
  );
  eventVoteEvent.parameters.push(
    new ethereum.EventParam('supply', ethereum.Value.fromUnsignedBigInt(supply))
  );
  return eventVoteEvent;
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
