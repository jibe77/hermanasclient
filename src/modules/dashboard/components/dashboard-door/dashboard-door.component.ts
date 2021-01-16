import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'sb-dashboard-door',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-door.component.html',
    styleUrls: ['dashboard-door.component.scss'],
})
export class DashboardDoorComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
