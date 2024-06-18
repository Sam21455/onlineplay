# Spécification de la classe `GameWebSocket`

 Package
```java
package online.caltuli.webapp.websocket;
```

 Description
La classe `GameWebSocket` est un point de terminaison WebSocket qui facilite la communication en temps réel entre le serveur et les clients pour un jeu spécifique. Elle gère les sessions WebSocket, traite les messages entrants, et synchronise l'état du jeu entre tous les clients connectés.

 Dépendances
- `jakarta.enterprise.inject.spi.CDI`: Pour l'injection de dépendances.
- `jakarta.inject.Inject`: Pour l'injection de dépendances.
- `jakarta.json.JsonObject`: Pour la manipulation de messages JSON.
- `jakarta.websocket.*`: Pour la gestion des WebSocket.
- `online.caltuli.business.GameManager`: Pour la gestion des règles métier du jeu.
- `online.caltuli.model.*`: Pour les modèles de données du jeu.

 Attributs
- `sessions`: `Map<Integer, HashSet<Session>>` - Carte statique associant les identifiants de jeu aux sessions WebSocket.
- `currentModel`: Instance de `CurrentModel` pour accéder aux données de jeu actuelles.
- `gameManager`: Instance de `GameManager` pour gérer les opérations métier du jeu.
- `game`: Instance de `Game` pour représenter l'état actuel du jeu.
- `logger`: Instance de `Logger` pour le journalisation des événements.

 Constructeurs
- `public GameWebSocket()`: Constructeur par défaut.
- `public GameWebSocket(CurrentModel currentModel)`: Constructeur avec injection de dépendance pour `CurrentModel`.

 Méthodes

# Méthodes d'ouverture et de fermeture de session WebSocket
- `@OnOpen`: `public void onOpen(Session session, @PathParam("gameId") String gameId)`: Méthode appelée lorsqu'une nouvelle session WebSocket est ouverte.
  
- `@OnClose`: `public void onClose(Session session, CloseReason closeReason)`: Méthode appelée lorsqu'une session WebSocket est fermée.

# Méthodes de gestion des messages WebSocket
- `@OnMessage`: `public void onMessage(String message, Session session) throws IOException`: Méthode appelée lorsqu'un message est reçu sur le point de terminaison WebSocket.
  
# Méthodes privées de traitement des messages
- `private void handleColorGridUpdate(JsonObject jsonMessage)`: Méthode privée pour traiter les mises à jour de la grille de couleurs reçues des clients WebSocket.
  
- `private void handleMoveHistoryUpdate(int gameId)`: Méthode privée pour récupérer et envoyer l'historique des mouvements pour un jeu spécifié par `gameId` à tous les clients connectés.

# Méthodes utilitaires
- `private HashSet<Session> getSessionsRelatedToGameId(Integer gameId)`: Méthode pour récupérer toutes les sessions WebSocket associées à un `gameId`.

#### Exemple d'utilisation (très bref)

```java
// Exemple d'initialisation de GameWebSocket avec CurrentModel injecté
CurrentModel currentModel = CDI.current().select(CurrentModel.class).get();
GameWebSocket gameWebSocket = new GameWebSocket(currentModel);
```