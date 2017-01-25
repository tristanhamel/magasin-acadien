import {userServiceInjectables} from './user.service';

export * from './user.service';
export * from './authenticate.service';
export * from './bids.service';
export * from './products.service';

export const servicesInjectables: Array<any> = [
  userServiceInjectables
];
