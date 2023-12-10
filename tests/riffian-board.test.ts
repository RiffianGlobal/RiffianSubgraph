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
import { Address, BigInt, dataSource, ethereum } from '@graphprotocol/graph-ts';
import { handleEventVote, handleNewAlbum } from '../src/mapping';
import {
  createEventVoteEvent,
  createNewAlbumEvent,
} from './riffian-board-utils';
import { Album } from '../generated/schema';
import { RiffianBoard } from '../generated/RiffianBoard/RiffianBoard';

describe('Create an album', () => {
  beforeAll(() => {
    let contractAddress = dataSource.address();
    let expectedResult = Address.fromString(
      '0x90cBa2Bbb19ecc291A12066Fd8329D65FA1f1947'
    );
    let bigIntParam = BigInt.fromString('1234');
    createMockedFunction(
      contractAddress,
      'getWeek',
      'getWeek():(uint256)'
    ).returns([ethereum.Value.fromSignedBigInt(BigInt.fromI32(1000))]);

    let gravity = RiffianBoard.bind(contractAddress);
    let result = gravity.getWeek();

    assert.equals(
      ethereum.Value.fromSignedBigInt(BigInt.fromI32(1000)),
      ethereum.Value.fromUnsignedBigInt(result)
    );
  });
  afterEach(() => {
    clearStore();
  });
  test('1 user creates an album', () => {
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(
      artist,
      album,
      'test',
      'image',
      'url'
    );
    handleNewAlbum(newClaimAlbumRewardsEvent);
    assert.entityCount('User', 1);
    assert.entityCount('Album', 1);

    let newAlbum = Album.load(album.toHex());
    assert.assertNotNull(newAlbum);
    // assert.i32Equals(newAlbum!.fansNumber, 0);
    assert.fieldEquals('Album', album.toHex(), 'fansNumber', '0', '');
    assert.fieldEquals('Album', album.toHex(), 'fans', '[]', '');
  });

  test('1 user creates 2 albums', () => {
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(
      artist,
      album,
      'test',
      'image',
      'url'
    );
    handleNewAlbum(newClaimAlbumRewardsEvent);

    let album2 = Address.fromString(
      '0x0000000000000000000000000000000000000003'
    );
    let newClaimAlbumRewardsEvent2 = createNewAlbumEvent(
      artist,
      album2,
      'test',
      'image',
      'url'
    );
    handleNewAlbum(newClaimAlbumRewardsEvent2);
    let amount = BigInt.fromString('50000000000000');
    let dist = BigInt.fromString('2500000000000');
    let newVoteEvent = createEventVoteEvent(
      artist,
      album2,
      true,
      amount,
      dist,
      dist
    );
    handleEventVote(newVoteEvent);
    assert.entityCount('User', 1);
    assert.entityCount('Album', 2);
  });

  test('2 user creates 2 albums', () => {
    let artist1 = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let artist2 = Address.fromString(
      '0x0000000000000000000000000000000000000011'
    );
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(
      artist1,
      album,
      'test',
      'image',
      'url'
    );
    handleNewAlbum(newClaimAlbumRewardsEvent);

    let album2 = Address.fromString(
      '0x0000000000000000000000000000000000000003'
    );
    let newClaimAlbumRewardsEvent2 = createNewAlbumEvent(
      artist2,
      album2,
      'test',
      'image',
      'url'
    );
    handleNewAlbum(newClaimAlbumRewardsEvent2);
    let amount = BigInt.fromString('50000000000000');
    let dist = BigInt.fromString('2500000000000');
    let newVoteEvent = createEventVoteEvent(
      artist1,
      album2,
      true,
      amount,
      dist,
      dist
    );
    handleEventVote(newVoteEvent);
    assert.entityCount('User', 2);
    assert.entityCount('Album', 2);
  });
});

describe('Vote an album', () => {
  beforeEach(() => {
    // create a album
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(
      artist,
      album,
      'test',
      'image',
      'url'
    );
    handleNewAlbum(newClaimAlbumRewardsEvent);
  });
  afterEach(() => {
    clearStore();
  });
  test('new vote', () => {
    let user = Address.fromString('0x0000000000000000000000000000000000000003');
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let amount = BigInt.fromI32(123);
    let dist = BigInt.fromI32(1);
    let newVoteEvent = createEventVoteEvent(
      user,
      album,
      true,
      amount,
      dist,
      dist
    );
    handleEventVote(newVoteEvent);
    assert.fieldEquals(
      'User',
      '0x0000000000000000000000000000000000000001',
      'id',
      '0x0000000000000000000000000000000000000001'
    );
    assert.entityCount('EventVote', 0);
  });
});

describe('Event vote', () => {
  beforeEach(() => {
    // create a album
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(
      artist,
      album,
      'test',
      'image',
      'url'
    );
    handleNewAlbum(newClaimAlbumRewardsEvent);
  });
  afterEach(() => {
    clearStore();
  });
  test('new vote', () => {
    let user = Address.fromString('0x0000000000000000000000000000000000000003');
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let amount = BigInt.fromI32(123);
    let value = BigInt.fromI32(1);
    let supply = BigInt.fromI32(1);
    let eventVote = createEventVoteEvent(
      user,
      album,
      true,
      amount,
      value,
      supply
    );
    handleEventVote(eventVote);
    assert.fieldEquals(
      'User',
      '0x0000000000000000000000000000000000000001',
      'id',
      '0x0000000000000000000000000000000000000001'
    );
    assert.entityCount('UserAlbumVote', 1);
    // assert.entityCount('')
  });
});
