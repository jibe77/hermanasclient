import { Injectable } from '@angular/core';
import { APIService, ListUserParamsQuery } from '@app/API.service';
import { Observable, ReplaySubject } from 'rxjs';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

import { User, AuthState } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    private currentUser: User;

    constructor(private api: APIService) {
        this.currentUser = this.createDefaultNewUser();
        this.user = this.currentUser;
        // Initialize auth state on service creation
        this.checkAuthState();
    }

    set user(user: User) {
        this.currentUser = user;
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }

    /**
     * Get the current user synchronously (for use in interceptors)
     */
    getCurrentUser(): User {
        return this.currentUser;
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
            console.error('Error fetching user params:', error);
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
    reset(authState: string, authData?: { username?: string; attributes?: { email?: string } }): void {
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
