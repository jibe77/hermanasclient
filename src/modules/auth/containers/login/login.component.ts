import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthState, CognitoUserInterface, onAuthUIStateChange} from '@aws-amplify/ui-components';
import {UserService} from '@modules/auth/services';
import {NavigationService} from '@modules/navigation/services';
import {Subscription} from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    user: CognitoUserInterface | undefined;
    authState: AuthState;
    subscription: Subscription = new Subscription();

    constructor(
        public navigationService: NavigationService,
        public userService: UserService,
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        onAuthUIStateChange((authState, authData) => {
            this.authState = authState;
            this.user = authData as CognitoUserInterface;
            this.ref.detectChanges();
            console.log('event login (jb)');
            if (this.user && authState === AuthState.SignedIn) {
                console.log('change login (jb) :', this.user.username);
                this.router.navigate(['dashboard']);
            } else {
                console.log('change login (jb) no login');
            }
        });
    }

    ngOnDestroy() {
        console.log('destroy login (jb).');
        this.subscription.unsubscribe();
        return onAuthUIStateChange;
    }
}
