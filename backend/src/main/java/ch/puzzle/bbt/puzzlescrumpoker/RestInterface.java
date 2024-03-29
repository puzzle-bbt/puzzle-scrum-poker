package ch.puzzle.bbt.puzzlescrumpoker;

import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Player;
import ch.puzzle.bbt.puzzlescrumpoker.models.PlayerModel;
import ch.puzzle.bbt.puzzlescrumpoker.models.RoundInfoModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RestInterface {
    private static final Logger LOG = LoggerFactory.getLogger(RestInterface.class);

    private final PokerService pokerService;

    public RestInterface(PokerService pokerService) {
        this.pokerService = pokerService;
    }

    @GetMapping("/createTablemaster/{name}")
    public PlayerModel createTablemaster(@PathVariable(value="name") String name) {
        LOG.info("createTablemaster is called: /tablemaster/{}", name);
        try {
            List<Object> ids = pokerService.addNewTable(name);
            return new PlayerModel(ids.get(0).toString(), ids.get(1).toString(), name, null, pokerService.isGameRunning(ids.get(0).toString()));
        } catch (Exception e) {
            LOG.error("createTablemaster has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/createPlayer/{name}/{table}")
    public PlayerModel createPlayer(@PathVariable(value="name") String name, @PathVariable(value="table") String gamekey) {
        LOG.info("createPlayer is called: /createPlayer/{}/{}", name, gamekey);
        try {
            String playerid = Long.toString(pokerService.addNewPlayer(name, gamekey));
            return new PlayerModel(gamekey, playerid, name, null, pokerService.isGameRunning(gamekey));
        } catch (Exception e) {
            LOG.error("createPlayer has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @GetMapping("/players/setselectedcard/{gamekey}/{playerid}/{selectedCard}")
    public String setSelectedCard(@PathVariable(value= "gamekey") String gamekey, @PathVariable(value="playerid") int playerid, @PathVariable(value="selectedCard") String selectedCard){
        LOG.info("setSelectedCard is called: /players/setselectedcard/{}/{}/{}", gamekey, playerid, selectedCard);
        try {
            if("question-mark".equals(selectedCard)) {
                pokerService.setSelectedCard(gamekey, playerid, "?");
                return "";
            }
            pokerService.setSelectedCard(gamekey, playerid, selectedCard);

            return pokerService.getSelectedCard(gamekey, playerid);
        } catch (Exception e) {
            LOG.error("setSelectedCard has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/players/setplayermode/{gamekey}/{playerid}/{isPlaying}")
    public void setPlayerMode(@PathVariable(value= "gamekey") String gamekey, @PathVariable(value="playerid") long playerid, @PathVariable(value="isPlaying") boolean isPlaying){
        LOG.info("setPlayerMode is called: /players/setplayermode/{}/{}/{}", gamekey, playerid, isPlaying);
        try {
            pokerService.setPlayerMode(gamekey, playerid, isPlaying);
        } catch (Exception e) {
            LOG.error("setPlayerMode has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/players/getplayermode/{gamekey}/{playerid}")
    public boolean getPlayerMode(@PathVariable(value= "gamekey") String gamekey, @PathVariable(value="playerid") long playerid){
        LOG.info("getPlayerMode is called: /players/getplayermode/{}/{}", gamekey,  playerid);
        try {
            return pokerService.getPlayerMode(gamekey, playerid);
        } catch (Exception e) {
            LOG.error("getPlayerMode has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }

    @GetMapping("/average/{gamekey}")
    public double getAverage(@PathVariable(value= "gamekey") String gamekey){
        LOG.info("getAverage is called: /average/{}", gamekey);
        try {
            return pokerService.getAverage(gamekey);
        } catch (Exception e) {
            LOG.error("getAverage has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/tables/offboarding/{gamekey}/{playerid}/{isTablemaster}")
    public void offboardingPlayer(@PathVariable(value="gamekey") String gamekey, @PathVariable(value="playerid") long playerid, @PathVariable(value="isTablemaster") boolean isTablemaster){
        LOG.info("offboarding is called: /tables/offboarding/{}/{}/{}", gamekey, playerid, isTablemaster);
        try {
            pokerService.offboarding(gamekey, playerid, isTablemaster);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/tables/kickplayer/{gamekey}/{playerid}")
    public void kickPlayer(@PathVariable(value="gamekey") String gamekey, @PathVariable(value="playerid") long playerid){
        LOG.info("kickPlayer is called: /tables/kickplayer/{}/{}", gamekey, playerid);
        try {
            pokerService.kickPlayer(gamekey, playerid);
        } catch (Exception e) {
            LOG.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/tablelist")
    public PokerService showList(){
        LOG.info("showList is called: /tablelist");
        try {
            return pokerService;
        } catch (Exception e) {
            LOG.error("showList has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/tables/getplayers/{gamekey}")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Player> getPlayersFromTable(@PathVariable(value= "gamekey") String gamekey){
        LOG.info("getPlayersFromTable is called: /tables/getplayers/{}", gamekey);
        try {
            return pokerService.getPlayersFromTable(gamekey);
        } catch (Exception e) {
            LOG.error("getPlayersFromTable has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/tables/gameover/{gamekey}")
    public void gameOver(@PathVariable(value= "gamekey") String gamekey) {
        LOG.info("gameOver is called: /tables/gameover/{}", gamekey);
        try {
            pokerService.gameOver(gamekey);
        } catch (Exception e) {
            LOG.error("gameOver has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/tables/gameStart/{gamekey}")
    public void gameStart(@PathVariable(value= "gamekey") String gamekey) {
        LOG.info("gameStart is called: /tables/gameStart/{}", gamekey);
        try {
            pokerService.gameStart(gamekey);

        } catch (Exception e) {
            LOG.error("gameStart has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/tables/setroundname/{gamekey}/{roundname}")
    public void setRoundName(@PathVariable(value= "gamekey") String gamekey, @PathVariable(value = "roundname") String roundName) {
        LOG.info("setRoundName is called: /tables/setroundname/{}/{}", gamekey, roundName);
        try {
            pokerService.setRoundName(gamekey, roundName);
        } catch (Exception e) {
            LOG.error("setRoundName has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/tables/getroundname/{gamekey}")
    public RoundInfoModel getRoundName(@PathVariable(value= "gamekey") String gamekey) {
        LOG.info("getRoundName is called: /tables/getroundname/{}", gamekey);
        try {
            return new RoundInfoModel(pokerService.getRoundName(gamekey), "");
        } catch (Exception e) {
            LOG.error("getRoundName has failed: ", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}