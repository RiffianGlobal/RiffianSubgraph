import {
  EventBind as EventBindEvent,
  EventClaimReward as EventClaimRewardEvent,
  EventVote as EventVoteEvent,
  Initialized as InitializedEvent,
  NewRewardDistribution as NewRewardDistributionEvent,
  NewSubject as NewSubjectEvent,
  NewVote as NewVoteEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/RiffianBoard/RiffianBoard"
import {
  EventBind,
  EventClaimReward,
  EventVote,
  Initialized,
  NewRewardDistribution,
  NewSubject,
  NewVote,
  OwnershipTransferred
} from "../generated/schema"

export function handleEventBind(event: EventBindEvent): void {
  let entity = new EventBind(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.platform = event.params.platform
  entity.id = event.params.id
  entity.uri = event.params.uri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventClaimReward(event: EventClaimRewardEvent): void {
  let entity = new EventClaimReward(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.week = event.params.week
  entity.reward = event.params.reward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventVote(event: EventVoteEvent): void {
  let entity = new EventVote(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.subject = event.params.subject
  entity.isVote = event.params.isVote
  entity.amount = event.params.amount
  entity.value = event.params.value
  entity.supply = event.params.supply

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewRewardDistribution(
  event: NewRewardDistributionEvent
): void {
  let entity = new NewRewardDistribution(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._team = event.params._team
  entity._artist = event.params._artist
  entity._daily = event.params._daily
  entity._subject = event.params._subject

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewSubject(event: NewSubjectEvent): void {
  let entity = new NewSubject(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.subject = event.params.subject
  entity.name = event.params.name
  entity.image = event.params.image
  entity.uri = event.params.uri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewVote(event: NewVoteEvent): void {
  let entity = new NewVote(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.dailyRewardAmount = event.params.dailyRewardAmount
  entity.subjectPoolRewardAmount = event.params.subjectPoolRewardAmount
  entity.teamRewardAmount = event.params.teamRewardAmount
  entity.artistRewardAmount = event.params.artistRewardAmount
  entity.seq = event.params.seq

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
