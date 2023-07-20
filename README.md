# Le jeu de la vie

Connaissez-vous le jeu de la vie ? C'est très simple !

## Explication

Une des façons les plus simples d'expliquer cet algorithme :

> Le Jeu de la vie est un automate cellulaire imaginé par John Horton Conway en 1970. Malgré des règles très simples, il est Turing-complet. C'est un jeu de simulation au sens mathématique. 

*- Wikipedia*

**Il y a plusieurs règles :**
- Les 'cellules' évoluent dans une grille en deux dimensions, dans la théorie infinie
- Chaque cellule possède un état : 'Vivante' ou 'Morte'
- À chaque génération, des cellules vont mourir et d'autres vont naitre.

Et comment elles évoluent, me direz vous...

**Il y a 3 solutions :**
- Si elle possède moins de deux cellules vivantes voisines, on est en sous-population: Elle meurt.
- Si elle possède plus de 3 cellules, on est dans un cas de surpopulation: Elle meurt
- Si elle possède entre deux et trois cellules voisines, elle reste en vie.
- Si une cellule morte a exactement trois cellules voisines vivantes, elle naît.

Par cellules voisines, on entend les 8 cellules autour d'elle, tel que :
```
1 | 0 | 1 | 0 | 0
1 | 1 | 1 | 1 | 0
0 | 0 | x | 0 | 0
0 | 1 | 0 | 1 | 0
0 | 1 | 1 | 1 | 0
```

Si nous cherchons les voisins de la cellule `x`, on aura :
```
1 | 1 | 1
0 | x | 0
1 | 0 | 1
```

Il y a 5 voisins, alors elle va mourir à la prochaine génération.

**C'est aussi simple ;)**

## Et quel est le but de ce depot Github ?

Faire le jeu de la vie, c'est marrant, mais pouvoir gérer les constantes… c'est encore mieux !!

**Actuellement, vous pouvez:**
- Voir l'évolution
- Observer le nombre de générations (mises à jour)
- Mettre en pause la partie
- Relancer la partie
- Réinitialiser la grille

### Quelques captures d'écrans :

> **Les boutons de gestion :**

![manage.png](screenshots%2Fmanage.png)

> **L'interface globale:**

![screen.png](screenshots%2Fscreen.png)

## L'installation

> Clonez le git:
```
git clone https://github.com/Sedorikku1949/Game_Of_Life.git
```

**Tout est fait !**

Vous pouvez :
- Utiliser ce code sur un site web
- Ouvrir la page html dans un navigateur
- L'insérer dans une API

**Si vous voulez le tester, ouvrez la page HTML sur votre navigateur favoris.**

Enjoy !