import { DoorService } from './door.service';
import { MeteoService } from './meteo.service';
import { MusicService } from './music.service';
import { SchedulerService } from './scheduler.service';
import { FanService } from './fan.service';
import { LightService } from './light.service';


export const services = [DoorService, SchedulerService, MeteoService, MusicService, FanService, LightService];

export * from './door.service';
export * from './scheduler.service';
export * from './meteo.service';
export * from './music.service';
export * from './fan.service';
export * from './light.service';
