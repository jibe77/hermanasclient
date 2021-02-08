import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@modules/auth/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractService } from './abstract.service';

export interface DoorStatus {
    status: string;
    timeStatusHasChanged: string;
    timeStatusHasChangedAsDate: Date;
}

@Injectable()
export class DoorService extends AbstractService {
    constructor(private _httpClient: HttpClient) {
        super();
    }

    public getDoorStatus(): Observable<DoorStatus> {
        const nextEventsUrl = this.domainBase + '/door/status';
        return this._httpClient
            .get(nextEventsUrl, {
                headers: this.getHeaders(),
            })
            .pipe(
                map((data: DoorStatus) => {
                    data.timeStatusHasChangedAsDate = new Date(data.timeStatusHasChanged);
                    return data;
                })
            );
    }

    public closeDoor(user: User) {
        const nextEventsUrl = this.domainBase + '/door/close';
        console.log('service close door', user.backEndUser, user.backEndPassword);
        return this._httpClient.get(nextEventsUrl, {
            headers: this.getHeadersWithAuth(user),
        });
    }

    public openDoor(user: User) {
        const nextEventsUrl = this.domainBase + '/door/open';
        console.log('service open door', user.backEndUser, user.backEndPassword);
        return this._httpClient.get(nextEventsUrl, {
            headers: this.getHeadersWithAuth(user),
        });
    }
}
