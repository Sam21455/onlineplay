# Spécification de la classe `GameWebSocket`

La classe `GameWebSocket` est une classe Java qui agit comme un point de terminaison WebSocket pour gérer la communication en temps réel entre les clients et le serveur pour un jeu spécifique. Elle utilise les annotations de Jakarta WebSocket pour définir le chemin du point de terminaison et écouter les événements WebSocket tels que l'ouverture, la réception de messages, la fermeture et les erreurs.

## Fonctionnalités principales

1. **Gestion des Sessions WebSocket**
   - La classe maintient une carte statique `sessions` qui associe les identifiants de jeu (`gameId`) à un ensemble de sessions WebSocket. Cela permet de gérer les connexions multiples des clients au jeu spécifique.

2. **Initialisation et Gestion des Sessions**
   - **`onOpen(Session session, @PathParam("gameId") String gameId)`** : Méthode appelée lorsque qu'une nouvelle session WebSocket est ouverte. Elle enregistre la session dans la carte `sessions` associée à un jeu spécifique identifié par `gameId`.

   - **`onMessage(String message, Session session)`** : Méthode appelée lorsqu'un message est reçu sur le point de terminaison WebSocket. Elle analyse et traite le message JSON reçu pour effectuer des actions spécifiques telles que la mise à jour de la grille de couleurs, l'envoi d'historique des mouvements et la gestion de l'état du jeu.

   - **`onClose(Session session, CloseReason closeReason)`** : Méthode appelée lorsqu'une session WebSocket est fermée. Elle supprime la session de la carte `sessions` associée au jeu, garantissant ainsi que les ressources sont libérées correctement.

   - **`onError(Session session, Throwable throwable)`** : Méthode appelée en cas d'erreur survenue dans la session WebSocket. Elle enregistre les erreurs pour le débogage et la gestion des exceptions.

3. **Méthodes de Traitement des Messages**
   - **`handleColorGridUpdate(JsonObject jsonMessage)`** : Méthode privée pour traiter les mises à jour de la grille de couleurs reçues des clients WebSocket. Elle extrait les informations nécessaires du message JSON, effectue les validations nécessaires et envoie les mises à jour à tous les clients connectés.

   - **`handleMoveHistoryUpdate(int gameId)`** : Méthode privée pour récupérer et envoyer l'historique des mouvements pour un jeu spécifié par `gameId` à tous les clients connectés. Elle transforme les données en format JSON approprié avant de les envoyer.

4. **Utilisation de Jakarta EE et Dépendances**
   - La classe utilise les annotations de Jakarta EE (`@ServerEndpoint`, `@OnOpen`, `@OnMessage`, `@OnClose`, `@OnError`) pour définir et gérer le point de terminaison WebSocket, ainsi que l'injection de dépendance CDI (`@Inject`) pour obtenir les ressources nécessaires telles que `GameManager` et `CurrentModel`.

5. **Gestion des Erreurs**
   - La classe gère les exceptions spécifiques (`DaoException`, autres exceptions SQL) liées à l'accès aux données et à la gestion des sessions WebSocket. Elle utilise `try-catch` pour capturer les exceptions et journalise les erreurs pour le suivi et le débogage.

## Utilisation

La classe `GameWebSocket` est utilisée dans le cadre d'une application web en temps réel pour gérer la communication bidirectionnelle entre le serveur et les clients via WebSocket. Elle est cruciale pour synchroniser l'état du jeu, diffuser les mises à jour en temps réel aux joueurs et maintenir la cohérence des données entre les clients connectés.

Elle facilite la gestion de plusieurs sessions WebSocket pour un jeu spécifique et permet aux clients d'interagir simultanément avec le jeu, en envoyant des mouvements, en recevant des mises à jour de l'état du jeu et en affichant l'historique des mouvements.