import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { DashboardDoorActionComponent } from '@modules/dashboard/components/dashboard-door-action/dashboard-door-action.component';
import { DashboardService } from '@modules/dashboard/services';

@Component({
    selector: 'sb-dashboard-door',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-door.component.html',
    styleUrls: ['dashboard-door.component.scss'],
})
export class DashboardDoorComponent implements OnInit {
    public stateDoorIsClosed = false;
    public nextOpeningTime = '8h40';
    public nextClosingTime = '17h30';
    public dashboardService: DashboardService;

    constructor() {}
    ngOnInit() {}
}
