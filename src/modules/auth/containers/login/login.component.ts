import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hub } from 'aws-amplify/utils';
import { AuthState } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { NavigationService } from '@modules/navigation/services';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    authState: AuthState = AuthState.SignedOut;
    private hubUnsubscribe: (() => void) | undefined;

    constructor(
        public navigationService: NavigationService,
        public userService: UserService,
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        // Check initial auth state
        this.userService.checkAuthState();

        // Listen for auth events
        this.hubUnsubscribe = Hub.listen('auth', data => {
            const event = data.payload.event;

            if (event === 'signedIn') {
                this.authState = AuthState.SignedIn;
                this.ngZone.run(() => this.router.navigate(['dashboard']));
            } else if (event === 'signedOut') {
                this.authState = AuthState.SignedOut;
            }

            this.ref.markForCheck();
        });
    }

    ngOnDestroy() {
        if (this.hubUnsubscribe) {
            this.hubUnsubscribe();
        }
    }
}
