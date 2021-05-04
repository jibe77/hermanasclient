import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { VersionInfo, VersionService } from '@modules/system/services/version.service';
import { Subscription } from 'rxjs';

import { version } from '../../../../../package.json';

@Component({
    selector: 'sb-system',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './system.component.html',
    styleUrls: ['system.component.scss'],
})
export class SystemComponent implements OnInit, OnDestroy {
    versionServiceSubscription: Subscription = new Subscription();
    public backEndVersion: string;
    public frontEndVersion: string = version;
    private backEndVersionOnError: boolean;
    private cardsChangeDetectorRef: ChangeDetectorRef;

    constructor(
        private _versionService: VersionService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.createSubscriptionToBackendVersion();
    }

    ngOnDestroy(): void {
        this.versionServiceSubscription.unsubscribe();
    }

    createSubscriptionToBackendVersion() {
        if (this.versionServiceSubscription !== undefined) {
            this.versionServiceSubscription.unsubscribe();
            this.changeDetectorRef.detectChanges();
        }
        this.versionServiceSubscription = this._versionService.getVersionInfo().subscribe(
            (data: VersionInfo) => {
                this.refreshBackEndVersion(data);
            },
            (error: any) => {
                this.refreshBackEndVersion(undefined, error);
            }
        );
    }

    refreshBackEndVersion(data?: VersionInfo, error?: any) {
        this.backEndVersionOnError = error !== undefined;
        this.backEndVersion = data !== undefined ? data.version : undefined;
        this.changeDetectorRef.detectChanges();
    }

    public retryMessageIsDisplayed(): boolean {
        return this.backEndVersionOnError;
    }

    public retry() {
        if (this.backEndVersionOnError) {
            this.createSubscriptionToBackendVersion();
        }
        this.changeDetectorRef.detectChanges();
        this.cardsChangeDetectorRef.detectChanges();
    }

    setCardChangeDetectorRef(_changeDetectorRef: ChangeDetectorRef) {
        this.changeDetectorRef = _changeDetectorRef;
    }
}
