import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { UserService } from '@modules/auth/services';
import { DashboardComponent } from '@modules/dashboard/containers';
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
    public nextEventsOnError = false;
    public temperature;
    public temperatureExternal;
    public humidity;
    public humidityExternal;
    public meteoOnError = false;
    public lightStatus = undefined;
    public lightStatusOnError = false;
    public musicStatus = undefined;
    public musicStatusOnError = false;
    public fanStatus = undefined;
    public fanStatusOnError = false;
    public doorStatusOnError = false;
    public pictureInitialised = false;
    public picturePath = 'favicon.ico';

    userServiceSubscription: Subscription = new Subscription();
    meteoServiceSubscription: Subscription = new Subscription();
    fanServiceSubscription: Subscription = new Subscription();
    doorServiceSubscription: Subscription = new Subscription();
    musicServiceSubscription: Subscription = new Subscription();
    lightServiceSubscription: Subscription = new Subscription();
    nextEventSubcription: Subscription = new Subscription();

    constructor(
        public _doorService: DoorService,
        public _schedulerService: SchedulerService,
        private changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _meteoService: MeteoService,
        private _fanService: FanService,
        private _musiceService: MusicService,
        private _lightService: LightService,
        private _websocketService: WebsocketService,
        public _dashboard: DashboardComponent
    ) {
        this._dashboard.retryMessageIsDisplayed = () => {
            return this.isConnectionError();
        };
        this._dashboard.retry = () => {
            this.refreshInfoOnError();
        };
    }

    ngOnInit() {
        this.createSubscriptionToLightNotifications();
        this.createSubscriptionToFanNotifications();
        this.createSubscriptionToMusicNotifications();
        this.createSubscriptionToDoorNotifications();
        this.createSubscriptionToNextEventNotifications();
        this.refreshPicture();
        this.createSubscriptionToMeteoInfo();

        this._websocketService.initWebSocket().then(() => {
            this._websocketService.subscribe('socket/progress', event => {
                if (event.body.appliance === 'LIGHT') {
                    this.refreshLightStatus(event.body.state === 'ON');
                } else if (event.body.appliance === 'FAN') {
                    this.refreshFanStatus(event.body.state === 'ON');
                } else if (event.body.appliance === 'DOOR') {
                    this.refreshDoorStatus(event.body.state);
                } else if (event.body.appliance === 'MUSIC') {
                    this.refreshMusicStatus(event.body.state === 'ON');
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.pictureInitialised = false;
        this.userServiceSubscription.unsubscribe();
        this.meteoServiceSubscription.unsubscribe();
        this.musicServiceSubscription.unsubscribe();
        this.fanServiceSubscription.unsubscribe();
        this.lightServiceSubscription.unsubscribe();
        this.nextEventSubcription.unsubscribe();
        this._websocketService.unsubscribeToWebSocketEvent('socket/progress');
    }

    public refreshPicture() {
        this.pictureInitialised = false;
        this.picturePath =
            this._lightService.domainBase + '/camera/takePicture#' + new Date().getTime();
        this.changeDetectorRef.detectChanges();
    }

    public displayWebcam() {
        this.picturePath = this._lightService.domainBase + '/camera/stream';
        this.changeDetectorRef.detectChanges();
    }

    public pictureIsInitialised() {
        if (this.picturePath !== 'favicon.ico') {
            this.pictureInitialised = true;
            this.changeDetectorRef.detectChanges();
        }
    }

    public createSubscriptionToMeteoInfo() {
        if (this.meteoServiceSubscription !== undefined) {
            this.meteoServiceSubscription.unsubscribe();
            this.refreshMeteoInfo();
        }
        this.meteoServiceSubscription = this._meteoService
            .getMeteoInfo()
            .subscribe((data: MeteoInfo) => {
                this.refreshMeteoInfo(data);
            },
            error => {
                this.refreshMeteoInfo(undefined, error);
            }
        );
    }

    public refreshMeteoInfo(data?: MeteoInfo, error?: any) {
        this.meteoOnError = error !== undefined;
        this.temperature = data === undefined ? undefined : data.temperature;
        this.humidity = data === undefined ? undefined : data.humidity;
        this.temperatureExternal = data === undefined ? undefined : data.externalTemperature;
        this.humidityExternal = data === undefined ? undefined : data.externalHumidity;
        this.refresh();
    }

    createSubscriptionToNextEventNotifications() {
        if (this.nextEventSubcription !== undefined) {
            this.nextEventSubcription.unsubscribe();
            this.nextEventsOnError = false;
            this.nextOpeningTime = undefined;
            this.nextClosingTime = undefined;
            this.changeDetectorRef.detectChanges();
            this._dashboard.refreshCardComponent();
        }
        this.nextEventSubcription = this._schedulerService.getNextEvents().subscribe(
            (data: NextEvents) => {
                this.refreshNextEvent(data);
            },
            error => {
                this.refreshNextEvent(undefined, error);
            }
        );
    }

    refreshNextEvent(data: NextEvents, error?: any) {
        this.nextEventsOnError = error !== undefined;
        this.nextOpeningTime =
            data !== undefined ? data.nextDoorOpeningTime.substr(11, 5) : undefined;
        this.nextClosingTime =
            data !== undefined ? data.nextDoorClosingTime.substr(11, 5) : undefined;
        this.changeDetectorRef.detectChanges();
    }

    createSubscriptionToDoorNotifications() {
        if (this.doorServiceSubscription !== undefined) {
            this.doorServiceSubscription.unsubscribe();
            this.doorStatusOnError = false;
            this.doorStatus = undefined;
            this.changeDetectorRef.detectChanges();
            this._dashboard.refreshCardComponent();
        }
        this.doorServiceSubscription = this._doorService.getDoorStatus().subscribe(
            (data: DoorStatus) => {
                this.refreshDoorStatus(data.status);
            },
            error => {
                this.refreshDoorStatus(undefined, error);
            }
        );
    }

    refreshDoorStatus(status?: string, error?: any) {
        this.doorStatusOnError = error !== undefined;
        this.doorStatus = status;
        this.refresh();
    }

    createSubscriptionToFanNotifications() {
        if (this.fanServiceSubscription !== undefined) {
            this.fanServiceSubscription.unsubscribe();
            this.fanStatusOnError = false;
            this.fanStatus = undefined;
            this.changeDetectorRef.detectChanges();
            this._dashboard.refreshCardComponent();
        }
        this.fanServiceSubscription = this._fanService.getStatus().subscribe(
            (data: FanStatus) => {
                this.refreshFanStatus(data.statusEnum === 'ON');
            },
            (error: any) => {
                this.refreshFanStatus(undefined, error);
            }
        );
    }

    private refreshFanStatus(status?: boolean, error?: any) {
        this.fanStatusOnError = error !== undefined;
        this.fanStatus = status;
        this.refresh();
    }

    createSubscriptionToMusicNotifications() {
        if (this.musicServiceSubscription !== undefined) {
            this.musicServiceSubscription.unsubscribe();
            this.musicStatusOnError = false;
            this.musicStatus = undefined;
            this.changeDetectorRef.detectChanges();
            this._dashboard.refreshCardComponent();
        }
        this.musicServiceSubscription = this._musiceService
            .getStatus()
            .subscribe((data: MusicStatus) => {
                this.refreshMusicStatus(data.statusEnum === 'ON');
            },
            (error: any) => {
                this.refreshMusicStatus(undefined, error);
            }
        );
    }

    private refreshMusicStatus(status?: boolean, error?: any) {
        this.musicStatusOnError = error !== undefined;
        this.musicStatus = status;
        this.refresh();
    }

    createSubscriptionToLightNotifications() {
        if (this.lightServiceSubscription !== undefined) {
            this.lightServiceSubscription.unsubscribe();
            this.lightStatusOnError = false;
            this.lightStatus = undefined;
            this.changeDetectorRef.detectChanges();
            this._dashboard.refreshCardComponent();
        }
        this.lightServiceSubscription = this._lightService
            .getStatus()
            .subscribe(
            (data: LightStatus) => {
                this.refreshLightStatus(data.statusEnum === 'ON');
            },
            (error: any) => {
                this.refreshLightStatus(undefined, error);
            }
        );
    }

    private refreshLightStatus(status?: boolean, error?: any) {
        this.lightStatusOnError = error !== undefined;
        this.lightStatus = status;
        console.log('refresh light');
        this.refresh();
    }

    public isConnectionError(): boolean {
        return (
            this.meteoOnError ||
            this.lightStatusOnError ||
            this.fanStatusOnError ||
            this.musicStatusOnError ||
            this.doorStatusOnError
        );
    }

    public refreshInfoOnError() {
        if (this.lightStatusOnError) {
            this.createSubscriptionToLightNotifications();
        }
        if (this.fanStatusOnError) {
            this.createSubscriptionToFanNotifications();
        }
        if (this.musicStatusOnError) {
            this.createSubscriptionToMusicNotifications();
        }
        if (this.doorStatusOnError) {
            this.createSubscriptionToDoorNotifications();
        }
        if (this.meteoOnError) {
            this.createSubscriptionToMeteoInfo();
        }
        this.refreshPicture();
        this.changeDetectorRef.detectChanges();
        this._dashboard.refreshCardComponent();
    }

    private refresh() {
        this.changeDetectorRef.detectChanges();
        if (this.isConnectionError()) {
            this._dashboard.refreshCardComponent();
        }
    }

    refreshWebcamEventHandler($event: any) {
        console.log('event refreshWebcamEventHandler');
        this.refreshPicture();
    }
}
