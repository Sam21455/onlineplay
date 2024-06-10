package online.caltuli.business;

import online.caltuli.business.exception.BusinessException;
import online.caltuli.consumer.dao.DaoFactory;
import online.caltuli.consumer.dao.exceptions.DaoException;
import online.caltuli.consumer.dao.interfaces.MovesDao;
import online.caltuli.model.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.sql.Timestamp;
import java.util.List;

public class GameManager {

    private Game game;
    private EvolutiveGridParser egp;
    private final MovesDao movesDao;


    public GameManager(Game game) {
        this.game = game;
        this.egp = new EvolutiveGridParser();
        try {
            this.movesDao = DaoFactory.getInstance().getMovesDao();
        } catch (DaoException e) {
            try {
                throw new BusinessException("Can't register connection in database.");
            } catch (BusinessException ex) {
                throw new RuntimeException(ex);
            }
        }
    }

    public boolean isLegalMove(int column) {
        return egp.getNextLine()[column] != 6;
    }

    private void updateGameWithMove(Coordinates coordinatesPlayed) {
        // game.colorsGrid update
        game.setColorWithCoordinates(
                coordinatesPlayed,
                (game.getGameState() == GameState.WAIT_FIRST_PLAYER_MOVE) ?
                    CellState.RED
                    :
                    CellState.GREEN
        );

        // game.gameState update
        game.setGameState(
                (game.getGameState() == GameState.WAIT_FIRST_PLAYER_MOVE) ?
                        GameState.WAIT_SECOND_PLAYER_MOVE
                        :
                        GameState.WAIT_FIRST_PLAYER_MOVE
        );
        if (egp.detectDraw()) {
            game.setGameState(GameState.DRAW);
        }
        CellState color = egp.detectWinningColor();
        if (color == CellState.RED) {
            game.setGameState(GameState.FIRST_PLAYER_WON);
        }
        if (color == CellState.GREEN) {
            game.setGameState(GameState.SECOND_PLAYER_WON);
        }

        // Enregistre les mouvements dans la base de données.
        // TODO : créer une méthode à part pour gérer l'enregistrement dans la base de données "Moves"
        try {
            // addMove(int gameId, int userId, int number, int move)
            movesDao.addMove(game.getId(), game.getFirstPlayer().getId(), coordinatesPlayed.getX(), coordinatesPlayed.getY());
        } catch (DaoException e) {
            e.printStackTrace(); // Handle exception appropriately
        }
    }


    public Coordinates playMove(int column) throws BusinessException {
        if (!isLegalMove(column)) {
                throw new BusinessException(
                        "Illegal move : Column " + column + " is full." );
        }
        else  {
            Coordinates coordinatesPlayed = egp.updateWithMove(column);
            updateGameWithMove(coordinatesPlayed);
            return coordinatesPlayed;
        }
    }

    public void switchPlayer() {
        Player playerMemory = game.getSecondPlayer();
        game.setSecondPlayer(game.getFirstPlayer());
        game.setFirstPlayer(playerMemory);
    }

    public List<Move> getMovesForGame(int gameId) throws BusinessException {
        try {
            return movesDao.getMovesByGameId(gameId);
        } catch (DaoException e) {
            throw new BusinessException("Failed to retrieve moves for game " + gameId);
        }
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public EvolutiveGridParser getEgp() {
        return egp;
    }

    public void setEgp(EvolutiveGridParser egp) {
        this.egp = egp;
    }
}
