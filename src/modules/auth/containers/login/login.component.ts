import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthState, CognitoUserInterface, onAuthUIStateChange} from '@aws-amplify/ui-components';
import {UserService} from '@modules/auth/services';
import {NavigationService} from '@modules/navigation/services';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    authState: AuthState;

    constructor(
        public navigationService: NavigationService,
        public userService: UserService,
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        onAuthUIStateChange((authState: AuthState, authData: CognitoUserInterface) => {
            this.userService.reset(authState, authData);
            if (this.authState !== undefined && authState === AuthState.SignedIn) {
                this.authState = authState;
                this.router.navigate(['dashboard']);
            } else {
                this.authState = authState;
            }
        });
    }

    ngOnDestroy() {}
}
