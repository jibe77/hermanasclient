import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DoorService {
    auth = btoa('marguerite:batman');

    options = {
        headers: new HttpHeaders({
            Authorization: 'Basic ' + this.auth,
            'Access-Control-Allow-Origin': '*',
        }),
        params: {},
        responseType: 'text' as 'text',
    };
    constructor(private _httpClient: HttpClient) {}

    // http://poulailler57.ddns.net:5780/scheduler/doorClosingTime
    getNextDoorClosingTime(): Observable<any> {
        const closingTimeUrl = 'http://poulailler57.ddns.net:5780/scheduler/doorClosingTime';
        return this._httpClient
            .get(closingTimeUrl, this.options)
            .pipe(catchError(e => this.handleError(e)));
        // return '17:47';
    }

    // http://poulailler57.ddns.net:5780/scheduler/doorOpeningTime
    getNextDoorOpeningTime(): Observable<any> {
        const closingTimeUrl = 'http://poulailler57.ddns.net:5780/scheduler/doorOpeningTime';
        return this._httpClient
            .get(closingTimeUrl, this.options)
            .pipe(catchError(e => this.handleError(e)));
        // return '08:17';
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
