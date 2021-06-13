import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injectable,
    OnInit,
    Output,
} from '@angular/core';
import { DashboardComponent } from '@modules/dashboard/containers';

@Injectable()
@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent {
    //@Output()
    //_dashboardComponent: DashboardComponent;

    constructor(public _changeDetectorRef: ChangeDetectorRef) {}

    retryMessageIsDisplayed(): boolean {
        return false;
    }
}
