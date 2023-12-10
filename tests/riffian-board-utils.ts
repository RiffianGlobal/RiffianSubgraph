import { newTypedMockEventWithParams } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import { EventVote, NewSubject } from '../generated/RiffianBoard/RiffianBoard';

export function createNewSubjectEvent(
  owner: Address,
  Subject: Bytes,
  name: string,
  image: string,
  url: string
): NewSubject {
  return newTypedMockEventWithParams<NewSubject>([
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)),
    new ethereum.EventParam('subject', ethereum.Value.fromBytes(Subject)),
    new ethereum.EventParam('name', ethereum.Value.fromString(name)),
    new ethereum.EventParam('image', ethereum.Value.fromString(image)),
    new ethereum.EventParam('url', ethereum.Value.fromString(url)),
  ]);
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
