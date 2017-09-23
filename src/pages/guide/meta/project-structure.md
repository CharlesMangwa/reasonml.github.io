---
title: Structure du projet
order: 0
---

Assurez-vous d'avoir lu l'[introduction](/guide/meta) de cette section en premier !

### Nomenclature de fichier

Nom de fichier en majuscule (aka première lettre en haut de casse).

**Justification** : les noms de modules ne peuvent être écrits qu'avec la première lettre en majuscule. Les nouveaux arrivants demandent souvent comment un fichier mappe vers un module, et pourquoi `draw.re` map au module `Draw`, et parfois essayent de se référer à un module via des identificateurs non capitalisés. L'utilisation de `Draw.re` rend ce mapping plus direct. Il aide également certains noms de fichiers qui seraient gênants sous une forme sans majuscule, exemple : `uRI.re`.

### Dossiers

Essayez de ne pas avoir trop de hiérarchies imbriquées. Gardez les choses claires et ayez moins de fichiers (pour rappel : vous pouvez utiliser des modules imbriqués).

**Justification** : l'organisation du projet est une grande source de paralysie de la prise de décisions pour certains. On nous a demandé plus que quelques fois comment "transmettre sémantiquement des informations à travers la hiérarchie". Le ratio dsitance/bénéfice est assez élevé pour ceux-ci actuellement.

### Dépendances tierces

Aussi peu que possible.

**Justification** : un langage compilé, statiquement typé, ne peut pas modéliser ses dépendances facilement en se confondant comme dans un langage dynamique. Surtout quand nous sommes encore entrain de nous appuer sur NPM/Yarn (pour réduire les frais généraux d'apprentissage à moyen terme), tous deux non réalisés avec Reason/BuckleScript à l'esprit. Garder les dépendances simples et légères aide à réduire la possibilité de conflits (par exemple, deux dépendances diamants ou des interfaces en conflit).

### Documentation

Ayez-en. Dépensez plus d'énergie à les rendre géniales (exemples, pièges à éviter, etc) et professionnelles plutôt que _juste_ belles à regarder.

**Justification** : il est difficile pour les nouveaux arrivants de distinguer une bibliothèque simple et décente d'une autre qui semble juste jolie. Pour le bien de la communauté, n'essayez pas trop de vous calquer sur les bibliothèques d'un autre. Faites passer le mot, mais utilisez votre propre jugement aussi.

### PPX & autres meta-outils

Gardez-les au minimum. PPX, à moins d'être utilisé dans des cas de renom (printer, accesseurs et génération de sérialiseurs/ déserialisateurs), peut causer un gros problème d'apprentissage pour les nouveaux arrivants. En plus de la syntaxe, de la sémantique, des types, de l'outil de construction et de l'IFE qu'ils doivent déjà apprendre, l'apprentissage des transformations personnalisées du code par chaque librairie est une étape supplémentaire. Des macros plus invasives rendent le code même moins sémantiquement significatif, car l'essence se cacherait ailleurs.

### Paradigme

N'abusez pas des caractéristiques excessivement chic. Laissez de la place pour les prochaines APIs, mais ne construisez pas non plus trop de choses à l'excès.

**Justification** : un code simple aide les nouveaux arrivants à comprendre et à contribuer potentiellement à votre code. Contribuer est la meilleure façon d'apprendre. L'aide supplémentaire que vous recevez pourrait également suprasser le gain d'utilisation apporté par l'utilisation d'une fonctionanltié un peu plus poussée du langage. Cependant, essayez de nouvelles astuces du langages dans certains projets plus occasionnels ! Vous pouvez découvrir de nouvelles façons de concevoir votre code.

### Publication

S'il s'agit d'un binding avec une bibliothèque JavaScript, ne publiez pas les artefacts JavaScript. Si c'est une libraire légitime, publiez les artefacts dans `lib/js` si vous pensez que les consommateurs de JavaScript pourraient l'utiliser. C'est particulièrement le cas lorsque vous convertissez progressivement une librairie JavaScript en Reason + BuckleScript, sans apporter de breaking changes pour les consommateurs JavaScript existants.

**Justification** : Soyez sympa avec les consommateurs JavaScript de votre librairie. Ce sont vos futurs Reasoners.
