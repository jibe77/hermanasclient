import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@modules/auth/models';
import { AbstractService } from '@modules/dashboard/services/abstract.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface MusicStatus {
    statusEnum: string;
    timeOut: number;
}

@Injectable()
export class MusicService extends AbstractService {
    constructor(private _httpClient: HttpClient) {
        super();
    }

    public getStatus(): Observable<MusicStatus> {
        const musicStatusUrl = this.domainBase + '/music/status';
        return this._httpClient.get(musicStatusUrl, { headers: this.getHeaders() }).pipe(
            map((data: MusicStatus) => {
                return data;
            })
        );
    }

    public switch(param: boolean, user: User): Observable<any> {
        const musicStatusUrl = this.domainBase + '/music/switch';
        return this._httpClient.get(musicStatusUrl + '?param=' + param, {
            headers: this.getHeadersWithAuth(user),
        });
    }
}
