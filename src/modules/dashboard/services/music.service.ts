import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '@modules/dashboard/services/abstract.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
