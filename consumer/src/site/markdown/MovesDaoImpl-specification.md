# Spécification de l'implémentation `MovesDaoImpl`

L'implémentation `MovesDaoImpl` est responsable de l'accès et de la manipulation des données relatives aux mouvements (`Move`) dans une base de données relationnelle. Elle implémente l'interface `MovesDao` et fournit des méthodes pour ajouter, récupérer et manipuler les informations sur les mouvements.

## Méthodes

1. **`addMove(int gameId, int userId, int number, int moveDetail) throws DaoException`**

   - **Description**:
     Cette méthode permet d'ajouter un nouveau mouvement (`Move`) associé à un jeu spécifié par `gameId` dans la base de données. Elle insère les détails du mouvement tels que l'identifiant du jeu, l'identifiant de l'utilisateur, le numéro du mouvement et le détail du mouvement.

   - **Paramètres**:
     - `gameId` : Identifiant du jeu auquel le mouvement est associé.
     - `userId` : Identifiant de l'utilisateur effectuant le mouvement.
     - `number` : Numéro du mouvement.
     - `moveDetail` : Détail spécifique du mouvement effectué.

   - **Exceptions**:
     - `DaoException` : Lancée en cas d'erreur lors de l'interaction avec la base de données.

   - **Retour**:
     - `Move` : Le mouvement ajouté à la base de données.

2. **`getMovesByGameId(int gameId) throws DaoException`**

   - **Description**:
     Cette méthode récupère tous les mouvements associés à un jeu spécifié par `gameId` depuis la base de données. Les mouvements sont triés par numéro de mouvement (`number`) en ordre ascendant.

   - **Paramètres**:
     - `gameId` : Identifiant du jeu pour lequel récupérer les mouvements.

   - **Exceptions**:
     - `DaoException` : Lancée en cas d'erreur lors de l'interaction avec la base de données.

   - **Retour**:
     - `List<Move>` : Liste contenant tous les mouvements associés au jeu spécifié par `gameId`.

3. **`getMoveById(int moveId) throws DaoException`**

   - **Description**:
     Cette méthode récupère un mouvement spécifié par son identifiant unique `moveId` depuis la base de données.

   - **Paramètres**:
     - `moveId` : Identifiant unique du mouvement à récupérer.

   - **Exceptions**:
     - `DaoException` : Lancée en cas d'erreur lors de l'interaction avec la base de données.

   - **Retour**:
     - `Move` : Le mouvement correspondant à l'identifiant `moveId`.

## Fonctionnement

L'implémentation `MovesDaoImpl` utilise des requêtes SQL pour interagir avec la base de données et effectuer les opérations CRUD sur les mouvements. Voici comment chaque méthode contribue au fonctionnement global :

- **`addMove(int gameId, int userId, int number, int moveDetail)`** : Cette méthode insère un nouveau mouvement dans la table `moves` de la base de données. Elle récupère également l'ID généré automatiquement pour le nouveau mouvement et retourne un objet `Move` représentant ce mouvement ajouté.

- **`getMovesByGameId(int gameId)`** : Utilisée pour récupérer tous les mouvements associés à un jeu spécifique à partir de son identifiant `gameId`. Les résultats sont triés par ordre croissant du numéro de mouvement (`number`). Cette méthode est essentielle pour afficher l'historique des mouvements dans l'interface utilisateur ou pour toute logique de traitement basée sur les mouvements.

- **`getMoveById(int moveId)`** : Permet de récupérer un mouvement spécifique à partir de son identifiant unique `moveId`. Cela peut être utilisé pour afficher les détails d'un mouvement particulier ou pour toute autre manipulation nécessitant l'accès direct à un mouvement.

## Utilisation

L'implémentation `MovesDaoImpl` est utilisée dans le contexte d'une application Java EE où la gestion des données des mouvements des joueurs est cruciale pour suivre l'évolution du jeu et maintenir la cohérence des données entre les joueurs. Elle utilise des connexions JDBC pour interagir avec la base de données et gère les exceptions liées à la base de données à l'aide de blocs try-catch. Cette implémentation fournit une abstraction claire pour l'accès aux données des mouvements et peut être intégrée avec différents systèmes de gestion de base de données relationnelles (SQL) pris en charge par JDBC.