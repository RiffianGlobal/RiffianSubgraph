import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
// import { ClaimAlbumRewards } from "../generated/schema"
// import { ClaimAlbumRewards as ClaimAlbumRewardsEvent } from "../generated/RiffianBoard/RiffianBoard"
// import { handleClaimAlbumRewards } from "../src/riffian-board"
// import { createClaimAlbumRewardsEvent } from "./riffian-board-utils"
import { handleNewAlbum, handleNewVote } from '../src/mapping';
import { createNewAlbumEvent, createNewVoteEvent } from './riffian-board-utils';

describe('Create an album', () => {
  beforeAll(() => {});
  test('new album', () => {
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(artist, album);
    handleNewAlbum(newClaimAlbumRewardsEvent);
    assert.entityCount('NewAlbum', 0);
  });

  test('create 2 albums', () => {
    assert.entityCount('NewAlbum', 0);
    let artist = Address.fromString(
      '0x9140661bc3e870a87972c698da7f6c04109f493c'
    );
    let album = Address.fromString(
      '0x74396bB071392fFf19DdC54c812D86363cc87553'
    );
    let newClaimAlbumRewardsEvent = createNewAlbumEvent(artist, album);
    handleNewAlbum(newClaimAlbumRewardsEvent);

    let album2 = Address.fromString(
      '0x1575600eddabe10c7a8cf59436b1654959d583f1'
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
    assert.entityCount('NewVote', 0);
  });
});

describe('Vote an album', () => {
  beforeAll(() => {
    let user = Address.fromString('0x0000000000000000000000000000000000000001');
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
  });
  test('new vote', () => {
    assert.entityCount('NewVote', 0);
  });
});

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let account = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let album = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let reward = BigInt.fromI32(234);
    // let newClaimAlbumRewardsEvent = createClaimAlbumRewardsEvent(
    //   account,
    //   album,
    //   reward
    // )
    // handleClaimAlbumRewards(newClaimAlbumRewardsEvent)
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  // test('ClaimAlbumRewards created and stored', () => {
  //   assert.entityCount('ClaimAlbumRewards', 1);

  //   // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
  //   assert.fieldEquals(
  //     'ClaimAlbumRewards',
  //     '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
  //     'account',
  //     '0x0000000000000000000000000000000000000001'
  //   );
  //   assert.fieldEquals(
  //     'ClaimAlbumRewards',
  //     '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
  //     'album',
  //     '0x0000000000000000000000000000000000000001'
  //   );
  //   assert.fieldEquals(
  //     'ClaimAlbumRewards',
  //     '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
  //     'reward',
  //     '234'
  //   );

  //   // More assert options:
  //   // https://thegraph.com/docs/en/developer/matchstick/#asserts
  // });
});
