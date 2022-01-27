import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { StompConfig } from '@stomp/stompjs';
import { Observable } from 'rxjs';

import { SocketResponse, WebSocketOptions } from '../models';

/**
 * A WebSocket service allowing subscription to a broker.
 */
@Injectable()
export class WebSocketService {
    private obsStompConnection: Observable<any>;
    private subscribers: Array<any> = [];
    private subscriberIndex = 0;
    private brokerURL = 'wss://poulailler57.ddns.net:5780/stomp';

    private stompConfig: StompConfig = {
        heartbeatIncoming: 0,
        heartbeatOutgoing: 20000,
        reconnectDelay: 10000,
        brokerURL: this.brokerURL,
        debug: str => {
            console.log(str);
        },
        webSocketFactory: () => {
            console.log('connect to stomp');
            return new WebSocket(this.brokerURL);
        },
    };

    constructor(
        private stompService: RxStompService,
        private updatedStompConfig: StompConfig,
        private options: WebSocketOptions
    ) {
        // Update StompJs configuration.
        this.stompConfig = { ...this.stompConfig, ...this.updatedStompConfig };
        // Initialise a list of possible subscribers.
        this.createObservableSocket();
        // Activate subscription to broker.
        this.connect();
    }

    private createObservableSocket = () => {
        this.obsStompConnection = new Observable(observer => {
            const subscriberIndex = this.subscriberIndex++;
            this.addToSubscribers({ index: subscriberIndex, observer });
            return () => {
                this.removeFromSubscribers(subscriberIndex);
            };
        });
    };

    private addToSubscribers = subscriber => {
        this.subscribers.push(subscriber);
    };

    private removeFromSubscribers = index => {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (i === index) {
                this.subscribers.splice(i, 1);
                break;
            }
        }
    };

    /**
     * Connect and activate the client to the broker.
     */
    private connect = () => {
        this.stompService.stompClient.configure(this.stompConfig);
        this.stompService.stompClient.onConnect = this.onSocketConnect;
        this.stompService.stompClient.onStompError = this.onSocketError;
        this.stompService.stompClient.activate();
    };

    /**
     * On each connect / reconnect, we subscribe all broker clients.
     */
    private onSocketConnect = () => {
        console.log('onConnection...');
        this.stompService.stompClient.subscribe(this.options.brokerEndpoint, this.socketListener);
    };

    private onSocketError = errorMsg => {
        console.log('Broker reported error: ' + errorMsg);

        const response: SocketResponse = {
            type: 'ERROR',
            message: errorMsg,
        };

        this.subscribers.forEach(subscriber => {
            subscriber.observer.error(response);
        });
    };

    private socketListener = frame => {
        this.subscribers.forEach(subscriber => {
            subscriber.observer.next(this.getMessage(frame));
        });
    };

    private getMessage = data => {
        const response: SocketResponse = {
            type: 'SUCCESS',
            message: JSON.parse(data.body),
        };
        return response;
    };

    /**
     * Return an observable containing a subscribers list to the broker.
     */
    public getObservable = () => {
        return this.obsStompConnection;
    };
}
