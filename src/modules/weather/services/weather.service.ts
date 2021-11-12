import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '@common/services';
import { MeteoInfo } from '@modules/dashboard/services';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService extends AbstractService {
    constructor(private _httpClient: HttpClient) {
        super();
    }

    public getWeek(): Observable<MeteoInfo[]> {
        return this._httpClient
            .get(this.domainBase + '/sensor/history/week', { headers: this.getHeaders() })
            .pipe(
                map((data: MeteoInfo[]) => {
                    return data;
                })
            );
    }
}
