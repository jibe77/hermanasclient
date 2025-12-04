import { HttpInterceptorFn } from '@angular/common/http';
import { timer } from 'rxjs';
import { retry } from 'rxjs/operators';

/**
 * Retry interceptor that retries failed HTTP requests with exponential backoff.
 * Retries up to 3 times with delays of 1s, 2s, 4s between attempts.
 */
export const retryInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        retry({
            count: 3,
            delay: (error, retryCount) => {
                // Only retry on server errors (5xx) or network errors
                if (error.status >= 500 || error.status === 0) {
                    const delayMs = Math.pow(2, retryCount - 1) * 1000; // Exponential backoff: 1s, 2s, 4s
                    console.log(
                        `Retrying HTTP request (attempt ${retryCount}/3) after ${delayMs}ms delay`
                    );
                    return timer(delayMs);
                }
                // Don't retry client errors (4xx)
                throw error;
            },
        })
    );
};
