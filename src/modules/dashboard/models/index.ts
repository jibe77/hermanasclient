export * from './dashboard.model';

export interface SocketResponse {
    type: 'SUCCESS' | 'ERROR';
    message: any;
}

export class WebSocketOptions {
    constructor(public brokerEndpoint: string) {}
}
