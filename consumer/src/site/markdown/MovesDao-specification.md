# Spécification de l'interface `MovesDao`

L'interface `MovesDao` définit un contrat pour accéder et manipuler les données des mouvements (`Move`) associés à un jeu dans une application de jeu en ligne. Elle expose plusieurs méthodes permettant d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur les mouvements dans la base de données.

## Méthodes

1. **`addMove(int gameId, int userId, int number, int move) throws DaoException`**

   - **Description**:
     Cette méthode permet d'ajouter un nouveau mouvement (`Move`) associé à un jeu spécifié par `gameId` dans la base de données.

   - **Paramètres**:
     - `gameId` : Identifiant du jeu auquel le mouvement est associé.
     - `userId` : Identifiant de l'utilisateur effectuant le mouvement.
     - `number` : Numéro du mouvement.
     - `move` : Déplacement effectué.

   - **Exceptions**:
     - `DaoException` : Lancée en cas d'erreur lors de l'interaction avec la base de données.

   - **Retour**:
     - `Move` : Le mouvement ajouté à la base de données.

2. **`getMovesByGameId(int gameId) throws DaoException`**

   - **Description**:
     Cette méthode récupère tous les mouvements associés à un jeu spécifié par `gameId` depuis la base de données.

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

L'interface `MovesDao` est conçue pour être implémentée par des classes qui fournissent des méthodes spécifiques pour interagir avec la base de données et gérer les données relatives aux mouvements d'un jeu. Voici comment chaque méthode contribue au fonctionnement global :

- **`addMove(int gameId, int userId, int number, int move)`** : Cette méthode permet d'ajouter un nouveau mouvement à la base de données, en enregistrant les détails tels que l'identifiant du jeu, l'identifiant de l'utilisateur, le numéro du mouvement et le déplacement effectué.

- **`getMovesByGameId(int gameId)`** : Utilisée pour récupérer tous les mouvements associés à un jeu spécifique à partir de son identifiant `gameId`. Cette méthode est essentielle pour afficher l'historique des mouvements dans l'interface utilisateur ou pour toute logique de traitement basée sur les mouvements.

- **`getMoveById(int moveId)`** : Permet de récupérer un mouvement spécifique à partir de son identifiant unique `moveId`. Cela peut être utilisé pour afficher les détails d'un mouvement particulier ou pour toute autre manipulation nécessitant l'accès direct à un mouvement.

## Utilisation

L'interface `MovesDao` est utilisée dans le contexte d'une application de jeu en ligne où la gestion des mouvements des joueurs est cruciale pour suivre l'évolution du jeu et maintenir la cohérence des données entre les joueurs. Les méthodes définies dans cette interface offrent une abstraction claire pour l'accès aux données des mouvements, permettant ainsi une intégration facile avec différentes implémentations de base de données tout en garantissant la conformité aux exigences métier de l'application.