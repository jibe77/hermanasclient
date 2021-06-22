import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '@common/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MeteoInfo {
    temperature: number;
    externalTemperature: number;
    humidity: number;
    externalHumidity: number;
}

@Injectable()
export class MeteoService extends AbstractService {
    constructor(private _httpClient: HttpClient) {
        super();
    }

    public getMeteoInfo(): Observable<MeteoInfo> {
        return this._httpClient
            .get(this.domainBase + '/sensor/info', { headers: this.getHeaders() })
            .pipe(
                map((data: MeteoInfo) => {
                    return data;
                })
            );
    }
}
