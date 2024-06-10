package online.caltuli.consumer.dao.interfaces;

import online.caltuli.consumer.dao.exceptions.DaoException;
import online.caltuli.model.Move;
import java.util.List;

public interface MovesDao {

    Move addMove(int gameId, int userId, int number, int move) throws DaoException;

    List<Move> getMovesByGameId(int gameId) throws DaoException;

    Move getMoveById(int moveId) throws DaoException;
}
