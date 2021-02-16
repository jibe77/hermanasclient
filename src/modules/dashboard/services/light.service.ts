import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '@modules/dashboard/services/abstract.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
