import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { StompConfig } from '@stomp/stompjs';
import { environment } from '../../../environments/environment';

import { WebSocketOptions } from '../models';

import { WebSocketService } from './websocket.service';

export const progressStompConfig: StompConfig = {
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
