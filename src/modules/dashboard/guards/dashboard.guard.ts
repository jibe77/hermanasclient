import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { User, AuthState } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class DashboardGuard {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.userService.user$.pipe(
            take(1),
            map((user: User) => {
                // Check if user is authenticated
                if (!user || user.authState !== AuthState.SignedIn) {
                    return this.router.createUrlTree(['/auth/login']);
                }

                // Check if user has backend credentials configured
                if (!user.backEndUser || !user.backEndPassword) {
                    // User is authenticated but missing backend credentials
                    // Allow access but components will handle missing credentials
                    return true;
                }

                return true;
            })
        );
    }
}
