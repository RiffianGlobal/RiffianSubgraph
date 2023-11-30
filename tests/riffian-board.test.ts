import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
} from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import { handleEventVote, handleNewAlbum, handleNewVote } from '../src/mapping';
import {
  createEventVoteEvent,
  createNewAlbumEvent,
  createNewVoteEvent,
} from './riffian-board-utils';
import { Album } from '../generated/schema';

describe('Create an album', () => {
  beforeAll(() => {});
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
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(artist, album);
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
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(artist, album);
    handleNewAlbum(newClaimAlbumRewardsEvent);

    let album2 = Address.fromString(
      '0x0000000000000000000000000000000000000003'
    );
    let newClaimAlbumRewardsEvent2 = createNewAlbumEvent(artist, album2);
    handleNewAlbum(newClaimAlbumRewardsEvent2);
    let amount = BigInt.fromString('50000000000000');
    let dist = BigInt.fromString('2500000000000');
    let newVoteEvent = createNewVoteEvent(
      artist,
      album2,
      amount,
      dist,
      dist,
      dist,
      dist,
      BigInt.fromI32(0)
    );
    handleNewVote(newVoteEvent);
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
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(artist1, album);
    handleNewAlbum(newClaimAlbumRewardsEvent);

    let album2 = Address.fromString(
      '0x0000000000000000000000000000000000000003'
    );
    let newClaimAlbumRewardsEvent2 = createNewAlbumEvent(artist2, album2);
    handleNewAlbum(newClaimAlbumRewardsEvent2);
    let amount = BigInt.fromString('50000000000000');
    let dist = BigInt.fromString('2500000000000');
    let newVoteEvent = createNewVoteEvent(
      artist1,
      album2,
      amount,
      dist,
      dist,
      dist,
      dist,
      BigInt.fromI32(0)
    );
    handleNewVote(newVoteEvent);
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
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(artist, album);
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
    let newVoteEvent = createNewVoteEvent(
      user,
      album,
      amount,
      dist,
      dist,
      dist,
      dist,
      dist
    );
    handleNewVote(newVoteEvent);
    assert.fieldEquals(
      'User',
      '0x0000000000000000000000000000000000000001',
      'id',
      '0x0000000000000000000000000000000000000001'
    );
    assert.entityCount('NewVote', 0);
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
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(artist, album);
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
    assert.entityCount('UserVote', 1);
    // assert.entityCount('')
  });
});
