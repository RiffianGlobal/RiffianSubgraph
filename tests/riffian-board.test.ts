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
import {
  // handleEventBind,
  handleEventVote,
  handleNewSubject,
} from '../src/mapping';
import {
  // createEventBindEvent,
  createEventVoteEvent,
  createNewSubjectEvent,
} from './riffian-board-utils';
import { Subject } from '../generated/schema';
import { RiffianBoard } from '../generated/RiffianBoard/RiffianBoard';

describe('Create an Subject', () => {
  beforeAll(() => {
    let contractAddress = dataSource.address();
    createMockedFunction(
      contractAddress,
      'getWeek',
      'getWeek():(uint256)'
    ).returns([ethereum.Value.fromSignedBigInt(BigInt.fromI32(1000))]);

    let board = RiffianBoard.bind(contractAddress);
    let result = board.getWeek();

    assert.equals(
      ethereum.Value.fromSignedBigInt(BigInt.fromI32(1000)),
      ethereum.Value.fromUnsignedBigInt(result)
    );
  });
  afterEach(() => {
    clearStore();
  });
  test('1 user creates an Subject', () => {
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let subject = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimSubjectRewardsEvent = createNewSubjectEvent(
      artist,
      subject,
      'test',
      'image',
      'url'
    );
    handleNewSubject(newClaimSubjectRewardsEvent);
    assert.entityCount('User', 1);
    assert.entityCount('Subject', 1);

    let newSubject = Subject.load(subject.toHex());
    assert.assertNotNull(newSubject);
    // assert.i32Equals(newSubject!.fansNumber, 0);
    assert.fieldEquals('Subject', subject.toHex(), 'fansNumber', '0', '');
    assert.fieldEquals('Subject', subject.toHex(), 'fans', '[]', '');
  });

  test('1 user creates 2 Subjects', () => {
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let Subject = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimSubjectRewardsEvent = createNewSubjectEvent(
      artist,
      Subject,
      'test',
      'image',
      'url'
    );
    handleNewSubject(newClaimSubjectRewardsEvent);

    let subject2 = Address.fromString(
      '0x0000000000000000000000000000000000000003'
    );
    let newClaimSubjectRewardsEvent2 = createNewSubjectEvent(
      artist,
      subject2,
      'test',
      'image',
      'url'
    );
    handleNewSubject(newClaimSubjectRewardsEvent2);
    let amount = BigInt.fromString('50000000000000');
    let dist = BigInt.fromString('2500000000000');
    let newVoteEvent = createEventVoteEvent(
      artist,
      subject2,
      true,
      amount,
      dist,
      dist
    );
    handleEventVote(newVoteEvent);
    assert.entityCount('User', 1);
    assert.entityCount('Subject', 2);
  });

  test('2 user creates 2 Subjects', () => {
    let artist1 = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let artist2 = Address.fromString(
      '0x0000000000000000000000000000000000000011'
    );
    let Subject = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimSubjectRewardsEvent = createNewSubjectEvent(
      artist1,
      Subject,
      'test',
      'image',
      'url'
    );
    handleNewSubject(newClaimSubjectRewardsEvent);

    let Subject2 = Address.fromString(
      '0x0000000000000000000000000000000000000003'
    );
    let newClaimSubjectRewardsEvent2 = createNewSubjectEvent(
      artist2,
      Subject2,
      'test',
      'image',
      'url'
    );
    handleNewSubject(newClaimSubjectRewardsEvent2);
    let amount = BigInt.fromString('50000000000000');
    let dist = BigInt.fromString('2500000000000');
    let newVoteEvent = createEventVoteEvent(
      artist1,
      Subject2,
      true,
      amount,
      dist,
      dist
    );
    handleEventVote(newVoteEvent);
    assert.entityCount('User', 2);
    assert.entityCount('Subject', 2);
  });
});

describe('Vote an Subject', () => {
  beforeEach(() => {
    // create a Subject
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let Subject = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimSubjectRewardsEvent = createNewSubjectEvent(
      artist,
      Subject,
      'test',
      'image',
      'url'
    );
    handleNewSubject(newClaimSubjectRewardsEvent);
  });
  afterEach(() => {
    clearStore();
  });
  test('new vote', () => {
    let user = Address.fromString('0x0000000000000000000000000000000000000003');
    let Subject = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let amount = BigInt.fromI32(123);
    let dist = BigInt.fromI32(1);
    let newVoteEvent = createEventVoteEvent(
      user,
      Subject,
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
    // create a Subject
    let artist = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let Subject = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newClaimSubjectRewardsEvent = createNewSubjectEvent(
      artist,
      Subject,
      'test',
      'image',
      'url'
    );
    handleNewSubject(newClaimSubjectRewardsEvent);
  });
  afterEach(() => {
    clearStore();
  });
  test('new vote', () => {
    let user = Address.fromString('0x0000000000000000000000000000000000000003');
    let Subject = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let amount = BigInt.fromI32(123);
    let value = BigInt.fromI32(1);
    let supply = BigInt.fromI32(1);
    let eventVote = createEventVoteEvent(
      user,
      Subject,
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
    assert.entityCount('UserSubjectVote', 1);
    // assert.entityCount('')
  });
});
