import { signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { APIService } from '@app/API.service';
import { AuthState } from '@modules/auth/models/auth-state';
import { UserService } from '@modules/auth/services';
import { MockUser, User } from '@testing/mocks';
import { Observable } from 'rxjs';

const mockUser = new MockUser();

interface CognitoUserInterface {
    username: string;
    attributes: {
        email: string;
    };
}

// @ts-ignore
export class UserServiceStub implements UserService {
    private _user: WritableSignal<User> = signal(mockUser);
    private _user$: Observable<User> = toObservable(this._user);

    get user(): WritableSignal<User> {
        return this._user;
    }

    set user(user: User) {
        this._user.set(user);
    }

    get user$(): Observable<User> {
        return this._user$;
    }

    getCurrentUser(): User {
        return this._user();
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
