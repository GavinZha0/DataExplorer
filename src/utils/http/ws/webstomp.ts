import { Client } from "@stomp/stompjs";
import { useUserStore } from '/@/store/modules/user';

let wsClient: any = null;
const wsPort = 9527;
const wsUri = "ws://" + window.location.hostname + ":" + wsPort + '/ws';

//initialize websocket
export function createWebSocket(userId, channel, callback){
    if(wsClient!=null){
        // subscribe a channel when connected
        wsClient.subscribe(channel, callback);
        return wsClient;
    }
    // initialize websocket client with user id as token
    wsClient = new Client({
        brokerURL: wsUri,
        connectHeaders: {uid: String(userId)},
        reconnectDelay: 5000
    });

    wsClient.onConnect = function (frame) {
        // This is needed because this will be executed after a (re)connect
        console.info('websocket is connected!');
        // subscribe a channel when connected
        wsClient.subscribe(channel, callback);
    };

    wsClient.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    wsClient.activate();
    return wsClient;
}
