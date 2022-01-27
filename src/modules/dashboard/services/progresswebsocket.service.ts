import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { StompConfig } from '@stomp/stompjs';

import { WebSocketOptions } from '../models';

import { WebSocketService } from './websocket.service';

export const progressStompConfig: StompConfig = {
    webSocketFactory: () => {
        console.log('connect to stomp');
        return new WebSocket('wss://poulailler57.ddns.net:5780/stomp');
    },
};

@Injectable()
export class ProgressWebsocketService extends WebSocketService {
    constructor(stompService: RxStompService) {
        super(stompService, progressStompConfig, new WebSocketOptions('/topic/progress'));
    }
}
