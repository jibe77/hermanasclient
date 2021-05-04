import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { DashboardComponent } from '@modules/dashboard/containers';
import {SystemComponent} from '@modules/system/containers';

@Injectable()
@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent {
    constructor(
        public _systemComponent: SystemComponent,
        public _changeDetectorRef: ChangeDetectorRef
    ) {
        this._systemComponent.setCardChangeDetectorRef(this._changeDetectorRef);
    }
}
