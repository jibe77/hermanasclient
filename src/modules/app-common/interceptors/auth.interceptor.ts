import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '@modules/auth/services';

/**
 * Auth interceptor that adds authentication headers to outgoing requests.
 * Replaces manual header management in AbstractService.getHeadersWithAuth().
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const userService = inject(UserService);
    const user = userService.getCurrentUser();

    // Only add auth headers if user is authenticated and has credentials
    if (user?.backEndUser && user?.backEndPassword) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Basic ${btoa(`${user.backEndUser}:${user.backEndPassword}`)}`,
            },
        });
        return next(authReq);
    }

    return next(req);
};
