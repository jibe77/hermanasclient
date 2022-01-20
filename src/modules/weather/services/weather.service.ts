import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from '@common/services';
import { MeteoInfo } from '@modules/dashboard/services';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService extends AbstractService {
    pageSize = 10; // TODO : use this parameter
    page = 1; // TODO : use this parameter
    sortColumn: string; // TODO : use this parameter
    sortDirection: 'asc' | 'desc' | ''; // TODO : use this parameter
    total$: Observable<number>; // TODO : use this parameter
    searchTerm: string; // TODO : remove this parameter
    private _loading$ = new BehaviorSubject<boolean>(true);
    constructor(private _httpClient: HttpClient) {
        super();
    }

    public getToday(): Observable<MeteoInfo[]> {
        this._loading$.next(true);
        const info = this._httpClient
            .get(this.domainBase + '/sensor/history/week', { headers: this.getHeaders() })
            // .get('assets/weather/historyToday.json')
            .pipe(
                map((data: MeteoInfo[]) => {
                    return data;
                })
            );
        this._loading$.next(false);
        return info;
    }

    public getWeek(): Observable<MeteoInfo[]> {
        this._loading$.next(true);
        const info = this._httpClient
            .get(this.domainBase + '/sensor/history/week', { headers: this.getHeaders() })
            // .get('assets/weather/historyWeek.json')
            .pipe(
                map((data: MeteoInfo[]) => {
                    return data;
                })
            );
        this._loading$.next(false);
        return info;
    }

    public getInfoUsingDateRange(from: string, to: string): Observable<MeteoInfo[]> {
        return (
            this._httpClient
                .get(this.domainBase + '/sensor/history/' + from + '/' + to, {
                    headers: this.getHeaders(),
                })
                // .get('assets/weather/historyFromTo.json')
                .pipe(
                    map((data: MeteoInfo[]) => {
                        return data;
                    })
                )
        );
    }

    get loading$() {
        return this._loading$.asObservable();
    }
}
