import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '@common/services';
import { User } from '@modules/auth/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FanStatus {
    statusEnum: string;
    timeOut: number;
}

@Injectable()
export class FanService extends AbstractService {
    constructor(private _httpClient: HttpClient) {
        super();
    }

    public getStatus(): Observable<FanStatus> {
        const musicStatusUrl = this.domainBase + '/fan/status';
        return this._httpClient.get(musicStatusUrl, { headers: this.getHeaders() }).pipe(
            map((data: FanStatus) => {
                return data;
            })
        );
    }

    public switch(param: boolean, user: User): Observable<any> {
        const musicStatusUrl = this.domainBase + '/fan/switch';
        return this._httpClient.get(musicStatusUrl + '?param=' + param, {
            headers: this.getHeadersWithAuth(user),
        });
    }
}
