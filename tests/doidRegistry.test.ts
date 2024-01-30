import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
  createMockedFunction,
} from 'matchstick-as/assembly/index';
import {
  Address,
  BigInt,
  Bytes,
  dataSource,
  ethereum,
  log,
} from '@graphprotocol/graph-ts';
import { User, Domain } from '../generated/schema';
import { createNameRegisteredEvent } from './doidRegistry-event-mock';
import { handleNameRegistered } from '../src/doidRegistry';

describe('register a dns', () => {
  beforeAll(() => {});
  afterEach(() => {
    clearStore();
  });
  test('register', () => {
    let id = BigInt.fromString('1');
    let owner = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let name = 'doidtest';
    let newRegisterEvent = createNameRegisteredEvent(id, name, owner);
    handleNameRegistered(newRegisterEvent);

    assert.entityCount('User', 1);
    assert.entityCount('Domain', 1);

    let newAccount = User.load(owner.toHex());
    assert.assertNotNull(newAccount);
    assert.assertNotNull(newAccount!.doimains);
    // assert.i32Equals(newAccount!.doimains!.length, 1, '');
    // assert.fieldEquals(
    //   'Account',
    //   owner.toHex(),
    //   'domains',
    //   `[${domain}]`,
    //   ''
    // );
    let newDomain = Domain.load(newAccount!.doimains[0]);
    assert.assertNotNull(newDomain);
    assert.fieldEquals(
      'Domain',
      newAccount!.doimains[0],
      'name',
      name + '.doid',
      ''
    );
    assert.fieldEquals(
      'Domain',
      newAccount!.doimains[0],
      'addr',
      owner.toHex(),
      ''
    );
  });
});
