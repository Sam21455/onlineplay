package online.caltuli.consumer.dao.implementations;

import jakarta.enterprise.inject.spi.CDI;
import jakarta.inject.Inject;
import online.caltuli.consumer.dao.DaoFactory;
import online.caltuli.consumer.dao.exceptions.DaoException;
import online.caltuli.consumer.dao.interfaces.MovesDao;
import online.caltuli.model.Move;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class MovesDaoImpl implements MovesDao {

    private final DaoFactory daoFactory;
    private final Logger logger = LogManager.getLogger(MovesDaoImpl.class);

    @Inject
    public MovesDaoImpl(DaoFactory daoFactory) {
        this.daoFactory = daoFactory;
    }

    @Override
    public Move addMove(int gameId, int userId, int number, int moveDetail) throws DaoException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet generatedKeys = null;
        Move move = null;

        try {
            connection = daoFactory.getConnection();
            preparedStatement = connection.prepareStatement(
                    "INSERT INTO moves (game_id, user_id, number, move) VALUES (?, ?, ?, ?);",
                    Statement.RETURN_GENERATED_KEYS
            );
            preparedStatement.setInt(1, gameId);
            preparedStatement.setInt(2, userId);
            preparedStatement.setInt(3, number);
            preparedStatement.setInt(4, moveDetail);

            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows > 0) {
                generatedKeys = preparedStatement.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    move = new Move(id, gameId, userId, number, moveDetail);
                }
            }

            connection.commit();
        } catch (SQLException e) {
            try {
                if (connection != null) {
                    connection.rollback();
                }
            } catch (SQLException rollbackEx) {
                logger.error("Failed to rollback transaction after error in addMove: ", rollbackEx);
            }
            logger.error("Error adding move to database: ", e);
            throw new DaoException("Failed to add move due to database error.");
        } finally {
            try {
                if (generatedKeys != null) {
                    generatedKeys.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                logger.error("Failed to close resources in addMove: ", e);
                throw new DaoException("Failed to close database resources.");
            }
        }
        return move;
    }

    @Override
    public List<Move> getMovesByGameId(int gameId) throws DaoException {
        List<Move> moves = new ArrayList<>();
        String sql = "SELECT id, game_id, user_id, number, move FROM moves WHERE game_id = ? ORDER BY number ASC";
        try (Connection connection = daoFactory.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, gameId);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Move move = new Move();
                    move.setId(resultSet.getInt("id"));
                    move.setGameId(resultSet.getInt("game_id"));
                    move.setUserId(resultSet.getInt("user_id"));
                    move.setNumber(resultSet.getInt("number"));
                    move.setPlayedColumn(resultSet.getInt("move"));
                    moves.add(move);
                }
            }
        } catch (SQLException e) {
            logger.error("Error fetching moves for game ID {}: ", gameId, e);
            throw new DaoException("Failed to fetch moves for game ID ");
        }
        return moves;
    }

    @Override
    public Move getMoveById(int moveId) throws DaoException {
        Move move = null;
        String sql = "SELECT id, game_id, user_id, number, move FROM moves WHERE id = ?";
        try (Connection connection = daoFactory.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, moveId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    move = new Move();
                    move.setId(resultSet.getInt("id"));
                    move.setGameId(resultSet.getInt("game_id"));
                    move.setUserId(resultSet.getInt("user_id"));
                    move.setNumber(resultSet.getInt("number"));
                    move.setPlayedColumn(resultSet.getInt("move"));
                }
            }
        } catch (SQLException e) {
            logger.error("Error fetching move with ID {}: ", moveId, e);
            throw new DaoException("Failed to fetch move with ID ");
        }
        return move;
    }
}
