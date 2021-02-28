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
    WebsocketService,
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
    public picturePath;
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
        private _lightService: LightService,
        private _websocketService: WebsocketService
    ) {}

    ngOnInit() {
        this.refreshPicture();

        this.userServiceSubscription = this._userService.user$.subscribe(() => {
            this.refreshNextEvent();
            this.refreshDoorStatus();
        });
        this.refreshMeteoInfo();
        this.refreshFanStatus();
        this.refreshMusicStatus();
        this.createSubscriptionToLightNotifications();

        this._websocketService.initWebSocket().then(() => {
            this._websocketService.subscribe('socket/progress', event => {
                if (event.body.appliance === 'LIGHT') {
                    this.refreshLightStatus(event.body.state === 'ON');
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.userServiceSubscription.unsubscribe();
        this.meteoServiceSubscription.unsubscribe();
        this.musicServiceSubscription.unsubscribe();
        this.fanServiceSubscription.unsubscribe();
        this.lightServiceSubscription.unsubscribe();
        this._websocketService.unsubscribeToWebSocketEvent('socket/progress');
    }

    public refreshPicture() {
        this.picturePath =
            this._lightService.domainBase + '/camera/takePicture#' + new Date().getTime();
        this.changeDetectorRef.detectChanges();
    }

    displayWebcam() {
        this.picturePath = this._lightService.domainBase + '/camera/stream';
        this.changeDetectorRef.detectChanges();
    }

    private refreshMeteoInfo() {
        this.meteoServiceSubscription = this._meteoService
            .getMeteoInfo()
            .subscribe((data: MeteoInfo) => {
                this.temperature = data.temperature;
                this.humidity = data.humidity;
                this.temperatureExternal = data.externalTemperature;
                this.humidityExternal = data.externalHumidity;
                this.changeDetectorRef.detectChanges();
            });
    }

    refreshNextEvent() {
        this._schedulerService.getNextEvents().subscribe((data: NextEvents) => {
            this.nextOpeningTime = data.nextDoorOpeningTime.substr(11, 5);
            this.nextClosingTime = data.nextDoorClosingTime.substr(11, 5);
            this.changeDetectorRef.detectChanges();
        });
    }
    refreshDoorStatus() {
        this._doorService.getDoorStatus().subscribe((data: DoorStatus) => {
            this.doorStatus = data.status;
            this.changeDetectorRef.detectChanges();
        });
    }
    refreshFanStatus() {
        this.fanServiceSubscription = this._fanService.getStatus().subscribe((data: FanStatus) => {
            this.fanStatus = data.statusEnum === 'ON';
            this.changeDetectorRef.detectChanges();
        });
    }

    refreshMusicStatus() {
        this.musicServiceSubscription = this._musiceService
            .getStatus()
            .subscribe((data: MusicStatus) => {
                this.musicStatus = data.statusEnum === 'ON';
                this.changeDetectorRef.detectChanges();
            });
    }

    createSubscriptionToLightNotifications() {
        this.lightServiceSubscription = this._lightService
            .getStatus()
            .subscribe((data: LightStatus) => {
                this.refreshLightStatus(data.statusEnum === 'ON');
            });
    }

    private refreshLightStatus(status: boolean) {
        this.lightStatus = status;
        this.changeDetectorRef.detectChanges();
    }
}
