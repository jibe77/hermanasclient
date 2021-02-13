import { DoorService } from './door.service';
import { MeteoService } from './meteo.service';
import { SchedulerService } from './scheduler.service';

export const services = [DoorService, SchedulerService, MeteoService];

export * from './door.service';
export * from './scheduler.service';
export * from './meteo.service';
