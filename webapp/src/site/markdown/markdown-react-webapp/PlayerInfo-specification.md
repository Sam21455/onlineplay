# Spécification du Composant PlayerInfo

## Description
Le composant PlayerInfo affiche les informations relatives aux joueurs d'un jeu, y compris leurs noms et l'indicateur du tour de jeu.

## Propriétés (Props)

- **player1** : (string) Le nom du premier joueur.
- **player2** : (string) Le nom du deuxième joueur.
- **isPlayer1Turn** : (boolean) Indique si c'est le tour du premier joueur.
- **isPlayer2Turn** : (boolean) Indique si c'est le tour du deuxième joueur.

## Comportement

- Affiche deux carrés représentant les joueurs avec leur nom.
- Met en surbrillance visuellement le carré du joueur dont c'est le tour.
- Les carrés sont stylisés différemment pour indiquer le joueur actif.
- Les noms des joueurs peuvent être longs, mais le composant gère l'affichage de manière à éviter le débordement.

## Exemple d'Utilisation

```jsx
<PlayerInfo
  player1="Alice"
  player2="Bob"
  isPlayer1Turn={true}
  isPlayer2Turn={false}
/>
```

Dans cet exemple, le composant affiche le nom "Alice" dans le premier carré avec une indication visuelle que c'est son tour de jouer, tandis que le deuxième carré affiche le nom "Bob" avec une indication visuelle que ce n'est pas son tour.

## Styles

Le composant utilise les styles définis dans le fichier PlayerInfo.css pour afficher les carrés des joueurs de manière attrayante et fonctionnelle.