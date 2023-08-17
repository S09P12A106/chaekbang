package com.jsix.chaekbang.global.util;

import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

public class STOMPUtils {

    public static boolean isSTOMPConnectionRequest(StompHeaderAccessor accessor){
        StompCommand command = accessor.getCommand();
        if (command == null) {
            return false;
        }

        return command == StompCommand.CONNECT;
    }


    public static boolean isSTOMPDisconnectionRequest(StompHeaderAccessor accessor){
        StompCommand command = accessor.getCommand();
        if (command == null) {
            return false;
        }

        return command == StompCommand.DISCONNECT;
    }
}
