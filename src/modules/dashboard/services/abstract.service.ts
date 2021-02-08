import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '@modules/auth/models';
import { throwError } from 'rxjs';

export class AbstractService {
    protected domainBase = 'http://poulailler57.ddns.net:5780';

    protected getHeaders() {
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });
    }

    protected getHeadersWithAuth(user: User) {
        const auth = btoa(user.backEndUser + ':' + user.backEndPassword);
        return new HttpHeaders({
            Authorization: 'Basic ' + auth,
            'Access-Control-Allow-Origin': '*',
        });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
    }
}
