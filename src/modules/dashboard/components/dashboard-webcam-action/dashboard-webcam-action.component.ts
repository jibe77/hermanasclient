import { Component } from '@angular/core';
import { DashboardWidgetsComponent } from '@modules/dashboard/components/dashboard-widgets/dashboard-widgets.component';

@Component({
    selector: 'sb-dashboard-webcam-action',
    templateUrl: './dashboard-webcam-action.component.html',
    styleUrls: ['dashboard-webcam-action.component.scss'],
})
export class DashboardWebcamActionComponent {
    constructor(private _dashboardWidgetsComponent: DashboardWidgetsComponent) {}

    public refreshPicture() {
        this._dashboardWidgetsComponent.refreshPicture();
    }
}
