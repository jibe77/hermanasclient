import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState, CognitoUserInterface, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { NavigationService } from '@modules/navigation/services';
import { I18n } from 'aws-amplify';
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
    loginText: string;
    logoutText: string;

    constructor(public navigationService: NavigationService, public userService: UserService) {}

    ngOnInit() {
        const dict = {
            'fr-FR': {
                'Sign In': 'Connexion',
                'Sign Up': 'Création d\'un compte',
                'Sign Out': 'Déconnexion',
                'Forgot Password?': 'Mot de passe perdu ?',
            },
            'en-US': {
                'Sign In': 'Sign in',
                'Sign Up': 'Sign up',
                'Sign Out': 'Sign out',
                'Forgot Password?': 'Forgot password ?',
            },
        };
        I18n.putVocabularies(dict);
        this.loginText = I18n.get('Sign In');
        this.logoutText = I18n.get('Sign out');
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
