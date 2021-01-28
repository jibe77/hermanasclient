import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-door-action',
    templateUrl: './dashboard-door-action.component.html',
    styleUrls: ['dashboard-door-action.component.scss'],
})
export class DashboardDoorActionComponent implements OnInit {
    @Input() public stateDoorIsClosed;

    constructor() {}

    ngOnInit(): void {
        console.log('state of the door : ', this.stateDoorIsClosed);
    }
}
