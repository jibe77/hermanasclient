import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

export interface NextEvents {
    nextDoorOpeningTime: string;
    nextLightOnTime: string;
    nextDoorClosingTime: string;
    nextDoorOpeningTimeAsDate: Date;
    nextLightOnTimeAsDate: Date;
    nextDoorClosingTimeAsDate: Date;
}

@Injectable()
export class DoorService {
    constructor(private _httpClient: HttpClient) {}
    auth = btoa('marguerite:batman');
    headers = new HttpHeaders({
        Authorization: 'Basic ' + this.auth,
        'Access-Control-Allow-Origin': '*',
    });

    getNextDoorClosingTime(): Observable<any> {
        const closingTimeUrl = 'http://poulailler57.ddns.net:5780/scheduler/doorClosingTime';
        return this._httpClient
            .get(closingTimeUrl, { headers: this.headers, responseType: 'text' as 'text' })
            .pipe(catchError(e => this.handleError(e)));
        // return '17:47';
    }

    getNextDoorOpeningTime(): Observable<any> {
        const closingTimeUrl = 'http://poulailler57.ddns.net:5780/scheduler/doorOpeningTime';
        return this._httpClient
            .get(closingTimeUrl, { headers: this.headers, responseType: 'text' as 'text' })
            .pipe(catchError(e => this.handleError(e)));
        // return '08:17';
    }

    getNextEvents(): Observable<any> {
        const nextEventsUrl = 'http://poulailler57.ddns.net:5780/scheduler/nextEvents';
        return this._httpClient.get(nextEventsUrl, { headers: this.headers }).pipe(
            map((data: NextEvents) => {
                const d = '2021-02-01T18:02:10Z';
                data.nextDoorOpeningTimeAsDate = new Date(data.nextDoorOpeningTime);
                data.nextLightOnTimeAsDate = new Date(data.nextLightOnTime);
                data.nextDoorClosingTimeAsDate = new Date(data.nextDoorClosingTime);
                return data;
            })
            // catchError(e => this.handleError(e))
        );
    }

    getDoorStatus(): Observable<string> {
        const nextEventsUrl = 'http://poulailler57.ddns.net:5780/door/status';
        return this._httpClient.get(nextEventsUrl, {
            headers: this.headers,
            responseType: 'text' as 'text',
        });
        // catchError(e => this.handleError(e))
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
