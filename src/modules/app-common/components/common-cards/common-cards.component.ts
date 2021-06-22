import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Injectable,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable()
@Component({
    selector: 'sb-common-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './common-cards.component.html',
    styleUrls: ['common-cards.component.scss'],
})
export class CommonCardsComponent implements OnInit, OnDestroy {
    private eventsSubscription: Subscription;
    retryMessageIsDisplayed = false;

    @Input() notificationEvents: Observable<void>;
    @Output() serviceRetry = new EventEmitter();
    eventSubject: Subject<void> = new Subject<void>();

    constructor(public _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.eventsSubscription = this.notificationEvents.subscribe(() => {
            this.retryMessageIsDisplayed = true;
            this._changeDetectorRef.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.eventsSubscription.unsubscribe();
    }

    onEvent(event: any) {
        this.eventSubject.next();
        console.log(`event received ${event}`);
        this.retry();
    }

    retry() {
        this.retryMessageIsDisplayed = false;
        this._changeDetectorRef.detectChanges();
        this.serviceRetry.emit();
    }
}
