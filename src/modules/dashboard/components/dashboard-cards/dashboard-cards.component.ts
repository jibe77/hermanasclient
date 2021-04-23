import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { DashboardComponent } from '@modules/dashboard/containers';

@Injectable()
@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent {
    constructor(
        public _dashboardComponent: DashboardComponent,
        public _changeDetectorRef: ChangeDetectorRef
    ) {
        this._dashboardComponent.setCardChangeDetectorRef(this._changeDetectorRef);
    }
}
