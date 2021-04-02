import {
    ChangeDetectionStrategy,
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
    selector: 'sb-top-nav-lang',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-lang.component.html',
    styleUrls: ['top-nav-lang.component.scss'],
})
export class TopNavLangComponent {
    constructor(public navigationService: NavigationService) {}
}
