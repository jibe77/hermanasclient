import { Injectable } from '@angular/core';
import { RxStompConfig } from '@stomp/rx-stomp';
import { environment } from '../../../environments/environment';

import { WebSocketOptions } from '../models';

import { RxStompService } from './rx-stomp.service';
import { WebSocketService } from './websocket.service';

export const progressStompConfig: RxStompConfig = {
    webSocketFactory: () => {
        console.log('connect to stomp');
        return new WebSocket(environment.wsUrl);
    },
};

@Injectable()
export class ProgressWebsocketService extends WebSocketService {
    constructor(stompService: RxStompService) {
        super(stompService, progressStompConfig, new WebSocketOptions('/topic/progress'));
    }
}
