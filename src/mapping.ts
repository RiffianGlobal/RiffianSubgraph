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
  WeeklyRewardPool,
} from '../generated/schema';

export function handleNewAlbum(event: NewAlbum): void {
  // create user
  let user = User.load(event.params.owner.toHex());
  if (user == null) {
    user = new User(event.params.owner.toHex());
    user.totalRewards = BigInt.fromI32(0);
    user.totalVotes = 0;
    user.address = event.params.owner;
    user.albumsVoted = [];
    user.albumsCreated = [];
  }

  let album = Album.load(event.params.album.toHex());
  if (album == null) {
    album = new Album(event.params.album.toHex());
    album.address = event.params.album;
    album.createdAt = event.block.timestamp.toI32();
    album.fans = [];
    album.fansNumber = 0;
    album.rewardPoolAmount = BigInt.fromI32(0);
    album.totalVotes = 0;
    album.lastVoteAt = 0;
    album.artist = event.params.owner.toHex();
  }
  album.save();
  user.albumsCreated!.push(event.params.album.toHex());
  user.save();
  log.info('newAlbum user: {}, album:{}', [
    user.address.toHex(),
    album.address.toHex(),
  ]);
}

export function handleNewVote(event: NewVote): void {
  // update vote user
  let user = User.load(event.params.from.toHex());
  if (user == null) {
    user = new User(event.params.from.toHex());
    user.totalRewards = BigInt.fromI32(0);
    user.totalVotes = 0;
    user.albumsCreated = [];
    user.albumsVoted = [];
  }
  user.address = event.params.from;
  user.totalVotes += 1;
  user.save();

  // update album
  let album = Album.load(event.params.to.toHex());
  if (album == null) {
    log.error('vote to album {} not found', [event.params.to.toHex()]);
    return;
  }
  album.lastVoteAt = event.block.timestamp.toI32();
  album.totalVotes += 1;
  album.rewardPoolAmount.plus(event.params.albumPoolRewardAmount);
  let fansIndex = album.fans!.indexOf(user.address.toHex());
  if (fansIndex == -1) {
    album.fansNumber += 1;
    album.fans!.push(user.address.toHex());
    user.albumsVoted!.push(album.id);
    user.save();
  } else {
    log.info('user votes multi tiems', []);
  }
  album.save();

  // update weeklyPool
  let weeklyPool = WeeklyRewardPool.load(event.params.seq.toString());
  if (weeklyPool == null) {
    weeklyPool = new WeeklyRewardPool(event.params.seq.toString());
    weeklyPool.createdAt = event.block.timestamp.toI32();
    weeklyPool.rewardPoolAmount = BigInt.fromI32(0);
  }
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
