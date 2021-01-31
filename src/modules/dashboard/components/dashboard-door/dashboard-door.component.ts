import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { DashboardDoorActionComponent } from '@modules/dashboard/components/dashboard-door-action/dashboard-door-action.component';
import { DashboardService } from '@modules/dashboard/services';
import { DoorService, NextEvents } from '@modules/dashboard/services/door.service';

@Component({
    selector: 'sb-dashboard-door',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-door.component.html',
    styleUrls: ['dashboard-door.component.scss'],
})
export class DashboardDoorComponent implements OnInit, OnDestroy {
    public stateDoorIsClosed = false;
    public nextOpeningTime;
    public nextClosingTime;

    constructor(public _doorService: DoorService, private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        /*
        this._doorService
            .getNextDoorOpeningTime()
            .subscribe(
                (data: string) => (
                    console.log('opening time : ', this.nextOpeningTime),
                    (this.nextOpeningTime = data),
                    console.log('opening time : ', this.nextOpeningTime),
                    this.changeDetectorRef.detectChanges()
                )
            );
        this._doorService
            .getNextDoorClosingTime()
            .subscribe(
                (data: string) => (
                    console.log('closing time ; ', this.nextClosingTime),
                    (this.nextClosingTime = data),
                    console.log('closing time ; ', this.nextClosingTime),
                    this.changeDetectorRef.detectChanges()
                )
            );
         */
        this._doorService.getNextEvents().subscribe((data: NextEvents) => {
            console.log('next event has answered');
            this.nextOpeningTime = data.nextDoorOpeningTime.substr(11, 5);
            this.nextClosingTime = data.nextDoorClosingTime.substr(11, 5);
            this.changeDetectorRef.detectChanges();
        });
    }

    ngOnDestroy(): void {
        console.log('destroying ', this.nextClosingTime);
    }
}
