package ch.puzzle.bbt.puzzlescrumpoker;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class SocketHandler extends TextWebSocketHandler {

    private final PokerService pokerService;

    public SocketHandler(PokerService pokerService) {
        this.pokerService = pokerService;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        pokerService.handleIncomingTextMessage(session, message.getPayload());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        pokerService.handleClosedConnection(session);
    }
}
