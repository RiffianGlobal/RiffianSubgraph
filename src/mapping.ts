import {
  BigInt,
  ByteArray,
  Address,
  Bytes,
  crypto,
  log,
  BigDecimal,
  bigInt,
  dataSource,
} from '@graphprotocol/graph-ts';
import {
  ClaimAlbumRewards,
  NewAlbum,
  NewRewardDistribution,
  NewVote,
} from '../generated/RiffianBoard/Riffian';
import {
  Album,
  TokenDistribution,
  User,
  WeeklyRewardPool,
  VoteLog,
  Statistic,
  AlbumWeeklyVote,
  UserAlbumVote,
  UserWeeklyVote,
} from '../generated/schema';
import {
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
    statistic.totalVoteNumber = BigInt.zero();
  }
  return statistic;
}

function createOrLoadUser(bytesAddress: Bytes): User {
  let user = User.load(bytesAddress.toHex());
  if (user == null) {
    user = new User(bytesAddress.toHex());
    user.totalRewards = BigInt.fromI32(0);
    user.totalVotes = BigInt.fromI32(0);
    user.address = bytesAddress;
    user.albumsVoted = [];
    user.albumsCreated = [];
    user.save();
  }
  return user as User;
}

function createOrLoadAlbum(bytesAlbum: Bytes): Album {
  let album = Album.load(bytesAlbum.toHex());
  if (album == null) {
    album = new Album(bytesAlbum.toHex());
    album.address = bytesAlbum;
    album.name = '';
    album.image = '';
    album.url = '';
    album.createdAt = 0;
    album.artist = '';
    album.fans = [];
    album.fansNumber = 0;
    album.totalVoteValue = BigInt.zero();
    album.volumeVote = BigInt.zero();
    album.volumeRetreat = BigInt.zero();
    album.volumeTotal = BigInt.zero();
    album.totalVotes = BigInt.zero();
    album.lastVoteAt = 0;
    album.save();
  }
  return album as Album;
}

function createOrLoadAlbumWeeklyVote(album: Bytes, week: i32): AlbumWeeklyVote {
  let weeklyVote = AlbumWeeklyVote.load(album.toHex() + '-' + week.toString());
  if (weeklyVote == null) {
    weeklyVote = new AlbumWeeklyVote(album.toHex() + '-' + week.toString());
    weeklyVote.album = album.toHex();
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

function createOrLoadUserAlbumVote(user: Bytes, album: Bytes): UserAlbumVote {
  let userAlbumVote = UserAlbumVote.load(user.toHex() + '-' + album.toHex());
  if (userAlbumVote == null) {
    userAlbumVote = new UserAlbumVote(user.toHex() + '-' + album.toHex());
    userAlbumVote.user = user.toHex();
    userAlbumVote.album = album.toHex();
    userAlbumVote.holding = BigInt.zero();
    userAlbumVote.votes = BigInt.zero();
    userAlbumVote.retreats = BigInt.zero();
    userAlbumVote.volumeVote = BigInt.zero();
    userAlbumVote.volumeRetreat = BigInt.zero();
    userAlbumVote.volumeTotal = BigInt.zero();
    userAlbumVote.save();
  }
  return userAlbumVote;
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

function createOrLoadWeeklyRewardPool(
  bigIntSeq: BigInt,
  timestamp: BigInt
): WeeklyRewardPool {
  let weeklyPool = WeeklyRewardPool.load(bigIntSeq.toString());
  if (weeklyPool == null) {
    weeklyPool = new WeeklyRewardPool(bigIntSeq.toString());
    weeklyPool.createdAt = timestamp.toI32();
    weeklyPool.rewardPoolAmount = BigInt.fromI32(0);
    weeklyPool.updatedAt = 0;
    weeklyPool.save();
  }
  return weeklyPool as WeeklyRewardPool;
}

export function handleNewAlbum(event: NewSubject): void {
  let album = createOrLoadAlbum(event.params.subject);
  album.name = event.params.name;
  album.image = event.params.image;
  album.url = event.params.uri;
  album.createdAt = event.block.timestamp.toI32();
  album.artist = event.transaction.from.toHex();
  album.save();
  // create user
  let user = createOrLoadUser(event.params.owner);
  let creates = user.albumsCreated!;
  creates.push(event.params.subject.toHex());
  user.albumsCreated = creates;
  user.save();

  log.info('newAlbum user: {}, album:{}', [
    user.address.toHex(),
    album.address.toHex(),
  ]);
}
/*
export function handleNewVote(event: NewVote): void {
  // update vote user
  let user = createOrLoadUser(event.params.from);
  user.address = event.params.from;
  user.totalVotes.plus(BigInt.fromI32(1));

  // update album
  let album = createOrLoadAlbum(event.params.to, event.block.timestamp);
  album.lastVoteAt = event.block.timestamp.toI32();
  album.totalVotes.plus(BigInt.fromI32(1));
  album.totalVoteAmount.plus(event.params.albumPoolRewardAmount);
  let fansIndex = album.fans!.indexOf(user.address.toHex());
  if (fansIndex == -1) {
    album.fansNumber += 1;
    let fans = album.fans!;
    fans.push(user.address.toHex());
    album.fans = fans;
    let voted = user.albumsVoted!;
    voted.push(album.id);
    user.albumsVoted = voted;
  } else {
    log.info("user votes multi tiems", []);
  }
  user.save();
  album.save();

  // update weeklyPool
  let weeklyPool = createOrLoadWeeklyRewardPool(
    event.params.seq,
    event.block.timestamp
  );
  weeklyPool.updatedAt = event.block.timestamp.toI32();
  weeklyPool.rewardPoolAmount.plus(event.params.dailyRewardAmount);
  weeklyPool.save();

  log.debug("voting user: {}, album:{}, pool:{},{}", [
    user.address.toHex(),
    album.address.toHex(),
    weeklyPool.id.toString(),
    weeklyPool.rewardPoolAmount.toString(),
  ]);
}
*/

export function handleEventVote(event: EventVote): void {
  // save this vote
  let voteLog = new VoteLog(
    event.block.number.toString() + '-' + event.transaction.index.toString()
  );
  voteLog.voter = event.params.voter.toHex();
  voteLog.album = event.params.subject.toHex();
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
    statistic.totalVoteValue.plus(event.params.value);
    statistic.totalVoteNumber.plus(event.params.amount);
  }
  statistic.save();

  // update album
  let album = createOrLoadAlbum(event.params.subject);
  album.lastVoteAt = event.block.timestamp.toI32();
  album.totalVotes = event.params.supply;
  // update album weekly vote
  let albumWeeklyVote = createOrLoadAlbumWeeklyVote(
    album.address,
    statistic.week
  );
  // update vote user
  let user = createOrLoadUser(event.params.voter);
  // update user weekly vote
  let userWeeklyVote = createOrLoadUserWeeklyVote(user.address, statistic.week);
  // update user album vote
  let userAlbumVote = createOrLoadUserAlbumVote(user.address, album.address);

  if (event.params.isVote) {
    user.totalVotes.plus(event.params.amount);
    userWeeklyVote.votes.plus(event.params.amount);
    userWeeklyVote.volumeVote.plus(event.params.value);
    userWeeklyVote.volumeTotal.plus(event.params.value);
    album.totalVotes.plus(event.params.amount);
    album.totalVoteValue.plus(event.params.value);
    album.volumeVote.plus(event.params.value);
    album.volumeTotal.plus(event.params.value);
    albumWeeklyVote.votes.plus(event.params.amount);
    albumWeeklyVote.volumeVote.plus(event.params.value);
    albumWeeklyVote.volumeTotal.plus(event.params.value);
    userAlbumVote.holding.plus(event.params.amount);
    userAlbumVote.votes.plus(event.params.amount);
    userAlbumVote.volumeVote.plus(event.params.value);
    userAlbumVote.volumeTotal.plus(event.params.value);
  } else {
    user.totalVotes.minus(event.params.amount);
    userWeeklyVote.retreats.plus(event.params.amount);
    userWeeklyVote.volumeRetreat.plus(event.params.value);
    userWeeklyVote.volumeTotal.plus(event.params.value);
    album.totalVotes.minus(event.params.amount);
    album.totalVoteValue.minus(event.params.value);
    album.volumeRetreat.plus(event.params.value);
    album.volumeTotal.plus(event.params.value);
    albumWeeklyVote.retreats.plus(event.params.amount);
    albumWeeklyVote.volumeRetreat.plus(event.params.value);
    albumWeeklyVote.volumeTotal.plus(event.params.value);
    userAlbumVote.holding.minus(event.params.amount);
    userAlbumVote.retreats.plus(event.params.amount);
    userAlbumVote.volumeRetreat.plus(event.params.value);
    userAlbumVote.volumeTotal.plus(event.params.value);
  }

  let fans = album.fans!;
  let fansIndex = fans.indexOf(user.address.toHex());
  let voted = user.albumsVoted!;
  if (fansIndex == -1 && userAlbumVote.holding.gt(BigInt.zero())) {
    album.fansNumber += 1;
    // add a new vote user
    fans.push(user.address.toHex());
    album.fans = fans;
    // add new albm
    voted.push(album.id);
    user.albumsVoted = voted;
  } else if (fansIndex != -1 && userAlbumVote.holding.equals(BigInt.zero())) {
    // remove a fan from album
    album.fansNumber -= 1;
    fans.splice(fansIndex, 1);
    album.fans = fans;
    // remove a vote from user
    let userVoteIndex = voted.indexOf(user.id);
    voted.splice(userVoteIndex, 1);
    user.albumsVoted = voted;
    // delete uservote
  } else {
    log.info('user votes multi tiems', []);
  }
  user.save();
  userWeeklyVote.save();
  userAlbumVote.save();
  album.save();
  albumWeeklyVote.save();

  // // update weeklyPool
  // let weeklyPool = WeeklyRewardPool.load(event.params.seq.toString());
  // if (weeklyPool == null) {
  //   weeklyPool = new WeeklyRewardPool(event.params.seq.toString());
  //   weeklyPool.createdAt = event.block.timestamp.toI32();
  //   weeklyPool.rewardPoolAmount = BigInt.fromI32(0);
  // }
  // weeklyPool.updatedAt = event.block.timestamp.toI32();
  // weeklyPool.rewardPoolAmount.plus(event.params.dailyRewardAmount);
  // weeklyPool.save();

  // log.debug('voting user: {}, album:{}, pool:{},{}', [
  //   user.address.toHex(),
  //   album.address.toHex(),
  //   weeklyPool.id.toString(),
  //   weeklyPool.rewardPoolAmount.toString(),
  // ]);
}

export function handleNewRewardDistribution(
  event: NewRewardDistribution
): void {
  let dis = TokenDistribution.load(event.block.timestamp.toHex());
  if (dis == null) {
    dis = new TokenDistribution(event.block.timestamp.toHex());
    dis.createdAt = event.block.timestamp.toI32();
  }
  dis.albumPercents = event.params._album.toI32();
  dis.artistPercents = event.params._artist.toI32();
  dis.teamPercents = event.params._team.toI32();
  dis.weeklyPercents = event.params._daily.toI32();
  dis.updatedAt = event.block.timestamp.toI32();
  dis.save();
}

export function handleClaim(event: ClaimAlbumRewards): void {}
