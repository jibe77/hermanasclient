import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
    public retryMessageIsDisplayed: () => boolean;
    public retry: () => void;
    public cardChangeDetector: ChangeDetectorRef;

    constructor() {}
    public refreshCardComponent() {
        if (this.cardChangeDetector) {
            this.cardChangeDetector.detectChanges();
        }
    }

    public setCardChangeDetectorRef(changeDetectorRef: ChangeDetectorRef) {
        this.cardChangeDetector = changeDetectorRef;
    }
}
