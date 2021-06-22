import { AbstractService } from './abstract.service';
import { AppCommonService } from './app-common.service';

export const services = [AbstractService, AppCommonService];

export * from './app-common.service';
export * from './abstract.service';
