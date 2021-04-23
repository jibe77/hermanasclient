import { Injectable } from '@angular/core';
import { APIService, ListUserParamsQuery } from '@app/API.service';
import { AuthState, CognitoUserInterface } from '@aws-amplify/ui-components';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor(private api: APIService) {
        this.user = this.createDefaultNewUser();
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }

    reset(authState: AuthState, authData: CognitoUserInterface) {
        const nUser: User = this.createDefaultNewUser();
        nUser.authState = authState;
        if (authState === AuthState.SignedIn) {
            nUser.login = authData.username;
            nUser.email = authData.attributes.email;

            //  this.authState = AuthState.SignedIn;
            this.api.ListUserParams().then((event: ListUserParamsQuery) => {
                for (const item of event.items) {
                    if (item.key === 'CHICKEN_COOP_LOGIN') {
                        nUser.backEndUser = item.value;
                    } else if (item.key === 'CHICKEN_COOP_PASSWORD') {
                        nUser.backEndPassword = item.value;
                    }
                }
                this.user = nUser;
            });
        } else {
            nUser.login = 'guest';
            this.user = nUser;
        }
    }

    private createDefaultNewUser(): User {
        return {
            id: undefined,
            email: 'guest',
            login: 'guest',
            backEndUser: undefined,
            backEndPassword: undefined,
            authState: AuthState.SignedOut,
        };
    }
}
