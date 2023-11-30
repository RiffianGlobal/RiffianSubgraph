import {
  BigInt,
  ByteArray,
  Address,
  Bytes,
  crypto,
  log,
  BigDecimal,
  bigInt,
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
  UserVote,
  WeeklyRewardPool,
} from '../generated/schema';
import { EventVote } from '../generated/RiffianBoard/RiffianBoard';

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

function createOrLoadAlbum(bytesAlbum: Bytes, timestamp: BigInt): Album {
  let album = Album.load(bytesAlbum.toHex());
  if (album == null) {
    album = new Album(bytesAlbum.toHex());
    album.address = bytesAlbum;
    album.createdAt = timestamp.toI32();
    album.fans = [];
    album.fansNumber = 0;
    album.totalVoteAmount = BigInt.fromI32(0);
    album.totalVotes = BigInt.fromI32(0);
    album.lastVoteAt = 0;
    album.artist = bytesAlbum.toHex();
    album.save();
  }
  return album as Album;
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

function createOrLoadUserVote(bytesUser: Bytes, bytesAlbum: Bytes): UserVote {
  let userVote = UserVote.load(bytesUser.toHex() + '-' + bytesAlbum.toHex());
  if (userVote == null) {
    userVote = new UserVote(bytesUser.toHex() + '-' + bytesAlbum.toHex());
    userVote.album = bytesAlbum.toString();
    userVote.user = bytesUser.toString();
    userVote.totalAmount = BigInt.fromI32(0);
    userVote.totalVotes = BigInt.fromI32(0);
    userVote.save();
  }

  return userVote as UserVote;
}

export function handleNewAlbum(event: NewAlbum): void {
  // create user
  let user = createOrLoadUser(event.params.owner);
  let album = createOrLoadAlbum(event.params.album, event.block.timestamp);
  let creates = user.albumsCreated!;
  creates.push(event.params.album.toHex());
  user.albumsCreated = creates;
  user.save();

  log.info('newAlbum user: {}, album:{}', [
    user.address.toHex(),
    album.address.toHex(),
  ]);
}

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
    log.info('user votes multi tiems', []);
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

  log.debug('voting user: {}, album:{}, pool:{},{}', [
    user.address.toHex(),
    album.address.toHex(),
    weeklyPool.id.toString(),
    weeklyPool.rewardPoolAmount.toString(),
  ]);
}

export function handleEventVote(event: EventVote): void {
  // update vote user
  let user = createOrLoadUser(event.params.voter);
  // update album
  let album = createOrLoadAlbum(event.params.album, event.block.timestamp);
  album.lastVoteAt = event.block.timestamp.toI32();
  album.totalVotes = event.params.supply;

  let userVote = createOrLoadUserVote(user.address, album.address);

  if (event.params.isVote) {
    user.totalVotes.plus(event.params.amount);
    album.totalVoteAmount.plus(event.params.value);
    userVote.totalAmount.plus(event.params.value);
    userVote.totalVotes.plus(event.params.amount);
  } else {
    user.totalVotes.minus(event.params.amount);
    album.totalVoteAmount.minus(event.params.value);
    userVote.totalAmount.minus(event.params.value);
    userVote.totalVotes.minus(event.params.amount);
  }

  let fans = album.fans!;
  let fansIndex = fans.indexOf(user.address.toHex());
  let voted = user.albumsVoted!;
  if (fansIndex == -1 && userVote.totalVotes.gt(BigInt.fromI32(0))) {
    album.fansNumber += 1;
    // add a new vote user
    fans.push(user.address.toHex());
    album.fans = fans;
    // add new albm
    voted.push(album.id);
    user.albumsVoted = voted;
  } else if (fansIndex != -1 && userVote.totalVotes.equals(BigInt.fromI32(0))) {
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
  userVote.save();
  album.save();

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
