import { Injectable } from '@angular/core';
import { AbstractService } from '@common/services';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable()
export class WebsocketService extends AbstractService {
    private serverUrl = this.domainBase + `/sockjs-node`;
    private stompClient;
    public mapEndpointSubscription: Map<string, any> = new Map();

    public async initWebSocket() {
        return new Promise<void>(resolve => {
            if (!this.stompClient) {
                this.stompClient = Stomp.over(function () {
                    return new SockJS(this.serverUrl);
                });
            }
            this.stompClient.connect({}, resolve);
        });
    }

    public async subscribe(name: string, fnc: (event) => void) {
        const subscription = this.stompClient.subscribe(`/${name}`, event => {
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
