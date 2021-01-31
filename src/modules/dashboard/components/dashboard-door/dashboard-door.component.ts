import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { DoorService, DoorStatus, NextEvents } from '@modules/dashboard/services/door.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'sb-dashboard-door',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-door.component.html',
    styleUrls: ['dashboard-door.component.scss'],
})
export class DashboardDoorComponent implements OnInit, OnDestroy {
    public stateDoorIsClosed;
    public nextOpeningTime;
    public nextClosingTime;
    subscription: Subscription = new Subscription();

    constructor(
        public _doorService: DoorService,
        private changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService
    ) {}

    refresh(user: User) {
        this._doorService.getNextEvents(user).subscribe((data: NextEvents) => {
            this.nextOpeningTime = data.nextDoorOpeningTime.substr(11, 5);
            this.nextClosingTime = data.nextDoorClosingTime.substr(11, 5);
            this.changeDetectorRef.detectChanges();
        });
        this._doorService.getDoorStatus(user).subscribe((data: DoorStatus) => {
            console.log('état de la porte :', data.status);
            if (data.status === 'CLOSED') {
                this.stateDoorIsClosed = true;
            } else if (data.status === 'OPENED') {
                this.stateDoorIsClosed = false;
            } else {
                this.stateDoorIsClosed = undefined;
            }
            console.log('état de la porte : ', this.stateDoorIsClosed);
            this.changeDetectorRef.detectChanges();
        });
    }

    ngOnInit() {
        this.subscription = this._userService.user$.subscribe((user: User) => {
            this.refresh(user);
        });
    }

    ngOnDestroy(): void {
        console.log('destroying ', this.nextClosingTime);
        this.subscription.unsubscribe();
    }
}
