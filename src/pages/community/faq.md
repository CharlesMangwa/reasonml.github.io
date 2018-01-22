---
title: FAQ
order: 40
---
Foire Aux Questions
=======

#### Est-ce que je devrais apprendre Reason ou OCaml en premier ?
Aucune raison de choisir entre les deux ! Reason et OCaml partagent exactement la même sémantique (ex : comment le code s'exécute). Seule la syntaxe diffère. Gardez [Reason-tools](https://github.com/reasonml/reason-tools) à portée de main afin de pouvoir faire vos équivalences entre les deux syntaxes librement. Un tutoriel Reason est un tutoriel OCaml et vice-versa. Vous pouvez avoir ces alias dans votre terminal à toute fin utile :

```sh
# converti un code ocaml en code reason
alias mlre="pbpaste | refmt --parse ml --print re --interface false | pbcopy"
# converti un code reason en code ocaml
alias reml="pbpaste | refmt --parse re --print ml --interface false | pbcopy"
```

Ils vont prendre votre code à partir du presse-papiers (macOS), le convertir et le coller à nouveau dans votre presse-papiers ! Échangez pbpaste/pbcopy avec les fonctions de votre système de presse-papiers.

#### Je ne sais pas trop quoi faire avec Reason
[Nous compilons très bien en JavaScript](/guide/javascript). Pensez à quel projet vous feriez habituellement s'il s'agissait purement de JavaScript. Essayez juste de le porter/écrire en Reason + BuckleScript à la place ! Nous vous recommandons d'essayer de réaliser des projets concrets, avec des utilisateurs finaux (par exemple, un petit utilitaire de ligne de commande) plutôt que des projets au niveau d'infrastructures (par exemple, un générateur de boilerplate). Cette dernière catégorie nécessite une expertise et une compréhension idiomatique du code Reason assez poussées.

#### Quelle est la relation entre  Reason, BuckleScript et OCaml ?
Regardez [ici](/guide/javascript). Reason est une syntaxe pour OCaml et prend en charge toutes ses fonctionnalités. BuckleScript compile du code OCaml/Reason en JavaScript.

#### D'où viennent toutes ces fonctions `print_endline` et `string_of_int` ?
Elles proviennent de la librairie standard, pre-`open` lors de la compilation de votre fichier. C'est pourquoi vous les voyez dans le scope.

#### Puis-je avoir une fonction pour afficher des structures de données arbitraires ?
Si vous compilez en JavaScript via BuckleScript, vous pouvez utilisez le `console.log` JavaScript via [`Js.log`](https://bucklescript.github.io/bucklescript/api/Js.html#VALlog). Si vous compilez en natif, vous aurez besoin d'un outil comme [ppx_show](https://github.com/diml/ppx_show). Une future fonctionnalité d'Ocaml  (appelée *modular implicit*) réglera ce problème directement dans le langage.

#### Pourquoi est-ce qu'il y a un `+` pour aditionner des ints et un `+.` pour additionner des floats, etc ?
Voir [ici](/guide/language/integer-and-float#design-decisions).

#### Est-ce que la librairie ___ fonctionne en Reason ?
La plupart des librairies JavaScript devraient facilement fonctionner sous Reason + BuckleScript. Du côté natif, puisque Reason est juste une transformation de syntaxe : oui, elles fonctionnent aussi avec Reason. Mais le workflow natif est actuellement en cours d'élaboration et a besoin d'être peaufiné.

#### Qu'en est-il du rendu serveur ? Devrais-je compiler en natif ou JS et utiliser node.js ?
Nous compilons vers le natif, mais le workflow natif est actuellement en cours de développement. Pour le moment, nous recommandons de compiler en JavaScript via BuckleScript et d'utiliser les bindings disponibles sur [reasonml-community](https://github.com/reasonml-community) ou autre part.

#### Qu'en est-il de l'async avec BuckleScript ?
Tout d'abord, si vous n'interagissez pas avec une librairie qui utilise des promises, vous pouvez simplement utiliser des callbacks. Tout le monde les reçoit et ils sont performants.

Si vous devez bind une librairie JavaScript qui utilise des promises ou communiquer avec une telle librairie, vous pouvez utiliser les [bindings pour promises](http://bucklescript.github.io/bucklescript/api/Js.Promise.html) de BuckleScript. Il sera également possible d'avoir du sucre syntaxique dans le futur. À long terme, nous souhaitons mettre en œuvre une implémentation des promises conformes aux spécifications d'OCaml/Reason proprement dit, de sorte que les optimisations du compilateur puissent être activées.

Pour une solution OCaml plus idiomatique : du côté natif OCaml, nous avons [lwt](http://ocsigen.org/lwt/) et [Async](https://ocaml.janestreet.com/ocaml-core/111.03). Nous ne les utilisons pas sur le Web en ce moment, mais nous pourrions à l'avenir.

#### Et en ce qui concerne les tests (unitaires) ?
Certaines fonctionnalités du langage OCaml (pas seulement les types) pourraient différer la nécessité du support du test unitaire. En attendant, pour la compilation JavaScript, nous travaillons sur des [bindings Jest](https://github.com/BuckleTypes/bs-jest). Nous chercherons à utiliser Jest pour le natif aussi, si Jest est écrit en utilisant Reason à l'avenir (pas encore de plan concret). [OUnit](http://ounit.forge.ocamlcore.org) est une bonne et petite librairie native de tests OCaml en attendant.

#### Quel est ce fichier `.merlin` à la racine de mon projet ?
C'est le fichier metadata de [Merlin](/guide/editor-tools/extra-goodies/#merlin), le backend de l'éditeur d'intégration partagé pour l'autocomplétion, le seut vers définition, etc. Pour le [workflow JavaScript](/guide/javascript), le système de build de `bsb` génère le fichier `.merlin` pour vous. Vous n'avez pas besoin de vérifier cela dans votre contrôle de version et ne devez pas le modifier manuellement.


#### Je ne vois aucun `import` ou `require` dans mon fichier. Comment fonctionne la résolution de module ?
Reason/OCaml n'a pas besoin que vous écriviez d'import. Les modules référencés dans le fichier sont automatiquement recherchés dans le projet. Plus précisement, un module `Hello` demande au compilateur de chercher un fichier `hello.re` ou `hello.ml` (et leur [fichier d'interface](/guide/language/module/#signatures) correspondant, `hello.rei` or `hello.mli`, s'il est disponible).

Un nom de module est le nom du fichier avec la première lettre en majuscule. Il doit être unique par projet. Cela met de côté le système de fichiers et vous permet de déplacer des fichiers sans modifier votre code.

#### Est-ce que `Some | None`, `contents`, `Array`, `List` ont quelque chose de particulier ? D'où vient-ils ?
Ce sont des variantes/records/définitions de modules ordinaires qui viennent avec la [librairie standard](http://caml.inria.fr/pub/docs/manual-ocaml/libref/), `open` par défaut lors de la compilation par soucis de commodité.

#### Que signifie un argument précédé d'un underscore (ex : `_` ou `_foo`) ?
Disons que vous avez : `List.map (fun item => 1) myList`. L'arguemnt `item` n'est pas utilisé et va généré un avertissement au niveau du compilateur. Utilisé `fun _ => 1`, indique au contraire que vous recevez et ignorez délibérément un argument, contournant ainsi l'avertissement. Vous pouvez aussi utiliser `fun _item => 1` qui a le même effet, mais indique de façon plus descriptive ce que vous ignorez.

#### Qu'est-ce que ce `MyModule.t` que je vois partout ?
Si on suppose que `MyModule` est le nom d'un module, `t` est une convention de la communauté qui indique "le type qui représente ce module, quoi qu'il soit". Par exemple : pour le module [`Js.String`](http://bucklescript.github.io/bucklescript/api/Js.String.html), [`String.t`](http://bucklescript.github.io/bucklescript/api/Js.String.html#TYPEt) est le type qui l'accompagne et représente ce qu'est "une string".

#### Pourquoi il y a-t-il un [`Js_promise`](http://bucklescript.github.io/bucklescript/api/Js_promise.html) et ensuite un [`Js.Promise`](http://bucklescript.github.io/bucklescript/api/Js.Promise.html) ? Et qu'en est-il de [`Js_array`](http://bucklescript.github.io/bucklescript/api/Js_array.html), [`Js_string`](http://bucklescript.github.io/bucklescript/api/Js_string.html) et tout le reste ?
Par convention, `Js_foo` représente le module en lui-même, et `Js.Foo` est juste un alias. Ils sont [equivalents](https://github.com/bloomberg/bucklescript/blob/7bc37f387a726ba1ae4afeefe02b9c82577d9e10/jscomp/runtime/js.ml#L124-L138). Utilisez plutôt `Js.Foo`, car il s'agit du nom publique et officiel du module.

#### Quand les implicites modulaires, le multicore et les effet algébriques seront-ils prêts?
Ils le seront un jour. En attendant, aidez-nous à livrer plus de code Reason ! La popularité aidera à renforcer les contributions d'OCaml. Moins les gens d'OCaml doivent s'inquiéter des fruits à faible adhérence, plus ils peuvent se concentrer sur de grandes recherches et l'exécution !

#### Pourquoi BuckleScript et bsb sont aussi rapides ? Comment puis-je les ralentir ?
BuckleScript est optimisé pour être performant sur l'ensemble de la stack. Vous pouvez essayer de le ralentir en ajoutant une douzaine de couches d'indirections et de métaprogrammes. Essayez :

- D'ajouter quelques boucles infinies par-ci par-là.
- De caser un outil de compilation JavaScript dans le pipeline.
- De rajouter encore plus de dépendances juste pour écrire un "hello world".

#### Je vois un étrange fichier .cmi/.cmx/.cmj/.cma mentionné dans une erreur de compilation. D'où viennent ces fichiers ?

La communauté OCaml utilise fréquemment des extensions de fichier pour distinguer les types de sources, les artefacts et les métadonnées, en fonction de votre cible de build (natif/bytecode/JavaScript). Voici un aperçu de certaines de ces extensions que vous pouvez rencontrer :

##### Fichiers source

- `.ml` : fichier source OCaml
- `.mli` : fichier d'interface OCaml. Détermine quelles parties du fichier `.ml` correspondant est visible au monde extérieur
- `.re` : fichier source Reason. Comme `.ml`, mais pour Reason
- `.rei` : fichier d'interface Reason. Comme `.mli`, mais pour Reason

##### Fichiers compilés

- `.cmi` : Fichier d'interface (`.rei`/`.mli`) compilé
- `.cmx` : Fichier d'objet compilé pour l'output natif (via `ocamlopt`)
- `.cmo` : Fichier d'objet compilé pour l'output bytecode
- `.cmj` : Fichier d'objet compilé pour le web (via BuckleScript)
- `.cma` : Fichier de librairie pour l'output bytecode (équivalent des fichiers `.a` en C)
- `.cmxa` : Fichier de librairie pour l'output natif
- `.cmt` : Contient un "arbre typé" – en gros l'AST avec toutes les informations sur le typage
- `.cmti` : Comme le fichier `.cmt`, mais pour les fichiers d'interface
- `.cmxs` : Plugin chargé dynamiquement (pour la compilation native)
- `.o`: Fichier d'objet natif compilé
- `.out`: Nom/extension conventionnel pour le résultat final produit par `ocamlc`/`ocamlopt` (par exemple `ocamlc -o myExecutable.out`)

##### Autres fichiers de l'écosystème OCaml

- `.mll` : Fichier de définition de l'analyseur lexical d'ocamllex
- `.mly` : Fichier de définition du générateur de parser d'ocamlyacc
- `.mldylib` : Contient une liste de chemins de module qui seront compilés et archivés ensemble pour créer un `.cmxs correspondant (plugin natif)
- `.mliv` : Fichiers spécifiques aux batteries pour certains [prétraitements personnalisés](https://github.com/ocaml-batteries-team/batteries-included/blob/f019927b9503ec65ef816f02315de78d4bae3481/src/batArray.mliv).
- `.mllib` : Librairie OCaml (cma et cmxa)
- `.mlpack` : Paquet OCaml (cmo built avec le flag -pack)
- `.mlpp` : Fichiers spécifiques à [Extlib](https://github.com/ygrek/ocaml-extlib) pour certains prétraitements personnalisés
- `.mltop` : [Fichier haut niveau d'OCamlbuild](https://shonkychef.wordpress.com/2009/07/28/making-an-ocaml-toplevel-with-ocamlbuild/), utilisé par ce dernier pour générer un fichier `.top`
- `.odocl` : Fichier de documentation OCaml

Si certaines de ces explications sont encore un peu floues, voici des explications sur certains des termes utilisés :
- [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) : *Abstract Syntax Tree*. La structure de données provenant du code source, sur laquelle le compilateur fonctionne.
- [Linking](https://en.wikipedia.org/wiki/Linker_(computing)) : L'étape où le compilateur prend plusieurs fichiers compilés intermédiaires et les assemble. Par exemple : relier A à B, parce que le fichier source d'origine A est référé à B.
- Natif : build ce qui s'exécute sur les instructions assembleur de la plateforme en question.
- [Bytecode](https://en.wikipedia.org/wiki/Bytecode) : Comme le code natif, mais plus portable et moins performant.
- [Fichier objet](https://en.wikipedia.org/wiki/Object_file) : Contient un code machine qui n'est pas directement exécutable.

Vous trouverez plus d'informations sur certains de ces fichiers [sur le site d'OCaml](https://ocaml.org/learn/tutorials/filenames.html) dans [ cette publication de la liste de diffusion](http://caml.inria.fr/pub/ml-archives/caml-list/2008/09/2bc9b38171177af5dc0d832a365d290d.en.html). Il existe des articles plus pointus sur la compilation [native](https://caml.inria.fr/pub/docs/manual-ocaml/native.html) et [bytecode](http://caml.inria.fr/pub/docs/manual-ocaml/comp.html) qui contiennent des descriptions plus détaillées, dans le manuel d'OCaml.
