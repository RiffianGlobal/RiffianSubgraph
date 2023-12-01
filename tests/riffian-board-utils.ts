import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  EventBind,
  EventClaimReward,
  EventVote,
  Initialized,
  NewRewardDistribution,
  NewSubject,
  NewVote,
  OwnershipTransferred
} from "../generated/RiffianBoard/RiffianBoard"

export function createEventBindEvent(
  account: Address,
  platform: string,
  id: string,
  uri: string
): EventBind {
  let eventBindEvent = changetype<EventBind>(newMockEvent())

  eventBindEvent.parameters = new Array()

  eventBindEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  eventBindEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromString(platform))
  )
  eventBindEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromString(id))
  )
  eventBindEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return eventBindEvent
}

export function createEventClaimRewardEvent(
  account: Address,
  week: BigInt,
  reward: BigInt
): EventClaimReward {
  let eventClaimRewardEvent = changetype<EventClaimReward>(newMockEvent())

  eventClaimRewardEvent.parameters = new Array()

  eventClaimRewardEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  eventClaimRewardEvent.parameters.push(
    new ethereum.EventParam("week", ethereum.Value.fromUnsignedBigInt(week))
  )
  eventClaimRewardEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )

  return eventClaimRewardEvent
}

export function createEventVoteEvent(
  voter: Address,
  subject: Bytes,
  isVote: boolean,
  amount: BigInt,
  value: BigInt,
  supply: BigInt
): EventVote {
  let eventVoteEvent = changetype<EventVote>(newMockEvent())

  eventVoteEvent.parameters = new Array()

  eventVoteEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  eventVoteEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromFixedBytes(subject))
  )
  eventVoteEvent.parameters.push(
    new ethereum.EventParam("isVote", ethereum.Value.fromBoolean(isVote))
  )
  eventVoteEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  eventVoteEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  eventVoteEvent.parameters.push(
    new ethereum.EventParam("supply", ethereum.Value.fromUnsignedBigInt(supply))
  )

  return eventVoteEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createNewRewardDistributionEvent(
  _team: BigInt,
  _artist: BigInt,
  _daily: BigInt,
  _subject: BigInt
): NewRewardDistribution {
  let newRewardDistributionEvent = changetype<NewRewardDistribution>(
    newMockEvent()
  )

  newRewardDistributionEvent.parameters = new Array()

  newRewardDistributionEvent.parameters.push(
    new ethereum.EventParam("_team", ethereum.Value.fromUnsignedBigInt(_team))
  )
  newRewardDistributionEvent.parameters.push(
    new ethereum.EventParam(
      "_artist",
      ethereum.Value.fromUnsignedBigInt(_artist)
    )
  )
  newRewardDistributionEvent.parameters.push(
    new ethereum.EventParam("_daily", ethereum.Value.fromUnsignedBigInt(_daily))
  )
  newRewardDistributionEvent.parameters.push(
    new ethereum.EventParam(
      "_subject",
      ethereum.Value.fromUnsignedBigInt(_subject)
    )
  )

  return newRewardDistributionEvent
}

export function createNewSubjectEvent(
  owner: Address,
  subject: Bytes,
  name: string,
  image: string,
  uri: string
): NewSubject {
  let newSubjectEvent = changetype<NewSubject>(newMockEvent())

  newSubjectEvent.parameters = new Array()

  newSubjectEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  newSubjectEvent.parameters.push(
    new ethereum.EventParam("subject", ethereum.Value.fromFixedBytes(subject))
  )
  newSubjectEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  newSubjectEvent.parameters.push(
    new ethereum.EventParam("image", ethereum.Value.fromString(image))
  )
  newSubjectEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return newSubjectEvent
}

export function createNewVoteEvent(
  from: Address,
  to: Address,
  amount: BigInt,
  dailyRewardAmount: BigInt,
  subjectPoolRewardAmount: BigInt,
  teamRewardAmount: BigInt,
  artistRewardAmount: BigInt,
  seq: BigInt
): NewVote {
  let newVoteEvent = changetype<NewVote>(newMockEvent())

  newVoteEvent.parameters = new Array()

  newVoteEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      "dailyRewardAmount",
      ethereum.Value.fromUnsignedBigInt(dailyRewardAmount)
    )
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      "subjectPoolRewardAmount",
      ethereum.Value.fromUnsignedBigInt(subjectPoolRewardAmount)
    )
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      "teamRewardAmount",
      ethereum.Value.fromUnsignedBigInt(teamRewardAmount)
    )
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam(
      "artistRewardAmount",
      ethereum.Value.fromUnsignedBigInt(artistRewardAmount)
    )
  )
  newVoteEvent.parameters.push(
    new ethereum.EventParam("seq", ethereum.Value.fromUnsignedBigInt(seq))
  )

  return newVoteEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
