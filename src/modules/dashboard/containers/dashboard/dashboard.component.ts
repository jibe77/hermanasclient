import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
    constructor() {}

    notificationSubject: Subject<void> = new Subject<void>();
    retrySubject: Subject<void> = new Subject<void>();

    onServiceCommunicationError(event: any) {
        this.notificationSubject.next();
    }

    onServiceRetry(event: any) {
        this.retrySubject.next();
    }
}
