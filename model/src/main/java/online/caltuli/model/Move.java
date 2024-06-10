package online.caltuli.model;

public class Move {

    private int id;
    private int gameId;
    private int userId;
    private int number;
    private int playedColumn;

    public Move() {}

    public Move(int id, int gameId, int userId, int number, int playedColumn) {
        this.id = id;
        this.gameId = gameId;
        this.userId = userId;
        this.number = number;
        this.playedColumn = playedColumn;
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public int getGameId() {
        return gameId;
    }

    public int getNumber() {
        return number;
    }

    public int getPlayedColumn() {
        return playedColumn;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setPlayedColumn(int playedColumn) {
        this.playedColumn = playedColumn;
    }

}

