package ch.puzzle.bbt.puzzlescrumpoker;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    PokerService pokerService;
    public WebSocketConfig(PokerService pokerService) {
        this.pokerService = pokerService;
    }

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new SocketHandler(pokerService), "/api/ws").setAllowedOrigins("*");
    }
}
