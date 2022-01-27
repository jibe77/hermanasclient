export * from './dashboard.model';

export class SocketResponse {}

export class WebSocketOptions {
    constructor(public brokerEndpoint: string) {}
}
