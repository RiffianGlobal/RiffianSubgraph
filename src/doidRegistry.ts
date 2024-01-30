import { BigInt, Bytes, log, crypto } from '@graphprotocol/graph-ts';
import {
  AddressChanged,
  DoidRegistry,
  NameRegistered,
  SetReverse,
} from '../generated/DoidRegistry/DoidRegistry';
import { User, Domain } from '../generated/schema';
import {
  ROOT_NODE,
  EMPTY_ADDRESS,
  createOrLoadUser,
  uint256ToByteArray,
} from './utils';

function createOrGetDomain(id: BigInt, ts: BigInt): Domain {
  // id = keccak(name), domain_id = keccak(keccak('doid')+id)
  let label = uint256ToByteArray(id);
  let domain = Domain.load(crypto.keccak256(ROOT_NODE.concat(label)).toHex());
  if (domain == null) {
    domain = new Domain(crypto.keccak256(ROOT_NODE.concat(label)).toHex());
    domain.owner = EMPTY_ADDRESS;
    domain.addr = EMPTY_ADDRESS;
    domain.createdAt = ts;
    domain.save();
  }
  return domain;
}

// function createOrGetAccount(owner: string): Account {
//   let account = Account.load(owner);
//   if (account == null) {
//     account = new Account(owner);
//     // account.doimains = [];
//     account.save();
//   }
//   return account;
// }

export function handleNameRegistered(event: NameRegistered): void {
  let domain = createOrGetDomain(event.params.id, event.block.timestamp);
  domain.createdAt = event.block.timestamp;
  domain.name = event.params.name + '.doid';
  domain.owner = event.params.owner.toHex();
  domain.addr = event.params.owner.toHex();
  domain.save();

  let user = createOrLoadUser(event.params.owner);
  user.save();
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
