import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { DashboardDoorComponent } from '@modules/dashboard/components';
import { DoorService } from '@modules/dashboard/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-dashboard-door-action',
    templateUrl: './dashboard-door-action.component.html',
    styleUrls: ['dashboard-door-action.component.scss'],
})
export class DashboardDoorActionComponent implements OnInit {
    @Input() public doorStatus;
    user: User;
    subscription: Subscription = new Subscription();

    constructor(
        public _doorService: DoorService,
        private _userService: UserService,
        private changeDetectorRef: ChangeDetectorRef,
        private dashboardDoorComponent: DashboardDoorComponent
    ) {}

    ngOnInit(): void {
        this.subscription = this._userService.user$.subscribe((user: User) => {
            this.refresh(user);
        });
    }

    refresh(user: User) {
        this.user = user;
    }

    public openDoor() {
        this._doorService.openDoor(this.user).subscribe(() => {
            this.dashboardDoorComponent.refreshDoorStatus();
        });
    }

    public closeDoor() {
        this._doorService.closeDoor(this.user).subscribe(() => {
            this.dashboardDoorComponent.refreshDoorStatus();
        });
    }
}