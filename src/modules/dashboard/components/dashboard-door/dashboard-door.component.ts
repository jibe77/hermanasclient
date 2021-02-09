import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { UserService } from '@modules/auth/services';
import { NextEvents, SchedulerService } from '@modules/dashboard/services';
import { DoorService, DoorStatus } from '@modules/dashboard/services/door.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-dashboard-door',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-door.component.html',
    styleUrls: ['dashboard-door.component.scss'],
})
export class DashboardDoorComponent implements OnInit, OnDestroy {
    public doorStatus;
    public nextOpeningTime;
    public nextClosingTime;
    subscription: Subscription = new Subscription();

    constructor(
        public _doorService: DoorService,
        public _schedulerService: SchedulerService,
        private changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService
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
        this.subscription = this._userService.user$.subscribe(() => {
            this.refreshNextEvent();
            this.refreshDoorStatus();
        });
    }

    ngOnDestroy(): void {
        console.log('destroying ', this.nextClosingTime);
        this.subscription.unsubscribe();
    }
}
