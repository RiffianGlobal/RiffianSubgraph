import { newTypedMockEventWithParams } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  AddressChanged,
  NameRegistered,
} from '../generated/DoidRegistry/DoidRegistry';

// NameRegistered(id, name, owner)
export function createNameRegisteredEvent(
  id: BigInt,
  name: string,
  owner: Address
): NameRegistered {
  return newTypedMockEventWithParams<NameRegistered>([
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id)),
    new ethereum.EventParam('name', ethereum.Value.fromString(name)),
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner)),
  ]);
}

// emit AddressChanged(nodeHash, coinType, a);
export function createAddressChangedEvent(
  nodeHash: Bytes,
  coinType: BigInt,
  a: Bytes
): AddressChanged {
  return newTypedMockEventWithParams<AddressChanged>([
    new ethereum.EventParam('nodehash', ethereum.Value.fromBytes(nodeHash)),
    new ethereum.EventParam(
      'coinType',
      ethereum.Value.fromUnsignedBigInt(coinType)
    ),
    new ethereum.EventParam('a', ethereum.Value.fromBytes(a)),
  ]);
}
