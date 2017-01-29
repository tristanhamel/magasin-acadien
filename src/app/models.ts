export class User {
  _id: string;
  name: string;
  role: string;
  email: string;

  constructor (obj?: any) {
    this._id        = obj &&  obj._id;
    this.name       = obj &&  obj.name;
    this.role       = obj && obj.role;
    this.email      = obj &&  obj.email;
  }
}

export class NewUser {
  name: string;
  email: string;
  password: string;

  constructor (obj?: any) {
    this.name       = obj &&  obj.name;
    this.email      = obj &&  obj.email;
    this.password   = obj &&  obj.password;
  }
}

export class Bid {
  user: User;
  value: number;
  time: Date;
  message: string;

  constructor (obj?: any) {
      this.user    =  obj &&  obj.user     || null;
      this.value   =  obj &&  obj.value    || null;
      this.time    =  obj &&  obj.time     || new Date();
      this.message =  obj &&  obj.message  || null;
  }
}

export class Product {
  _id: string;
  bids: Bid[];
  created: Date;
  currentPrice: number;
  deadline: Date;
  description: string;
  images: string[];
  name: string;
  owner: User;
  startPrice: number;
  updated: Date;

  constructor (obj?: any) {
    this._id =          obj && obj._id          || null;
    this.bids =         obj && obj.bids         || [];
    this.created =      obj && obj.created      || new Date();
    this.currentPrice = obj && obj.currentPrice || 0;
    this.deadline =     obj && obj.deadline     || null;
    this.description =  obj && obj.description  || null;
    this.images =       obj && obj.images       || [];
    this.name =         obj && obj.name         || null;
    this.owner =        obj && obj.owner        || null;
    this.startPrice =   obj && obj.startPrice   || 0;
    this.updated =      obj && obj.updated      || new Date();
  }
}
