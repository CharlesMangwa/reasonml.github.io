---
title: Blog
order: 0
---

### Reason 3

*27 octobre 2017*

J'écris ce post tout en étant assis, par le plus grand des hasards, à côté du manager de l'équipe Reason, qui est entrain d'essayer la nouvelle syntaxe Reason. Sa première impression a été : "C'est exactement comme ça que je pense que ça devrait marcher !". Je pense que cette remarque a elle seule a rendu tous nos efforts valables.

Raison 3 est principalement le travail de [Fred](https://github.com/let-def), le mainteneur de Merlin (oui, _ce_ [Merlin](https://github.com/ocaml/merlin)), [Iwan](https://github.com/iwankaramazow) et [Jared](https://github.com/jaredly), au cours des six derniers mois. La release contient _beaucoup_ de changements sous le capot, dont la plupart, nous l'espérons, vous resteront invisibles et vous feront parfois vous dire : «Oui, c'est comme _ça_ que je pense que ça devrait marcher».


Les changements d'infra n'auraient pas eu lieu sans une coopération étroite de personnes des communautés OCaml et JavaScript. Nous sommes _vraiment_ très reconnaissants pour tout le soutien que nous avons reçu. Merci beaucoup.

**Points principaux** :

- [Voici à quoi ça ressemble](https://github.com/reasonml-community/reason-react-example/commit/3640ce6bb6729c3b3d8a0c200a624996f8da8beb).
- Plus de 100 problèmes d'analyse et de printing corrigés ! Le nombre total d'issues ouvertes est passé de près de 500 à moins de 300.
- Nouvelle infro de  messages d'erreur, par Fred. Cela résout beaucoup de pain points existants avec les rapports d'erreur de refmt : mots-clés réservés, point-virgule manquant, etc. Plus à venir ! **S'il vous plaît, laissez un petit message sympathique à Fred sur son [Twitter](https://twitter.com/let_def)**. Montrez-lui que la communauté JavaScript apprécie son aide.
- Unification de `[@foo]`, `[@@foo]` et `[@@@foo]` en `[@foo]`. Argument labelisé + punning de type, sucre syntaxique de type d'objet JavaScript `{. "foo": string}`, la concaténation de string se fait maintenant via `++`, tweaks de formattage d'opérateurs infixes, etc.
- Nous avons maintenant exposé des [API dédiées](https://github.com/facebook/reason/tree/9c578b4e5ace89e8966fc9ec747d393985b05933#installation-for-programmatic-usage) pour l'utilisation programmatique du parser et printer Reason, `refmt`, à la fois pour l'utilisation native et Web. En particulier, la version web de refmt alimente [Klipse](http://blog.klipse.tech/reason/2017/10/06/blog-reason.html), [reason-tools](https://github.com/reasonml/reason-tools), le site de la doc Reason, etc. Si vous venez de JavaScript : faites `npm install --save reason` pour avoir le fichier `refmt.js`. Il est gzip à moins de 350kb, donc faites vous plaisir et impressionnez-nous avec votre utilisation de `refmt` !\*
- **Eeeet oui, syntaxe d'application abstraction JavaScript (aka, parenthèses autour des fonctions/types paramétrés)**. Oui, vous obtenez toujours le currying automatique : c'est un pur changement syntaxique. Honnêtement, ce point mérite à lui seul son propre poste, mais il ouvre les portes au [bikeshedding](http://whatis.techtarget.com/definition/Parkinsons-law-of-triviality-bikeshedding), alors nous allons nous abstenir d'en écrire un et nous allons juste vous regarder vous disputer à ce sujet sur Twitter (et choisir les coups de gueule les plus créatifs et les accrocher sur notre mur !). Plus sérieusement, **si vous vous souciez vraiment de la syntaxe**, alors au lieu de crier sur la place publique, envoyez vos commentaires/plaintes en privé à [@_chenglou](https://twitter.com/_chenglou) et [@jordwalke](https://twitter.com/jordwalke). Si vous ne vous souciez pas de la syntaxe, alors génial !

**Comment l'obtenir ?**

- Il existe un **script de migraiton** disponible à https://github.com/reasonml/upgradeSyntaxFrom2To3. Utilisez-le. Aucune modification manuelle de la syntaxe n'est requise.
- Désinstallez & mettez à jour [reason-cli](/guide/editor-tools/global-installation) en version `3.0.0` (en lieu et place de l'ancienne version `1.13.7`), pour le tooling de l'éditeur.
- Mettez à jour la version de [BuckleScript](https://bucklescript.github.io) de votre projet en version `2.1.0`.
- Précisez `"refmt": 3` dans votre  `bsconfig.json`.
- Redémarrez votre éditeur.
- Si vous travaillez en natif, il s'agit de `reason.3.0.0` sur OPAM.

**Comment cela affecte-t-il les projets existants ?**

- Si vous ne précisez pas`"refmt": 3` dans votre `bsconfig.json`, rien ne change. (Mise à jour: bs-platform 2.1.0 est par défaut sur refmt 3. Si vous voulez garder refmt 2, précisez `"refmt": 2`).
- Vos dépendances tierces peuvent toujours rester à la version 2, et inversement. Les choses vont fonctionner comme prévu.
- Entrain d'apprendre la nouvelle syntaxe ? [Reason-tools](https://github.com/reasonml/reason-tools) convertit maintenant entre les syntaxes aussi !
- Pour le natif, les dépendances devront d'abord mettre à niveau la syntaxe. Nous allons résoudre cela un peu mieux dans le futur.

Voilà !

**Pour voir la liste complète des modifications**, rendez-vous sur [HISTORY.md](https://github.com/facebook/reason/blob/master/HISTORY.md#300). Encore une fois, vérifiez le script de migration afin de ne pas convertir manuellement chaque fichier.

Merci encore à Fred, Iwan, Jared et tous les autres (hcarty, Sean, Jordan, Cristiano, Hongbo, Ricky, Andrey, etc.) pour tous leurs efforts.

\* Si vous formatez le code Reason de votre propre site de blog à l'aide de celui-ci, la syntaxe de la publication peut potentiellement rester toujours à jour sans que vous n'ayez besoin d'aller mettre à jour manuellement les snippets. Et oui, nous avons quelques des idées assze folles à ce sujet pour bientôt.

### Messenger.com maintenant converti à Reason à 50%

*8 septembre 2017*

Boom !

Messenger.com est la version web de Facebook Messenger. Nous partageons également notre code avec la boîte de réception de Facebook.com et les onglets de discussion. Depuis plus d'un an, l'équipe Reason travaille directement sur Messenger afin d'intégrer Reason + BuckleScript dans les codebases. Depuis un certain temps, nous avons atteint une couverture du code Reason de 50% !

#### Quelques statistiques

- Un rebuild complet de la partie Reason de la codebase prend ~ 2s (quelques centaines de fichiers), un build incrémental (la norme) prend **<100ms** en moyenne. L'auteur de BuckleScript estime que le système de build devrait scale à quelques centaines de milliers de fichiers dans les conditions actuelles.
- Messenger recevait des rapports de bugs de façon quotidienne. Depuis l'introduction de Reason, il y a eu un total de **10 bugs** (pendant toute l'année, pas par semaine) !
- La plupart des nouvelles fonctionnalités de la core team Messenger sont maintenant développées en Reason.
- Des dizaines de refactors massifs pendant l'itération sur ReasonReact. La vitesse de refactorisation est passée de quelques jours à quelques dizaines de minutes. Je ne pense pas que nous avons causé plus que quelques bugs pendant le processus (compte tenu du nombre total de bugs).
- Toute les personnes travaillant en Reason ont été promues pour "production de code de qualité". Nan je rigole. Mais certainement un grand impact sur long terme.

#### Quelle équipe est la suivante ?

Nous croyons en l'itéreration sur/auprès des équipes produit afin de créer la meilleure infrastructure. Leurss feedbacks ainsi que ceux de la communauté open source ont changé notre stratégie à plusieurs reprises, pour le mieux. À partir d'aujourd'hui, Reason et BuckleScript sont également déployés sur un outil interne de WhatsApp, Instagram Web (à petite échelle), plus quelques outils internes critiques du côté d'Ads. Nous travaillerons étroitement avec ces équipes au cours de l'année qui vient.

Nous avons introduit avec succès les développeurs réguliers de JavaScript à Reason. Dans le cas le plus extrême, un stagiaire sans connaissance en JavaScript a pu envoyer du code ReasonReact en production (le tout avec 0 bug). Essayez avec votre propre équipe à l'occasion ! =)

Un grand merci à tous les membres de ces équipes, à Hongbo (auteur de BuckleScript) et à la communauté OCaml (vraiment, 50% Reason signifie 50% OCaml : nous ne sommes rien sans vous). Et bien sûr, à tous les amis de la communauté pour être avec nous tout au long de cette aventure. Le meilleur reste à venir.

See you soon!

### De bien, bien, biiiieeeeen meilleurs messages d'erreur !

*25 août 2017*

Une image vaut mille mots.

Avant :
<div style="width:744px">
  <img alt="before" src="https://user-images.githubusercontent.com/1909539/29709302-ab0c6aee-8940-11e7-953f-60a867d242cb.png" />
</div>
Après:
<div style="width:742px">
  <img alt="before" src="https://user-images.githubusercontent.com/1909539/29709301-ab04eac6-8940-11e7-8d2b-c65f808b6be8.png" />
</div>

Parfois quand je suis occupé, un collègue random/membre de la communauté sur Discord me contacte et me dit "Yo Cheng Lou pourquoi les erreurs de Reason sont-elles aussi mauvaises ? Pourquoi ne pouvez-vous pas être plus comme [Elm](http://elm-lang.org), Cheng Lou ? Pourquoi ? Regardez à quel point les erreurs Elm sont super Cheng Lou, regardez."

En réalité, j'ai vraiment honte de nos messages d'erreur. Nous voici, un système de types avec deux décennies de recherche et d'implémentation solides, parfois présenté aux utilisateurs finaux comme s'il s'agissait de quelque chose qui gênerait leur progression.

C'est fini ! Nous vous avons clairement entendu, et vous livrons ici des messages d'erreur avec des améliorations de toute part. En voici quelques unes :

- Affichez la(les) ligne(s) de(s) l'erreur(erreurs), directement à l'intérieur du terminal.
- Meilleures couleurs, pour une recherche visuelle plus rapide.
- Des messages améliorés dans de nombreux cas.
- Erreurs dans la syntaxe Reason pour les fichiers Reason.
- Un peu plus de respiration entre les lignes.

Le dernier point est un compromis : les erreurs finissent par prendre plus d'espace. En voyant que vous vous concentrez habituellement sur une erreur unique plutôt que d'essayer d'avoir une vue d'ensemble de toutes les erreurs, nous avons jugé que ce compromis était intéressant, surtout dans le contexte d'une grande quantité de résultats de build. Considérons le nouveau format de warning :

<div style="width:745px">
  <img alt="warning-after" src="https://user-images.githubusercontent.com/1909539/29711739-431be094-894b-11e7-87a6-bc1d6aeea043.png" />
</div>

Voici le même warning, dans l'ancienne version, noyé au milieu d'autres ouputs :

<div style="width:745px">
  <img alt="warning-before" src="https://user-images.githubusercontent.com/1909539/29711789-810739f8-894b-11e7-8451-a919b3f119c6.png" />
</div>

À Messenger, nous avons vu des gens pousser des warnings en production, non pas parce qu'ils ne voulaient pas les fix, mais **parce qu'ils ne les avaient pas vu** ! Pourtant ce n'est pas sorcier . Laissez trainer un peu espace négatif ici et là. Colorez les choses de manière appropriée, et voilà !

**Les nouvelles erreurs peuvent être activées en ajoutant `"bsc-flags": ["-bs-super-errors"]` à votre bsconfig.json**, [comme ceci](https://github.com/reasonml-community/reason-react-example/blob/6dc15bf5fbeeb184c99acb063f7644a0d14b12f4/bsconfig.json#L3). Elles sont aussi disponibles pour [bsb-native](https://github.com/bsansouci/bsb-native). Fidèle à notre vision de la stack, elles sont rapides, simples à configurer et robustes.

**One more thing** : nous avons également intégré les pièges communs de [ReasonReact](//reasonml.github.io/reason-react/) dans ces messages, lorsqu'ils sont applicables.

<div style="width:747px">
  <img alt="reason-react" src="https://user-images.githubusercontent.com/1909539/29712284-f1013bb2-894d-11e7-9596-1cca54d5c331.png" />
</div>

Ceci est juste la première de nombreuses itérations à venir ! Vous avez un message que vous souhaiteriez voir mieux expliqué ? Postez votre issue [ici](https://github.com/reasonml-community/error-message-improvement/issues) !

Enjoy =)

### Un bien meilleur Editeur

*18 Août 2017*

En nous basant sur les retours de la communauté, nous avons maintenant amélioré notre section [Editeur](/try). Les principales nouveautés :

- Conversion bidirectionnelle. Écrivez en Reason, obtenez la traduction OCaml, vice-versa.
- Évaluation en direct, avec feedback de la console dans la partie inférieure droite.
- La majorité de la [librairie standard](/api/index.html) est maintenant chargée. Comme nous évaluons sur le Web, cela inclut les [APIs supplémentaires stdlib](https://bucklescript.github.io/bucklescript/api/) de BuckleScript.
- Snippets de code partageable ! Copiez simplement l'URL.
- Quelques améliorations de performance.

Have fun!


### Nouveau site !

*14 Juillet 2017*

Vous remarquez quelque chose de différent ? =)

Le nouveau site de la documentation est construit par un membre de la communauté [Jared](https://jaredforsyth.com) (assurez-vous de jeter un coup d'oeil à ses articles sur Reason !). Le nouveau site conserve la majorité du contenu de l'ancien, tout en offrant une meilleure structure pour naviguer dans celui-ci. Vous remarquerez la présence d'un lien "Suggérer une modification" un peu partout. N'hésitez pas à faire un tour !

(Conçu avec [Gatsby](https://www.gatsbyjs.org))

### Nouvelle version de ReasonReact publiée

*12 Juin 2017*

Une release très excitante ! Pour faire simple : ReasonReact a maintenant son propre site de documentation [ici](https://reasonml.github.io/reason-react/). Il est acccompagné par la nouvelle version de [BuckleScript](https://www.npmjs.com/package/bs-platform) d'ailleurs. Les deux nouvelles versions sont rétrocompatibles.

Enjoy!

### Nettoyage de printemps (Premier Blog Post !)

*18 Mai 2017*

Maintenant que la communauté décolle, garder les gens à jour via [Discord](https://discord.gg/reasonml) ou les autres channels existants n'est plus la meilleure option. Voilà pourquoi nous inaugurons une section blog. Dans l'esprit de la communauté, ces messages resteront courts et concis.

Nous avons déplacé des projets de premier plan inutilisés de [GitHub/reasonml](https://github.com/reasonml/) vers [GitHub/reasonml-old](https://github.com/reasonml-old). Les anciennes URL sont redirigées, donc pas de soucis à ce niveau là.

Nous avons aussi nettoyé la code base de Reason. Les intégrations de l'éditeur ont été déplacées dans leurs repos dédiés. Les instructions mises à jour sont toujours [là](/guide/editor-tools/editors-plugins). D'autres opérations de nettoyage du repo de Reason sont en cours.

Certaines rooms dans Discord ont été fusionnées. Moins de rooms, des discussions plus ciblées. 

Comme vous pouvez le voir : ce site de documentation a également subit quelques réarrangements. En général, si vous souhaitez contribuer à la doc, contactez nous directement sur Discord !
