import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { AuthState, CognitoUserInterface, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { User } from '@modules/auth/models';
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
    authState: AuthState;
    subscription: Subscription = new Subscription();

    constructor(
        public navigationService: NavigationService,
        public userService: UserService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        onAuthUIStateChange((authState: AuthState, authData: CognitoUserInterface) => {
            console.log('login state change, before', this.authState, 'new state', authState);
            this.userService.reset(authState, authData);
            this.authState = authState;
        });
    }

    ngOnDestroy() {
        console.log('destroy side-nav (jb).');
        this.subscription.unsubscribe();
        return onAuthUIStateChange;
    }
}
