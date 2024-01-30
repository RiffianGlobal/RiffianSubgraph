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
  ByteArray,
  Bytes,
  dataSource,
  ethereum,
  log,
  crypto,
} from '@graphprotocol/graph-ts';
import { User, Domain } from '../generated/schema';
import { createNameRegisteredEvent } from './doidRegistry-event-mock';
import { handleNameRegistered } from '../src/doidRegistry';
import { DOID_NODE, ROOT_NODE, uint256ToByteArray } from '../src/utils';

describe('register a dns', () => {
  beforeAll(() => {});
  afterEach(() => {
    clearStore();
  });
  test('uint256ToByteArray', () => {
    let input1 = BigInt.fromI32(1);

    let ret1 = ByteArray.fromHexString(
      '6b72dd7f9f8150600ddd5344f1cce104abe98b28da6f4b5bbd65fb0d9541149c'
    );
    let ret2 = ByteArray.fromHexString(
      '0139576f27818336f7f7867459856136d2850cc13a33e02e0a72964f4ace128b'
    );

    // int has to pad to 64
    let input = BigInt.fromString(
      '553626579922342878904857547027925839237794642328950900176345881637701948043'
      // '139576f27818336f7f7867459856136d2850cc13a33e02e0a72964f4ace128b'
      // '6b72dd7f9f8150600ddd5344f1cce104abe98b28da6f4b5bbd65fb0d9541149c'
      // '12123333333333333333333333333333322222222313333333333333333333333333333331111'
    );
    let input2 = input.toHex().slice(2);
    let input3 = input2.padStart(64, '0');
    let ret3 = ByteArray.fromHexString(input3);

    assert.assertTrue(
      ret3 == uint256ToByteArray(input),
      'uint256ToByteArray got wrong result'
    );
  });
  test('register', () => {
    let id = BigInt.fromString(
      '553626579922342878904857547027925839237794642328950900176345881637701948043'
    );
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

    let label = uint256ToByteArray(id);
    let domain = Domain.load(crypto.keccak256(ROOT_NODE.concat(label)).toHex());
    assert.assertNotNull(domain);
    assert.fieldEquals(
      'Domain',
      domain!.id,
      'name',
      name + '.doid',
      'invalid name'
    );
    assert.fieldEquals(
      'Domain',
      domain!.id,
      'addr',
      owner.toHex(),
      'invalid address'
    );
  });
});
