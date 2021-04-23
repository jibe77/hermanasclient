import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DashboardComponent } from '@modules/dashboard/containers';

@Component({
    selector: 'sb-card-view-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './card-view-details.component.html',
    styleUrls: ['card-view-details.component.scss'],
})
export class CardViewDetailsComponent implements OnInit {
    @Input() background!: string;
    @Input() color!: string;
    @Input() link = '';

    customClasses: string[] = [];

    constructor(public _dashboardComponent: DashboardComponent) {}
    ngOnInit() {
        if (this.background) {
            this.customClasses.push(this.background);
        }
        if (this.color) {
            this.customClasses.push(this.color);
        }
    }
}
