import { APIService } from '@app/API.service';
import { AuthState, CognitoUserInterface } from '@aws-amplify/ui-components';
import { UserService } from '@modules/auth/services';
import { MockUser, User } from '@testing/mocks';
import { Observable, of } from 'rxjs';

const mockUser = new MockUser();

// @ts-ignore
export class UserServiceStub implements UserService {
    set user(user: User) {}
    get user$(): Observable<User> {
        return of(mockUser);
    }

    private createDefaultNewUser(): User {
        return undefined;
    }

    reset(authState: AuthState, authData: CognitoUserInterface) {
        const nUser: User = this.createDefaultNewUser();
        nUser.authState = authState;
        if (authState === AuthState.SignedIn) {
            nUser.login = authData.username;
            nUser.email = authData.attributes.email;
        } else {
            nUser.login = 'guest';
            this.user = nUser;
        }
    }
}
