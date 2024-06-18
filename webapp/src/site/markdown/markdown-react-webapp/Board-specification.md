# Spécification du Composant Board

Le composant Board représente le plateau de jeu pour le jeu Puissance 4. Il affiche une grille de Cellules interactives où les joueurs peuvent effectuer leurs mouvements.

---

## Description
Le composant Board est responsable de l'affichage visuel du plateau de jeu Puissance 4. Il gère l'affichage des Cellules et leur interaction avec les joueurs via des clics.

## Propriétés (Props)

- **colorsGrid** : (object) Un dictionnaire représentant l'état actuel de la grille de jeu avec les couleurs des Cellules.
- **handlePlay** : (function) Fonction de callback appelée lorsqu'un joueur clique sur une Cellule pour effectuer un mouvement.
- **playerId** : (string) L'identifiant unique du joueur actuellement connecté.
- **gameState** : (string) L'état actuel du jeu, utilisé pour déterminer le tour des joueurs.
- **firstPlayerId** : (string) L'identifiant du premier joueur.
- **secondPlayerId** : (string | null) L'identifiant du deuxième joueur s'il est présent, sinon null.

## Comportement

- Affiche une grille de Cellules interactives.
- Chaque Cellule peut être cliquée par les joueurs pour effectuer un mouvement.
- Le composant réagit aux changements dans `colorsGrid` pour mettre à jour l'affichage des Cellules.
- Détecte quel joueur est actuellement en train de jouer en fonction de `playerId` et `gameState`.
- Applique des styles différents aux Cellules pour indiquer si elles sont jouables ou non en fonction du tour du joueur.

## Exemple d'Utilisation

```jsx
<Board
  colorsGrid={/* Dictionnaire représentant l'état de la grille */}
  handlePlay={/* Fonction de gestion du coup joué */}
  playerId="player1"
  gameState="WAIT_FIRST_PLAYER_MOVE"
  firstPlayerId="player1"
  secondPlayerId="player2"
/>
```

Dans cet exemple, le composant Board est configuré pour afficher la grille de jeu avec les couleurs spécifiées dans `colorsGrid`. Il utilise `handlePlay` pour gérer les clics des joueurs, et les propriétés `playerId`, `gameState`, `firstPlayerId`, et `secondPlayerId` pour déterminer l'état du jeu et le tour des joueurs.

## Styles (Board.css)

Le fichier Board.css définit les styles visuels du composant Board pour assurer une présentation cohérente et attrayante du plateau de jeu Puissance 4. Les styles incluent des dimensions, des marges, des bordures, et des effets de transition pour améliorer l'expérience utilisateur.

```css
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 480px;
  height: 420px;
  border-radius: 10%;
  border: 1px solid grey;
  background-color: rgb(0, 153, 255);
  box-shadow: inset 0 -10px 0 grey;
}

.row {
  display: flex;
}

.cell {
  width: 50px;
  height: 50px;
  margin: 5px;
  border: 1px solid darkgray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: inset 0 5px 0 grey;
}

.cell.null {
  background-color: #fff;
}

.cell:hover {
  background-color: lightgray;
}

.cell.red {
  background-color: rgb(255, 51, 51);
  box-shadow: inset 0 0px 0;
}

.cell.green {
  background-color: rgb(153, 255, 102);
  box-shadow: inset 0 0px 0;
}
```