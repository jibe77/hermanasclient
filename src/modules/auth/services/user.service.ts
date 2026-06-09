import { Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { APIService, ListUserParamsQuery } from '@app/API.service';
import { Observable } from 'rxjs';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { LoggerService } from '@common/services';

import { User, AuthState } from '../models';

@Injectable()
export class UserService {
    private readonly _user: WritableSignal<User>;
    private readonly _user$: Observable<User>;

    constructor(private api: APIService, private logger: LoggerService) {
        this._user = signal(this.createDefaultNewUser());
        this._user$ = toObservable(this._user);
        // Initialize auth state on service creation
        this.checkAuthState();
    }

    /**
     * Get the current user as a signal (readonly)
     */
    get user(): WritableSignal<User> {
        return this._user;
    }

    /**
     * Set the current user
     */
    set user(user: User) {
        this._user.set(user);
    }

    /**
     * Get the current user as an observable (for backward compatibility)
     */
    get user$(): Observable<User> {
        return this._user$;
    }

    /**
     * Get the current user synchronously (for use in interceptors)
     */
    getCurrentUser(): User {
        return this._user();
    }

    /**
     * Check current auth state and update user
     */
    async checkAuthState(): Promise<void> {
        try {
            const currentUser = await getCurrentUser();
            const attributes = await fetchUserAttributes();
            await this.setSignedInUser(currentUser.username, attributes.email || '');
        } catch (error) {
            // User is not signed in
            this.setSignedOutUser();
        }
    }

    /**
     * Set user as signed in with auth data
     */
    async setSignedInUser(username: string, email: string): Promise<void> {
        const nUser: User = this.createDefaultNewUser();
        nUser.authState = AuthState.SignedIn;
        nUser.login = username;
        nUser.email = email;

        // Fetch backend credentials from GraphQL
        try {
            const event: ListUserParamsQuery = await this.api.ListUserParams();
            for (const item of event.items) {
                if (item.key === 'CHICKEN_COOP_LOGIN') {
                    nUser.backEndUser = item.value;
                } else if (item.key === 'CHICKEN_COOP_PASSWORD') {
                    nUser.backEndPassword = item.value;
                }
            }
        } catch (error) {
            this.logger.error('Error fetching user params', error, 'UserService');
        }

        this.user = nUser;
    }

    /**
     * Set user as signed out
     */
    setSignedOutUser(): void {
        const nUser: User = this.createDefaultNewUser();
        nUser.login = 'guest';
        nUser.authState = AuthState.SignedOut;
        this.user = nUser;
    }

    /**
     * Legacy method for compatibility - now delegates to new methods
     * @deprecated Use checkAuthState() instead
     */
    reset(
        authState: string,
        authData?: { username?: string; attributes?: { email?: string } }
    ): void {
        if (authState === AuthState.SignedIn && authData) {
            this.setSignedInUser(authData.username || '', authData.attributes?.email || '');
        } else {
            this.setSignedOutUser();
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
