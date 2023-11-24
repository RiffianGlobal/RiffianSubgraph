// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ClaimAlbumRewards extends ethereum.Event {
  get params(): ClaimAlbumRewards__Params {
    return new ClaimAlbumRewards__Params(this);
  }
}

export class ClaimAlbumRewards__Params {
  _event: ClaimAlbumRewards;

  constructor(event: ClaimAlbumRewards) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get album(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get reward(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ClaimDailyRewards extends ethereum.Event {
  get params(): ClaimDailyRewards__Params {
    return new ClaimDailyRewards__Params(this);
  }
}

export class ClaimDailyRewards__Params {
  _event: ClaimDailyRewards;

  constructor(event: ClaimDailyRewards) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get reward(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class NewAlbum extends ethereum.Event {
  get params(): NewAlbum__Params {
    return new NewAlbum__Params(this);
  }
}

export class NewAlbum__Params {
  _event: NewAlbum;

  constructor(event: NewAlbum) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get album(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class NewRewardDistribution extends ethereum.Event {
  get params(): NewRewardDistribution__Params {
    return new NewRewardDistribution__Params(this);
  }
}

export class NewRewardDistribution__Params {
  _event: NewRewardDistribution;

  constructor(event: NewRewardDistribution) {
    this._event = event;
  }

  get _team(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _artist(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _daily(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _album(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class NewVote extends ethereum.Event {
  get params(): NewVote__Params {
    return new NewVote__Params(this);
  }
}

export class NewVote__Params {
  _event: NewVote;

  constructor(event: NewVote) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get dailyRewardAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get albumPoolRewardAmount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get teamRewardAmount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get artistRewardAmount(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get seq(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Riffian__albumToDataResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: Address, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getArtist(): Address {
    return this.value0;
  }

  getRewardIndex(): BigInt {
    return this.value1;
  }

  getVotes(): BigInt {
    return this.value2;
  }
}

export class Riffian__seqToRewardDataResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  getStarts(): BigInt {
    return this.value0;
  }

  getInterval(): BigInt {
    return this.value1;
  }

  getRewardIndex(): BigInt {
    return this.value2;
  }

  getVotes(): BigInt {
    return this.value3;
  }
}

export class Riffian extends ethereum.SmartContract {
  static bind(address: Address): Riffian {
    return new Riffian("Riffian", address);
  }

  albumPoolRewardPercents(): BigInt {
    let result = super.call(
      "albumPoolRewardPercents",
      "albumPoolRewardPercents():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_albumPoolRewardPercents(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "albumPoolRewardPercents",
      "albumPoolRewardPercents():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  albumRewardsBalance(param0: Address): BigInt {
    let result = super.call(
      "albumRewardsBalance",
      "albumRewardsBalance(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_albumRewardsBalance(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "albumRewardsBalance",
      "albumRewardsBalance(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  albumRewardsIndex(param0: Address): BigInt {
    let result = super.call(
      "albumRewardsIndex",
      "albumRewardsIndex(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_albumRewardsIndex(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "albumRewardsIndex",
      "albumRewardsIndex(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  albumToData(param0: Address): Riffian__albumToDataResult {
    let result = super.call(
      "albumToData",
      "albumToData(address):(address,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new Riffian__albumToDataResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_albumToData(
    param0: Address
  ): ethereum.CallResult<Riffian__albumToDataResult> {
    let result = super.tryCall(
      "albumToData",
      "albumToData(address):(address,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Riffian__albumToDataResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  albumsList(param0: BigInt): Address {
    let result = super.call("albumsList", "albumsList(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_albumsList(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("albumsList", "albumsList(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  artistRewardPercents(): BigInt {
    let result = super.call(
      "artistRewardPercents",
      "artistRewardPercents():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_artistRewardPercents(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "artistRewardPercents",
      "artistRewardPercents():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calculateAlbumRewards(_account: Address, _album: Address): BigInt {
    let result = super.call(
      "calculateAlbumRewards",
      "calculateAlbumRewards(address,address):(uint256)",
      [ethereum.Value.fromAddress(_account), ethereum.Value.fromAddress(_album)]
    );

    return result[0].toBigInt();
  }

  try_calculateAlbumRewards(
    _account: Address,
    _album: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "calculateAlbumRewards",
      "calculateAlbumRewards(address,address):(uint256)",
      [ethereum.Value.fromAddress(_account), ethereum.Value.fromAddress(_album)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calculateAlbumVotePrice(_album: Address): BigInt {
    let result = super.call(
      "calculateAlbumVotePrice",
      "calculateAlbumVotePrice(address):(uint256)",
      [ethereum.Value.fromAddress(_album)]
    );

    return result[0].toBigInt();
  }

  try_calculateAlbumVotePrice(_album: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "calculateAlbumVotePrice",
      "calculateAlbumVotePrice(address):(uint256)",
      [ethereum.Value.fromAddress(_album)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calculateDailyRewards(_account: Address): BigInt {
    let result = super.call(
      "calculateDailyRewards",
      "calculateDailyRewards(address):(uint256)",
      [ethereum.Value.fromAddress(_account)]
    );

    return result[0].toBigInt();
  }

  try_calculateDailyRewards(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "calculateDailyRewards",
      "calculateDailyRewards(address):(uint256)",
      [ethereum.Value.fromAddress(_account)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  calculateVotePrice(_counter: BigInt): BigInt {
    let result = super.call(
      "calculateVotePrice",
      "calculateVotePrice(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_counter)]
    );

    return result[0].toBigInt();
  }

  try_calculateVotePrice(_counter: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "calculateVotePrice",
      "calculateVotePrice(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_counter)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimAlbumRewards(_album: Address): BigInt {
    let result = super.call(
      "claimAlbumRewards",
      "claimAlbumRewards(address):(uint256)",
      [ethereum.Value.fromAddress(_album)]
    );

    return result[0].toBigInt();
  }

  try_claimAlbumRewards(_album: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimAlbumRewards",
      "claimAlbumRewards(address):(uint256)",
      [ethereum.Value.fromAddress(_album)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimDailyRewards(_seq: BigInt): BigInt {
    let result = super.call(
      "claimDailyRewards",
      "claimDailyRewards(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_seq)]
    );

    return result[0].toBigInt();
  }

  try_claimDailyRewards(_seq: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimDailyRewards",
      "claimDailyRewards(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_seq)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  currentSeqNumber(): BigInt {
    let result = super.call(
      "currentSeqNumber",
      "currentSeqNumber():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_currentSeqNumber(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "currentSeqNumber",
      "currentSeqNumber():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  dailyRewardPercents(): BigInt {
    let result = super.call(
      "dailyRewardPercents",
      "dailyRewardPercents():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_dailyRewardPercents(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "dailyRewardPercents",
      "dailyRewardPercents():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  guardian(): Address {
    let result = super.call("guardian", "guardian():(address)", []);

    return result[0].toAddress();
  }

  try_guardian(): ethereum.CallResult<Address> {
    let result = super.tryCall("guardian", "guardian():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  interval(): BigInt {
    let result = super.call("interval", "interval():(uint256)", []);

    return result[0].toBigInt();
  }

  try_interval(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("interval", "interval():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rewardIntervalMin(): BigInt {
    let result = super.call(
      "rewardIntervalMin",
      "rewardIntervalMin():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_rewardIntervalMin(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardIntervalMin",
      "rewardIntervalMin():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  seqToRewardData(param0: BigInt): Riffian__seqToRewardDataResult {
    let result = super.call(
      "seqToRewardData",
      "seqToRewardData(uint256):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Riffian__seqToRewardDataResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_seqToRewardData(
    param0: BigInt
  ): ethereum.CallResult<Riffian__seqToRewardDataResult> {
    let result = super.tryCall(
      "seqToRewardData",
      "seqToRewardData(uint256):(uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Riffian__seqToRewardDataResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  startTimeStamp(): BigInt {
    let result = super.call("startTimeStamp", "startTimeStamp():(uint256)", []);

    return result[0].toBigInt();
  }

  try_startTimeStamp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "startTimeStamp",
      "startTimeStamp():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  teamAddress(): Address {
    let result = super.call("teamAddress", "teamAddress():(address)", []);

    return result[0].toAddress();
  }

  try_teamAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall("teamAddress", "teamAddress():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  teamRewardPercents(): BigInt {
    let result = super.call(
      "teamRewardPercents",
      "teamRewardPercents():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_teamRewardPercents(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "teamRewardPercents",
      "teamRewardPercents():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userAlbumRewardIndex(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "userAlbumRewardIndex",
      "userAlbumRewardIndex(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_userAlbumRewardIndex(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userAlbumRewardIndex",
      "userAlbumRewardIndex(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userAlbumRewardsEarned(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "userAlbumRewardsEarned",
      "userAlbumRewardsEarned(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_userAlbumRewardsEarned(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userAlbumRewardsEarned",
      "userAlbumRewardsEarned(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userAlbumVotes(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "userAlbumVotes",
      "userAlbumVotes(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_userAlbumVotes(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userAlbumVotes",
      "userAlbumVotes(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ClaimAlbumRewardsCall extends ethereum.Call {
  get inputs(): ClaimAlbumRewardsCall__Inputs {
    return new ClaimAlbumRewardsCall__Inputs(this);
  }

  get outputs(): ClaimAlbumRewardsCall__Outputs {
    return new ClaimAlbumRewardsCall__Outputs(this);
  }
}

export class ClaimAlbumRewardsCall__Inputs {
  _call: ClaimAlbumRewardsCall;

  constructor(call: ClaimAlbumRewardsCall) {
    this._call = call;
  }

  get _album(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ClaimAlbumRewardsCall__Outputs {
  _call: ClaimAlbumRewardsCall;

  constructor(call: ClaimAlbumRewardsCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ClaimDailyRewardsCall extends ethereum.Call {
  get inputs(): ClaimDailyRewardsCall__Inputs {
    return new ClaimDailyRewardsCall__Inputs(this);
  }

  get outputs(): ClaimDailyRewardsCall__Outputs {
    return new ClaimDailyRewardsCall__Outputs(this);
  }
}

export class ClaimDailyRewardsCall__Inputs {
  _call: ClaimDailyRewardsCall;

  constructor(call: ClaimDailyRewardsCall) {
    this._call = call;
  }

  get _seq(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ClaimDailyRewardsCall__Outputs {
  _call: ClaimDailyRewardsCall;

  constructor(call: ClaimDailyRewardsCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _team(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _startTimeStamp(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _interval(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class NewAlbumCall extends ethereum.Call {
  get inputs(): NewAlbumCall__Inputs {
    return new NewAlbumCall__Inputs(this);
  }

  get outputs(): NewAlbumCall__Outputs {
    return new NewAlbumCall__Outputs(this);
  }
}

export class NewAlbumCall__Inputs {
  _call: NewAlbumCall;

  constructor(call: NewAlbumCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class NewAlbumCall__Outputs {
  _call: NewAlbumCall;

  constructor(call: NewAlbumCall) {
    this._call = call;
  }
}

export class PauseVoteCall extends ethereum.Call {
  get inputs(): PauseVoteCall__Inputs {
    return new PauseVoteCall__Inputs(this);
  }

  get outputs(): PauseVoteCall__Outputs {
    return new PauseVoteCall__Outputs(this);
  }
}

export class PauseVoteCall__Inputs {
  _call: PauseVoteCall;

  constructor(call: PauseVoteCall) {
    this._call = call;
  }
}

export class PauseVoteCall__Outputs {
  _call: PauseVoteCall;

  constructor(call: PauseVoteCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetIntervalCall extends ethereum.Call {
  get inputs(): SetIntervalCall__Inputs {
    return new SetIntervalCall__Inputs(this);
  }

  get outputs(): SetIntervalCall__Outputs {
    return new SetIntervalCall__Outputs(this);
  }
}

export class SetIntervalCall__Inputs {
  _call: SetIntervalCall;

  constructor(call: SetIntervalCall) {
    this._call = call;
  }

  get _interval(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetIntervalCall__Outputs {
  _call: SetIntervalCall;

  constructor(call: SetIntervalCall) {
    this._call = call;
  }
}

export class SetRewardDistributionCall extends ethereum.Call {
  get inputs(): SetRewardDistributionCall__Inputs {
    return new SetRewardDistributionCall__Inputs(this);
  }

  get outputs(): SetRewardDistributionCall__Outputs {
    return new SetRewardDistributionCall__Outputs(this);
  }
}

export class SetRewardDistributionCall__Inputs {
  _call: SetRewardDistributionCall;

  constructor(call: SetRewardDistributionCall) {
    this._call = call;
  }

  get _team(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _artist(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _daily(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _album(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class SetRewardDistributionCall__Outputs {
  _call: SetRewardDistributionCall;

  constructor(call: SetRewardDistributionCall) {
    this._call = call;
  }
}

export class SetStartTimeStampCall extends ethereum.Call {
  get inputs(): SetStartTimeStampCall__Inputs {
    return new SetStartTimeStampCall__Inputs(this);
  }

  get outputs(): SetStartTimeStampCall__Outputs {
    return new SetStartTimeStampCall__Outputs(this);
  }
}

export class SetStartTimeStampCall__Inputs {
  _call: SetStartTimeStampCall;

  constructor(call: SetStartTimeStampCall) {
    this._call = call;
  }

  get _startTimeStamp(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetStartTimeStampCall__Outputs {
  _call: SetStartTimeStampCall;

  constructor(call: SetStartTimeStampCall) {
    this._call = call;
  }
}

export class SetTeamAddressCall extends ethereum.Call {
  get inputs(): SetTeamAddressCall__Inputs {
    return new SetTeamAddressCall__Inputs(this);
  }

  get outputs(): SetTeamAddressCall__Outputs {
    return new SetTeamAddressCall__Outputs(this);
  }
}

export class SetTeamAddressCall__Inputs {
  _call: SetTeamAddressCall;

  constructor(call: SetTeamAddressCall) {
    this._call = call;
  }

  get _team(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetTeamAddressCall__Outputs {
  _call: SetTeamAddressCall;

  constructor(call: SetTeamAddressCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class VoteCall extends ethereum.Call {
  get inputs(): VoteCall__Inputs {
    return new VoteCall__Inputs(this);
  }

  get outputs(): VoteCall__Outputs {
    return new VoteCall__Outputs(this);
  }
}

export class VoteCall__Inputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }

  get _album(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class VoteCall__Outputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }
}
