import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '@common/services';
import { User } from '@modules/auth/models';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface LightStatus {
    statusEnum: string;
    timeOut: number;
}

@Injectable()
export class LightService extends AbstractService {
    constructor(private _httpClient: HttpClient) {
        super();
    }

    public getStatus(): Observable<LightStatus> {
        const musicStatusUrl = this.domainBase + '/light/status';
        return this._httpClient.get(musicStatusUrl, { headers: this.getHeaders() }).pipe(
            map((data: LightStatus) => {
                return data;
            })
        );
    }

    public switch(param: boolean, user: User): Observable<any> {
        const musicStatusUrl = this.domainBase + '/light/switch';
        return this._httpClient.get(musicStatusUrl + '?param=' + param, {
            headers: this.getHeadersWithAuth(user),
        });
    }
}
