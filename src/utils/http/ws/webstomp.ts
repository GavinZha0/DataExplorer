import { Client } from "@stomp/stompjs";
import { useUserStore } from '/@/store/modules/user';

let wsClient: any = null;
const wsPort = 9527;
const wsUri = "ws://" + window.location.hostname + ":" + wsPort + '/ws';

//initialize websocket
function initStomp(){
    // initialize websocket client with user id as token
    const userStore = useUserStore();
    const userId = userStore.getUserInfo?.id;
    wsClient = new Client({
        brokerURL: wsUri,
        connectHeaders: {uid: String(userId)},
        reconnectDelay: 5000
    });

    wsClient.onConnect = function (frame) {
        // Do something, all subscribes must be done is this callback
        // This is needed because this will be executed after a (re)connect
        console.info('stomp is connected!');
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
}

initStomp();

export{ wsClient }
