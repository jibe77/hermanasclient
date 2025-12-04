import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * Logging interceptor that logs HTTP requests and responses for debugging.
 * Only logs in development mode to avoid console noise in production.
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    const started = Date.now();

    return next(req).pipe(
        tap({
            next: event => {
                // Only log final HTTP response
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(
                        `[HTTP] ${req.method} ${req.urlWithParams} - ${event.status} (${elapsed}ms)`
                    );
                }
            },
            error: error => {
                const elapsed = Date.now() - started;
                console.error(
                    `[HTTP] ${req.method} ${req.urlWithParams} - ${error.status} ${error.statusText} (${elapsed}ms)`,
                    error
                );
            },
        })
    );
};
