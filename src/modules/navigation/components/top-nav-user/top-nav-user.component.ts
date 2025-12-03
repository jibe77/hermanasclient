import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Hub } from 'aws-amplify/utils';
import { User, AuthState } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit, OnDestroy {
    user: User;
    authState: AuthState = AuthState.SignedOut;
    subscription: Subscription = new Subscription();
    loginText: string;
    logoutText: string;
    private hubUnsubscribe: (() => void) | undefined;

    constructor(
        public navigationService: NavigationService,
        public userService: UserService,
        private ngZone: NgZone,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {}

    ngOnInit() {
        // Note: I18n API removed in Amplify v6 - translations now configured via Amplify UI components
        // Set default English text for now
        this.loginText = 'Sign In';
        this.logoutText = 'Sign Out';

        // Check initial auth state
        this.userService.checkAuthState();

        // Listen for auth events
        this.hubUnsubscribe = Hub.listen('auth', (data) => {
            const event = data.payload.event;

            if (event === 'signedIn') {
                this.authState = AuthState.SignedIn;
            } else if (event === 'signedOut') {
                this.authState = AuthState.SignedOut;
            }

            this.changeDetectorRef.markForCheck();
        });
    }

    navigateTo(url) {
        this.router.navigate([url]);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        if (this.hubUnsubscribe) {
            this.hubUnsubscribe();
        }
    }
}
