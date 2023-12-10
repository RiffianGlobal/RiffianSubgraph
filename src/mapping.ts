import { BigInt, Bytes, log, dataSource } from '@graphprotocol/graph-ts';
import {
  Subject,
  SubjectWeeklyVote,
  User,
  Social,
  UserSubjectVote,
  UserWeeklyVote,
  VoteLog,
  Statistic,
  WeeklyStatistic,
  UserSubjectWeeklyVote,
} from '../generated/schema';
import {
  EventBind,
  EventVote,
  NewSubject,
  RiffianBoard,
} from '../generated/RiffianBoard/RiffianBoard';

function getWeek(): i32 {
  let contract = RiffianBoard.bind(dataSource.address());
  return contract.try_getWeek().value.toI32();
}

function createOrLoadStatistic(): Statistic {
  let statistic = Statistic.load('riffian');
  if (statistic == null) {
    statistic = new Statistic('riffian');
    statistic.week = getWeek();
    statistic.totalVoteValue = BigInt.zero();
    statistic.totalVotes = BigInt.zero();
  }
  return statistic;
}

function createOrLoadUser(bytesAddress: Bytes): User {
  let user = User.load(bytesAddress.toHex());
  if (user == null) {
    user = new User(bytesAddress.toHex());
    user.address = bytesAddress;
    user.holding = BigInt.zero();
    user.rewardClaimed = BigInt.zero();
    user.save();
  }
  return user as User;
}

function createOrLoadSubject(bytesSubject: Bytes): Subject {
  let subject = Subject.load(bytesSubject.toHex());
  if (subject == null) {
    subject = new Subject(bytesSubject.toHex());
    subject.address = bytesSubject;
    subject.name = '';
    subject.image = '';
    subject.uri = '';
    subject.createdAt = 0;
    subject.lastVoteAt = 0;
    subject.creator = '';
    subject.fans = [];
    subject.fansNumber = 0;
    subject.supply = BigInt.zero();
    subject.totalVoteValue = BigInt.zero();
    subject.volumeVote = BigInt.zero();
    subject.volumeRetreat = BigInt.zero();
    subject.volumeTotal = BigInt.zero();
    subject.save();
  }
  return subject;
}

function createOrLoadSubjectWeeklyVote(
  subject: Bytes,
  week: i32
): SubjectWeeklyVote {
  let weeklyVote = SubjectWeeklyVote.load(
    subject.toHex() + '-' + week.toString()
  );
  if (weeklyVote == null) {
    weeklyVote = new SubjectWeeklyVote(subject.toHex() + '-' + week.toString());
    weeklyVote.subject = subject.toHex();
    weeklyVote.week = week;
    weeklyVote.votes = BigInt.zero();
    weeklyVote.retreats = BigInt.zero();
    weeklyVote.volumeVote = BigInt.zero();
    weeklyVote.volumeRetreat = BigInt.zero();
    weeklyVote.volumeTotal = BigInt.zero();
    weeklyVote.save();
  }
  return weeklyVote;
}

function createOrLoadUserSubjectVote(
  user: Bytes,
  subject: Bytes
): UserSubjectVote {
  let userSubjectVote = UserSubjectVote.load(
    user.toHex() + '-' + subject.toHex()
  );
  if (userSubjectVote == null) {
    userSubjectVote = new UserSubjectVote(user.toHex() + '-' + subject.toHex());
    userSubjectVote.user = user.toHex();
    userSubjectVote.subject = subject.toHex();
    userSubjectVote.holding = BigInt.zero();
    userSubjectVote.votes = BigInt.zero();
    userSubjectVote.retreats = BigInt.zero();
    userSubjectVote.volumeVote = BigInt.zero();
    userSubjectVote.volumeRetreat = BigInt.zero();
    userSubjectVote.volumeTotal = BigInt.zero();
    userSubjectVote.save();
  }
  return userSubjectVote;
}

function createOrLoadUserWeeklyVote(user: Bytes, week: i32): UserWeeklyVote {
  let weeklyVote = UserWeeklyVote.load(user.toHex() + '-' + week.toString());
  if (weeklyVote == null) {
    weeklyVote = new UserWeeklyVote(user.toHex() + '-' + week.toString());
    weeklyVote.user = user.toHex();
    weeklyVote.week = week;
    weeklyVote.votes = BigInt.zero();
    weeklyVote.retreats = BigInt.zero();
    weeklyVote.volumeVote = BigInt.zero();
    weeklyVote.volumeRetreat = BigInt.zero();
    weeklyVote.volumeTotal = BigInt.zero();
    weeklyVote.save();
  }
  return weeklyVote;
}

function createOrLoadUserSubjectWeeklyVote(
  user: Bytes,
  subject: Bytes,
  week: i32
): UserSubjectWeeklyVote {
  let key = user.toHex() + '-' + subject.toHex() + '-' + week.toString();
  let votes = UserSubjectWeeklyVote.load(key);
  if (votes == null) {
    votes = new UserSubjectWeeklyVote(key);
    votes.user = user.toHex();
    votes.subject = subject.toHex();
    votes.week = week;
    votes.holding = BigInt.zero();
    votes.save();
  }
  return votes;
}

function createOrLoadWeeklyStatistic(week: i32): WeeklyStatistic {
  let statis = WeeklyStatistic.load(week.toString());
  if (statis == null) {
    statis = new WeeklyStatistic(week.toString());
    statis.week = week;
    statis.reward = BigInt.zero();
    statis.holding = BigInt.zero();
    statis.votes = BigInt.zero();
    statis.retreats = BigInt.zero();
    statis.volumeVote = BigInt.zero();
    statis.volumeRetreat = BigInt.zero();
    statis.volumeTotal = BigInt.zero();
    statis.save();
  }
  return statis;
}

export function handleEventBind(event: EventBind): void {
  let user = createOrLoadUser(event.params.account);

  let key = user.address.toHex() + '-' + event.params.platform;
  let social = Social.load(key);
  if (social == null) {
    social = new Social(key);
    social.user = user.address.toHex();
    social.platform = event.params.platform;
  }
  social.pid = event.params.id;
  social.uri = event.params.uri;
  social.save();
}

export function handleNewSubject(event: NewSubject): void {
  let user = createOrLoadUser(event.params.owner);
  let subject = createOrLoadSubject(event.params.subject);
  subject.name = event.params.name;
  subject.image = event.params.image;
  subject.uri = event.params.uri;
  subject.createdAt = event.block.timestamp.toI32();
  subject.creator = user.address.toHex();
  subject.save();
}

export function handleEventVote(event: EventVote): void {
  // save this vote
  let voteLog = new VoteLog(
    event.block.number.toString() + '-' + event.transaction.index.toString()
  );
  voteLog.voter = event.params.voter.toHex();
  voteLog.subject = event.params.subject.toHex();
  voteLog.time = event.block.timestamp.toI32();
  voteLog.isVote = event.params.isVote;
  voteLog.votes = event.params.amount;
  voteLog.value = event.params.value;
  voteLog.supply = event.params.supply;
  voteLog.save();

  // update statistic
  let statistic = createOrLoadStatistic();
  const weekSeconds = 7 * 24 * 60 * 60;
  if (event.block.timestamp.toI32() - statistic.week > weekSeconds) {
    statistic.week = getWeek();
  }
  if (event.params.isVote) {
    statistic.totalVoteValue = statistic.totalVoteValue.plus(
      event.params.value
    );
    statistic.totalVotes = statistic.totalVotes.plus(event.params.amount);
  }
  statistic.save();

  // update weekly statistic
  let weekStatistic = createOrLoadWeeklyStatistic(statistic.week);
  // update subject
  let subject = createOrLoadSubject(event.params.subject);
  subject.lastVoteAt = event.block.timestamp.toI32();
  subject.supply = event.params.supply;
  // update subject weekly vote
  let subjectWeeklyVote = createOrLoadSubjectWeeklyVote(
    subject.address,
    statistic.week
  );
  // update vote user
  let user = createOrLoadUser(event.params.voter);
  // update user weekly vote
  let userWeeklyVote = createOrLoadUserWeeklyVote(user.address, statistic.week);
  // update user weekly vote
  let userSubjectWeeklyVote = createOrLoadUserSubjectWeeklyVote(
    user.address,
    subject.address,
    statistic.week
  );
  // update user subject vote
  let userSubjectVote = createOrLoadUserSubjectVote(
    user.address,
    subject.address
  );

  if (event.params.isVote) {
    user.holding = user.holding.plus(event.params.amount);
    userWeeklyVote.votes = userWeeklyVote.votes.plus(event.params.amount);
    userWeeklyVote.volumeVote = userWeeklyVote.volumeVote.plus(
      event.params.value
    );
    userWeeklyVote.volumeTotal = userWeeklyVote.volumeTotal.plus(
      event.params.value
    );
    subject.totalVoteValue = subject.totalVoteValue.plus(event.params.value);
    subject.volumeVote = subject.volumeVote.plus(event.params.value);
    subject.volumeTotal = subject.volumeTotal.plus(event.params.value);
    subjectWeeklyVote.votes = subjectWeeklyVote.votes.plus(event.params.amount);
    subjectWeeklyVote.volumeVote = subjectWeeklyVote.volumeVote.plus(
      event.params.value
    );
    subjectWeeklyVote.volumeTotal = subjectWeeklyVote.volumeTotal.plus(
      event.params.value
    );
    userSubjectVote.holding = userSubjectVote.holding.plus(event.params.amount);
    userSubjectVote.votes = userSubjectVote.votes.plus(event.params.amount);
    userSubjectVote.volumeVote = userSubjectVote.volumeVote.plus(
      event.params.value
    );
    userSubjectVote.volumeTotal = userSubjectVote.volumeTotal.plus(
      event.params.value
    );
    userSubjectWeeklyVote.holding = userSubjectWeeklyVote.holding.plus(
      event.params.amount
    );
    weekStatistic.holding = weekStatistic.holding.plus(event.params.amount);
    weekStatistic.votes = weekStatistic.votes.plus(event.params.amount);
    weekStatistic.volumeVote = weekStatistic.volumeVote.plus(
      event.params.value
    );
    weekStatistic.volumeTotal = weekStatistic.volumeTotal.plus(
      event.params.value
    );
  } else {
    user.holding = user.holding.minus(event.params.amount);
    userWeeklyVote.retreats = userWeeklyVote.retreats.plus(event.params.amount);
    userWeeklyVote.volumeRetreat = userWeeklyVote.volumeRetreat.plus(
      event.params.value
    );
    userWeeklyVote.volumeTotal = userWeeklyVote.volumeTotal.plus(
      event.params.value
    );
    subject.totalVoteValue = subject.totalVoteValue.minus(event.params.value);
    subject.volumeRetreat = subject.volumeRetreat.plus(event.params.value);
    subject.volumeTotal = subject.volumeTotal.plus(event.params.value);
    subjectWeeklyVote.retreats = subjectWeeklyVote.retreats.plus(
      event.params.amount
    );
    subjectWeeklyVote.volumeRetreat = subjectWeeklyVote.volumeRetreat.plus(
      event.params.value
    );
    subjectWeeklyVote.volumeTotal = subjectWeeklyVote.volumeTotal.plus(
      event.params.value
    );
    userSubjectVote.holding = userSubjectVote.holding.minus(
      event.params.amount
    );
    userSubjectVote.retreats = userSubjectVote.retreats.plus(
      event.params.amount
    );
    userSubjectVote.volumeRetreat = userSubjectVote.volumeRetreat.plus(
      event.params.value
    );
    userSubjectVote.volumeTotal = userSubjectVote.volumeTotal.plus(
      event.params.value
    );
    if (userSubjectWeeklyVote.holding.gt(BigInt.zero())) {
      let amountToDecrease = event.params.amount;
      if (userSubjectWeeklyVote.holding < amountToDecrease) {
        amountToDecrease = userSubjectWeeklyVote.holding;
      }
      userSubjectWeeklyVote.holding =
        userSubjectWeeklyVote.holding.minus(amountToDecrease);
      userWeeklyVote.votes = userWeeklyVote.votes.minus(amountToDecrease);
      weekStatistic.holding = weekStatistic.holding.minus(event.params.amount);
    }
    weekStatistic.retreats = weekStatistic.retreats.plus(event.params.amount);
    weekStatistic.retreats = weekStatistic.retreats.plus(event.params.amount);
    weekStatistic.volumeRetreat = weekStatistic.volumeRetreat.plus(
      event.params.value
    );
    weekStatistic.volumeTotal = weekStatistic.volumeTotal.plus(
      event.params.value
    );
  }

  let fans = subject.fans!;
  let fansIndex = fans.indexOf(user.address.toHex());
  if (fansIndex == -1 && userSubjectVote.holding.gt(BigInt.zero())) {
    subject.fansNumber += 1;
    // add a new vote user
    fans.push(user.address.toHex());
    subject.fans = fans;
  } else if (fansIndex != -1 && userSubjectVote.holding.equals(BigInt.zero())) {
    // remove a fan from subject
    subject.fansNumber -= 1;
    fans.splice(fansIndex, 1);
    subject.fans = fans;
  } else {
    log.info('user votes multi tiems', []);
  }
  user.save();
  userWeeklyVote.save();
  userSubjectVote.save();
  userSubjectWeeklyVote.save();
  subject.save();
  subjectWeeklyVote.save();
  weekStatistic.save();
}
/*
export function handleNewRewardDistribution(
  event: NewRewardDistribution
): void {
  let dis = TokenDistribution.load(event.block.timestamp.toHex());
  if (dis == null) {
    dis = new TokenDistribution(event.block.timestamp.toHex());
    dis.createdAt = event.block.timestamp.toI32();
  }
  dis.SubjectPercents = event.params._Subject.toI32();
  dis.artistPercents = event.params._artist.toI32();
  dis.teamPercents = event.params._team.toI32();
  dis.weeklyPercents = event.params._daily.toI32();
  dis.updatedAt = event.block.timestamp.toI32();
  dis.save();
}

export function handleClaim(event: ClaimSubjectRewards): void {}
*/
