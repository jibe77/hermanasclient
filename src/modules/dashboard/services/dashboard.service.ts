import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) {}

    getDashboard$(): Observable<{}> {
        return of({});
    }
}
