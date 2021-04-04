import { Injectable } from '@angular/core';
import { AbstractService } from '@modules/dashboard/services/abstract.service';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface CoopStatus {
    appliance: string;
    state: string;
}

@Injectable()
export class WebsocketService extends AbstractService {
    private serverUrl = this.domainBase + `/socket`;
    private stompClient;
    public mapEndpointSubscription: Map<string, any> = new Map();

    public async initWebSocket() {
        return new Promise<void>(resolve => {
            if (!this.stompClient) {
                const ws = new SockJS(this.serverUrl );
                this.stompClient = Stomp.over(ws);
                this.stompClient.connect({}, resolve);
            } else {
                resolve();
            }
        });
    }

    public async subscribe(name: string, fnc: (event) => void) {
        const subscription = this.stompClient.subscribe(`/${name}`, (event) => {
            fnc({ ...event, body: JSON.parse(event.body) });
        });
        this.mapEndpointSubscription.set(name, subscription);
    }

    public unsubscribeToWebSocketEvent(name: string) {
        const subscription = this.mapEndpointSubscription.get(name);
        if (subscription) {
            subscription.unsubscribe();
        }
    }

    public disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }
}
