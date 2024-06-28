import { useSearchParams } from 'react-router-dom';
import styles from './chatroom.module.css'
import SockJS from 'sockjs-client';
import { useEffect } from 'react';
import { Client, Stomp } from '@stomp/stompjs';
import { useAuth } from '../../contexts/AuthProvider'

function ChatRoom() {

    let [searchParams, setSearchParams] = useSearchParams();
    const auth = useAuth()
    console.log(auth.getUserDetails())
    const ownerToken = searchParams.get('ownerToken');
    const uniqueChatID = searchParams.get('uniqueChatID');
    const serverPort = 'http://localhost:8080'

    useEffect(() => {
        const socket = new SockJS(`${serverPort}/chat`);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe(`topic/messages/${ownerToken}${uniqueChatID}`)
        })
        return () => {
            if (stompClient != null) {
                stompClient.disconnect();
            }
            console.log("Disconnected");
        }
        
    }, [ownerToken, uniqueChatID]);


    return (
        <div className={styles.container}>Welcome the owner of this chat is {ownerToken} and the uniqueChatID is {uniqueChatID}</div>
    )
}
export default ChatRoom