export class User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;

  constructor (obj?:any) {
    this._id        = obj &&  obj._id         || null;
    this.first_name = obj &&  obj.first_name  || null;
    this.last_name  = obj &&  obj.last_name   || null;
    this.email      = obj &&  obj.email       || null;
  }
}

export class Bid {
  user_id: string;
  value: number;
  time: Date;
  message: string;

  constructor (obj?:any) {
    this.user_id =  obj &&  obj.user_id  || null;
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
  images: string;
  name: string;
  owner: User;
  startPrice: number;
  updated: Date;

  constructor (obj?:any) {
    this._id =          obj && obj._id          || null;
    this.bids =         obj && obj.bids         || [];
    this.created =      obj && obj.created      || new Date();
    this.currentPrice = obj && obj.currentPrice || 0;
    this.deadline =     obj && obj.deadline     || null;
    this.description =  obj && obj.description  || null;
    this.images =       obj && obj.images       || null;
    this.name =         obj && obj.name         || null;
    this.owner =        obj && obj.owner        || null;
    this.startPrice =   obj && obj.startPrice   || 0;
    this.updated =      obj && obj.updated      || new Date();
  }
}