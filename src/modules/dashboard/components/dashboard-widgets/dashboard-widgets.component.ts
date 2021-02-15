import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { UserService } from '@modules/auth/services';
import { MeteoInfo, MeteoService, NextEvents, SchedulerService } from '@modules/dashboard/services';
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
    userServiceSubscription: Subscription = new Subscription();
    meteoServiceSubscription: Subscription = new Subscription();

    constructor(
        public _doorService: DoorService,
        public _schedulerService: SchedulerService,
        private changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _meteoService: MeteoService
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
}