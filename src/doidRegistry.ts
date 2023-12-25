import {
  BigInt,
  Bytes,
  log,
  crypto,
  ByteArray,
  ens,
} from '@graphprotocol/graph-ts';
import {
  AddressChanged,
  DoidRegistry,
  NameRegistered,
  SetReverse,
} from '../generated/DoidRegistry/DoidRegistry';
import { Account, Domain } from '../generated/schema';
import {
  DOID_NODE,
  EMPTY_ADDRESS,
  byteArrayFromHex,
  concat,
  uint256ToByteArray,
} from './utils';

var rootNode: ByteArray = byteArrayFromHex(DOID_NODE);

function createOrGetDomain(id: BigInt): Domain {
  // id = keccak(name), domain_id = keccak(keccak('doid')+id)
  let label = uint256ToByteArray(id);
  let domain = Domain.load(crypto.keccak256(concat(rootNode, label)).toHex());
  if (domain == null) {
    domain = new Domain(crypto.keccak256(concat(rootNode, label)).toHex());
    domain.owner = EMPTY_ADDRESS;
    domain.addr = EMPTY_ADDRESS;
    domain.save();
  }
  return domain;
}

function createOrGetAccount(owner: string): Account {
  let account = Account.load(owner);
  if (account == null) {
    account = new Account(owner);
    account.save();
  }
  return account;
}

export function handleNameRegistered(event: NameRegistered): void {
  let domain = createOrGetDomain(event.params.id);
  domain.createdAt = event.block.timestamp;
  domain.name = event.params.name + '.doid';
  domain.owner = event.params.owner.toHex();
  domain.save();

  let account = createOrGetAccount(event.params.owner.toHex());
  account.save();
}

export function handleAddressChanged(event: AddressChanged): void {
  let domain = Domain.load(event.params.node.toHexString());
  if (domain) {
    domain.addr = event.params.newAddress.toHex();
    // domain.coinType;
    domain.save();
  }
}
export function handleSetReverse(event: SetReverse): void {}
