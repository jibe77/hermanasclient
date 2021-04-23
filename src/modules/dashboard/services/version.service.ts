import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractService } from './abstract.service';

export interface VersionInfo {
    time: string;
    version: string;
    artifact: string;
    group: string;
    name: string;
}

@Injectable()
export class VersionService extends AbstractService {
    constructor(private _httpClient: HttpClient) {
        super();
    }

    public getVersionInfo(): Observable<VersionInfo> {
        return this._httpClient.get('https://poulailler58.ddns.net' + '/info', { headers: this.getHeaders() }).pipe(
                map((data: VersionInfo) => {
                    return data;
                })
            );
    }
}
