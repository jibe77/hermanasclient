import { Injectable } from '@angular/core';
import { RxStompConfig } from '@stomp/rx-stomp';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { SocketResponse, WebSocketOptions } from '../models';
import { RxStompService } from './rx-stomp.service';

/**
 * A WebSocket service allowing subscription to a broker.
 */
@Injectable()
export class WebSocketService {
    private obsStompConnection: Observable<SocketResponse>;
    private brokerURL = environment.wsUrl;

    private stompConfig: RxStompConfig = {
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
        private updatedStompConfig: RxStompConfig,
        private options: WebSocketOptions
    ) {
        // Update StompJs configuration.
        this.stompConfig = { ...this.stompConfig, ...this.updatedStompConfig };
        // Configure and activate subscription to broker.
        this.connect();
        // Create observable for messages and errors.
        this.createObservableSocket();
    }

    /**
     * Connect and activate the client to the broker.
     */
    private connect = () => {
        this.stompService.stompClient.configure(this.stompConfig);
        this.stompService.stompClient.activate();
    };

    /**
     * Create an observable that combines messages and errors from the STOMP connection.
     */
    private createObservableSocket = () => {
        // Subscribe to the broker endpoint using RxStomp's watch() method
        const messages$ = this.stompService.stompClient.watch(this.options.brokerEndpoint).pipe(
            map(frame => {
                const response: SocketResponse = {
                    type: 'SUCCESS',
                    message: JSON.parse(frame.body),
                };
                return response;
            })
        );

        // Subscribe to errors using RxStomp's stompErrors$ observable
        const errors$ = this.stompService.stompClient.stompErrors$.pipe(
            map(errorFrame => {
                console.log('Broker reported error: ' + errorFrame.headers['message']);
                const response: SocketResponse = {
                    type: 'ERROR',
                    message: errorFrame.headers['message'] || 'Unknown STOMP error',
                };
                return response;
            })
        );

        // Merge both streams into a single observable
        this.obsStompConnection = merge(messages$, errors$);
    };

    /**
     * Return an observable containing messages and errors from the broker.
     */
    public getObservable = (): Observable<SocketResponse> => {
        return this.obsStompConnection;
    };
}
