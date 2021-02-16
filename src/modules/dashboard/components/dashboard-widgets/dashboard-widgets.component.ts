import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { UserService } from '@modules/auth/services';
import {
    FanService,
    FanStatus,
    LightService,
    LightStatus,
    MeteoInfo,
    MeteoService,
    MusicService,
    MusicStatus,
    NextEvents,
    SchedulerService,
} from '@modules/dashboard/services';
import { DoorService, DoorStatus } from '@modules/dashboard/services/door.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-dashboard-widgets',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-widgets.component.html',
    styleUrls: ['dashboard-widgets.component.scss'],
})
export class DashboardWidgetsComponent implements OnInit, OnDestroy {
    public doorStatus;
    public nextOpeningTime;
    public nextClosingTime;
    public temperature;
    public temperatureExternal;
    public humidity;
    public humidityExternal;
    public lightStatus = false;
    public musicStatus = false;
    public fanStatus = false;
    userServiceSubscription: Subscription = new Subscription();
    meteoServiceSubscription: Subscription = new Subscription();
    fanServiceSubscription: Subscription = new Subscription();
    musicServiceSubscription: Subscription = new Subscription();
    lightServiceSubscription: Subscription = new Subscription();

    constructor(
        public _doorService: DoorService,
        public _schedulerService: SchedulerService,
        private changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _meteoService: MeteoService,
        private _fanService: FanService,
        private _musiceService: MusicService,
        private _lightService: LightService
    ) {}

    refreshNextEvent() {
        this._schedulerService.getNextEvents().subscribe((data: NextEvents) => {
            this.nextOpeningTime = data.nextDoorOpeningTime.substr(11, 5);
            this.nextClosingTime = data.nextDoorClosingTime.substr(11, 5);
            this.changeDetectorRef.detectChanges();
        });
    }
    refreshDoorStatus() {
        this._doorService.getDoorStatus().subscribe((data: DoorStatus) => {
            console.log('état de la porte :', data.status);
            this.doorStatus = data.status;
            this.changeDetectorRef.detectChanges();
        });
    }

    ngOnInit() {
        this.userServiceSubscription = this._userService.user$.subscribe(() => {
            this.refreshNextEvent();
            this.refreshDoorStatus();
        });
        this.meteoServiceSubscription = this._meteoService
            .getMeteoInfo()
            .subscribe((data: MeteoInfo) => {
                this.refreshMeteoInfo(data);
            });
        this.fanServiceSubscription = this._fanService.getStatus().subscribe((data: FanStatus) => {
            this.refreshFanInfo(data);
        });
        this.musicServiceSubscription = this._musiceService
            .getStatus()
            .subscribe((data: MusicStatus) => {
                this.refreshMusicStatus(data);
            });
        this.lightServiceSubscription = this._lightService
            .getStatus()
            .subscribe((data: LightStatus) => {
                this.refreshLightStatus(data);
            });
    }

    ngOnDestroy(): void {
        console.log('destroying ', this.nextClosingTime);
        this.userServiceSubscription.unsubscribe();
        this.meteoServiceSubscription.unsubscribe();
    }

    private refreshMeteoInfo(data: MeteoInfo) {
        this.temperature = data.temperature;
        this.humidity = data.humidity;
        this.temperatureExternal = data.externalTemperature;
        this.humidityExternal = data.externalHumidity;
        this.changeDetectorRef.detectChanges();
    }

    private refreshFanInfo(data: FanStatus) {
        this.fanStatus = data.statusEnum === 'ON';
        this.changeDetectorRef.detectChanges();
    }

    private refreshMusicStatus(data: MusicStatus) {
        this.musicStatus = data.statusEnum === 'ON';
        this.changeDetectorRef.detectChanges();
    }

    private refreshLightStatus(data: LightStatus) {
        console.log('état de la lumière', data);
        this.lightStatus = data.statusEnum === 'ON';
        this.changeDetectorRef.detectChanges();
    }
}
