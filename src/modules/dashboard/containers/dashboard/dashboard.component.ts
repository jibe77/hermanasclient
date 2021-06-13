import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DashboardCardsComponent } from '@modules/dashboard/components/dashboard-cards/dashboard-cards.component';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
    public retryMessageIsDisplayed: () => boolean;
    public retry: () => void;

    //@Input()
    //dashboardCardsComponent: DashboardCardsComponent;

    constructor() {}
    public refreshCardComponent() {
        //if (this.dashboardCardsComponent) {
        //    this.dashboardCardsComponent._changeDetectorRef.detectChanges();
        //}
    }
}
