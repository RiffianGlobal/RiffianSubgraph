import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from 'matchstick-as/assembly/index';
import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import { EventBind as EventBindEvent } from '../generated/RiffianBoard/RiffianBoard';
import {
  handleEventBind,
  handleEventVote,
  handleNewSubject,
} from '../src/riffian-board';
import {
  createEventBindEvent,
  createEventVoteEvent,
  createNewSubjectEvent,
} from './riffian-board-utils';

let account = Address.fromString('0x0000000000000000000000000000000000000001');
let subject = Address.fromString('0x0000000000000000000000000000000000000002');
describe('', () => {
  beforeAll(() => {});

  afterAll(() => {
    clearStore();
  });
  test('event bind', () => {
    let platform = 'X';
    let id = '112233';
    let uri = 'uri.example';
    let newEventBindEvent = createEventBindEvent(account, platform, id, uri);
    handleEventBind(newEventBindEvent);
    assert.entityCount('User', 1);
    assert.entityCount('Social', 1);
    assert.fieldEquals(
      'User',
      account.toHex(),
      'socials',
      `[${platform}-${id}]`
    );
  });

  test('create Subject', () => {
    let newSubject = createNewSubjectEvent(
      account,
      subject,
      'test1',
      'image',
      'uri.exp'
    );
    handleNewSubject(newSubject);
    assert.entityCount('User', 1);
    assert.entityCount('Subject', 1);
    assert.fieldEquals(
      'User',
      account.toHex(),
      'subjects',
      `[${subject.toHex()}]`
    );
    assert.fieldEquals('Subject', subject.toHex(), 'owner', account.toHex());
  });
});
describe('user vote', () => {
  beforeEach(() => {
    // bind social
    let platform = 'X';
    let id = '112233';
    let uri = 'uri.example';
    let newEventBindEvent = createEventBindEvent(account, platform, id, uri);
    handleEventBind(newEventBindEvent);
    // create subject
    let newSubject = createNewSubjectEvent(
      account,
      subject,
      'test1',
      'image',
      'uri.exp'
    );
    handleNewSubject(newSubject);
  });
  afterEach(() => {
    clearStore();
  });
  test('vote', () => {
    let voter = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let subject = Address.fromString(
      '0x0000000000000000000000000000000000000002'
    );
    let newVoteEvent = createEventVoteEvent(
      voter,
      subject,
      true,
      BigInt.fromI32(1),
      BigInt.fromI32(1),
      BigInt.fromI32(1)
    );
    handleEventVote(newVoteEvent);
    assert.entityCount('UserVote', 1);
    assert.fieldEquals('User', voter.toHex(), 'totalVotes', '1');
    assert.fieldEquals('Subject', subject.toHex(), 'totalVotes', '1');
    assert.fieldEquals(
      'UserVote',
      `${voter.toHex()}-${subject.toHex()}`,
      'amount',
      '1'
    );
  });
});
