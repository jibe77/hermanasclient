import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {Auth} from '@aws-amplify/auth';
import { AuthState, CognitoUserInterface, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { UserService } from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];
    user: CognitoUserInterface | undefined;
    authState: AuthState;
    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

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
