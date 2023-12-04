import { Bytes, BigInt, log } from '@graphprotocol/graph-ts';
import {
  EventBind as EventBindEvent,
  EventClaimReward as EventClaimRewardEvent,
  EventVote as EventVoteEvent,
  Initialized as InitializedEvent,
  NewRewardDistribution as NewRewardDistributionEvent,
  NewSubject as NewSubjectEvent,
  NewVote as NewVoteEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from '../generated/RiffianBoard/RiffianBoard';
import {
  RewardDistribution,
  Social,
  Subject,
  User,
  UserVote,
  WeeklyPool,
} from '../generated/schema';

function createOrLoadUser(bytesAddress: Bytes): User {
  let user = User.load(bytesAddress);
  if (user == null) {
    user = new User(bytesAddress);
    user.account = bytesAddress;
    user.socials = [];
    user.subjects = [];
    user.totalVotes = BigInt.fromI32(0);
    user.save();
  }
  return user as User;
}

function createUserVote(event: EventVoteEvent, timestamp: BigInt): UserVote {
  let key =
    event.params.voter.toHex() +
    '-' +
    event.params.subject.toHex() +
    '-' +
    timestamp.toString();
  let userVote = new UserVote(key);
  userVote.createdTimestamp = timestamp;
  userVote.subject = event.params.subject;
  userVote.voter = event.params.voter;
  userVote.isVote = event.params.isVote;
  userVote.amount = event.params.amount;
  userVote.value = event.params.value;
  userVote.supply = event.params.supply;
  userVote.save();
  return userVote as UserVote;
}

function createOrLoadSocial(
  platform: string,
  pid: string,
  uri: string
): Social {
  let key = platform + '-' + pid;
  let social = Social.load(key);
  if (social == null) {
    social = new Social(key);
    social.pid = pid;
    social.platform = platform;
    social.uri = uri;
    social.save();
  }
  return social as Social;
}

function createOrLoadSubject(bytesSubject: Bytes, timestamp: BigInt): Subject {
  let subject = Subject.load(bytesSubject);
  if (subject == null) {
    subject = new Subject(bytesSubject);
    subject.subject = bytesSubject;
    subject.createdTimeStamp = timestamp;
    subject.updatedTimestamp = BigInt.fromI32(0);
    subject.name = '';
    subject.image = '';
    subject.uri = '';
    subject.owner = bytesSubject;
    subject.totalVotes = BigInt.fromI32(0);
    subject.save();
  }
  return subject as Subject;
}

export function handleEventBind(event: EventBindEvent): void {
  let user = createOrLoadUser(event.params.account);
  let social = createOrLoadSocial(
    event.params.platform,
    event.params.id,
    event.params.uri
  );
  let socials = user.socials;
  socials.push(social.id);
  user.socials = socials;
  user.save();
  log.info('bind user {} with social {}', [user.id.toHex(), social.id]);
}

// export function handleEventClaimReward(event: EventClaimRewardEvent): void {
//   let entity = new EventClaimReward(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   );
//   entity.account = event.params.account;
//   entity.week = event.params.week;
//   entity.reward = event.params.reward;

//   entity.blockNumber = event.block.number;
//   entity.blockTimestamp = event.block.timestamp;
//   entity.transactionHash = event.transaction.hash;

//   entity.save();
// }

export function handleEventVote(event: EventVoteEvent): void {
  createUserVote(event, event.block.timestamp);

  let user = createOrLoadUser(event.params.voter);
  let subject = createOrLoadSubject(
    event.params.subject,
    event.block.timestamp
  );
  if (event.params.isVote) {
    user.totalVotes = user.totalVotes.plus(BigInt.fromI32(1));
    subject.totalVotes = subject.totalVotes.plus(BigInt.fromI32(1));
  } else {
    user.totalVotes = user.totalVotes.minus(BigInt.fromI32(1));
    subject.totalVotes = subject.totalVotes.minus(BigInt.fromI32(1));
  }
  user.save();
  subject.save();
}

export function handleNewRewardDistribution(
  event: NewRewardDistributionEvent
): void {
  let dis = RewardDistribution.load('RewardDistribution');
  if (dis == null) {
    dis = new RewardDistribution('RewardDistribution');
  }
  dis.protocol = event.params._team;
  dis.subject = event.params._artist;
  dis.agent = event.params._daily;
  dis.board = event.params._subject;
  dis.save();
}

export function handleNewSubject(event: NewSubjectEvent): void {
  let subject = createOrLoadSubject(
    event.params.subject,
    event.block.timestamp
  );
  subject.name = event.params.name;
  subject.image = event.params.image;
  subject.uri = event.params.uri;
  subject.owner = event.params.owner;
  subject.save();

  let user = createOrLoadUser(event.params.owner);
  let subjects = user.subjects;
  subjects.push(subject.id);
  user.subjects = subjects;
  user.save();
  log.info('user {} create subject {}', [user.id.toHex(), subject.id.toHex()]);
}
