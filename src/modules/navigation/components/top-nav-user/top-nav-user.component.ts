import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Auth} from '@aws-amplify/auth';
import {AuthState, CognitoUserInterface, onAuthUIStateChange} from '@aws-amplify/ui-components';
import { UserService } from '@modules/auth/services';
import {NavigationService} from '@modules/navigation/services';
import {Subscription} from 'rxjs';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit, OnDestroy {

    user: CognitoUserInterface | undefined;
    authState: AuthState;
    subscription: Subscription = new Subscription();

    constructor(
        public navigationService: NavigationService,
        public userService: UserService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        console.log('ngOnInit on side-nav');
        try {
            const user = Auth.currentAuthenticatedUser();
            if (user) {
                console.log('user:', user);
                this.authState = AuthState.SignedIn;
            } else {
                console.log('no user');
            }
        } catch (e) {
            console.log('can not get user.', e);
        }
        onAuthUIStateChange((authState, authData) => {
            this.authState = authState;
            this.user = authData as CognitoUserInterface;
            this.ref.detectChanges();
            console.log('change detected on side-nav (jb).');
            if (this.user) {
                console.log('change login (jb) :', this.user.username);
            } else {
                console.log('change login (jb) no login');
            }
        });
    }

    ngOnDestroy() {
        console.log('destroy side-nav (jb).');
        this.subscription.unsubscribe();
        return onAuthUIStateChange;
    }
}
