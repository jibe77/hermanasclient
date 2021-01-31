import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '@modules/auth/models';
import {UserService} from '@modules/auth/services';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface NextEvents {
    nextDoorOpeningTime: string;
    nextLightOnTime: string;
    nextDoorClosingTime: string;
    nextDoorOpeningTimeAsDate: Date;
    nextLightOnTimeAsDate: Date;
    nextDoorClosingTimeAsDate: Date;
}
export interface DoorStatus {
    status: string;
    timeStatusHasChanged: string;
    timeStatusHasChangedAsDate: Date;
}

@Injectable()
export class DoorService {
    constructor(private _httpClient: HttpClient, private _userService: UserService) {}

    getNextDoorClosingTime(user: User): Observable<any> {
        const closingTimeUrl = 'http://poulailler57.ddns.net:5780/scheduler/doorClosingTime';
        return this._httpClient
            .get(closingTimeUrl, { headers: this.getHeaders(user), responseType: 'text' as 'text' })
            .pipe(catchError(e => this.handleError(e)));
    }

    getNextDoorOpeningTime(user: User): Observable<any> {
        const closingTimeUrl = 'http://poulailler57.ddns.net:5780/scheduler/doorOpeningTime';
        return this._httpClient
            .get(closingTimeUrl, { headers: this.getHeaders(user), responseType: 'text' as 'text' })
            .pipe(catchError(e => this.handleError(e)));
    }

    getNextEvents(user: User): Observable<NextEvents> {
        const nextEventsUrl = 'http://poulailler57.ddns.net:5780/scheduler/nextEvents';
        return this._httpClient.get(nextEventsUrl, { headers: this.getHeaders(user) }).pipe(
            map((data: NextEvents) => {
                data.nextDoorOpeningTimeAsDate = new Date(data.nextDoorOpeningTime);
                data.nextLightOnTimeAsDate = new Date(data.nextLightOnTime);
                data.nextDoorClosingTimeAsDate = new Date(data.nextDoorClosingTime);
                return data;
            })
            // catchError(e => this.handleError(e))
        );
    }

    getDoorStatus(user: User): Observable<DoorStatus> {
        // APIService
        const nextEventsUrl = 'http://poulailler57.ddns.net:5780/door/status';
        return this._httpClient
            .get(nextEventsUrl, {
                headers: this.getHeaders(user),
            })
            .pipe(
                map((data: DoorStatus) => {
                    data.timeStatusHasChangedAsDate = new Date(data.timeStatusHasChanged);
                    return data;
                })
            );
    }

    private getHeaders(user: User) {
        console.log('récupération des paramètres.');
        console.log('les paramètres ont été récupérés.');
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
