import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthState } from '@aws-amplify/ui-components';
import { User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class NavigationGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.userService.user$.pipe(
            take(1),
            map((user: User) => {
                if (user && user.authState === AuthState.SignedIn) {
                    return true;
                }
                // Redirect to login page if not authenticated
                return this.router.createUrlTree(['/auth/login']);
            })
        );
    }
}
