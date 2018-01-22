---
title: Installation globale
order: 10
---

**Avant de configurer les plugins de l'éditeur**, vous devez installer les outils globaux dont ils ont besoin.

### (Recommandé) Via NPM/Yarn

| Platforme  | Commande d'installation
|-----------|-------------------------------------------------------------------------------------------------
| **OSX**     | `npm install -g https://github.com/reasonml/reason-cli/archive/3.0.4-bin-darwin.tar.gz`
| **Linux**   | `npm install -g https://github.com/reasonml/reason-cli/archive/3.0.4-bin-linux.tar.gz`
| **Windows** | Please see https://github.com/reasonml/reasonml.github.io/issues/195

Note : les bundles sont actuellement assez volumineux (environ `100 Mo`), mais `npm` n'affichera pas la progression lors du téléchargement.

### (Alternative) Via OPAM

[OPAM](https://opam.ocaml.org) est le package manager natif d'OCaml. Si vous venez d'OCaml et que vous ne disposez pas de NPM/Yarn, vous pouvez éventuellement l'installer de cette façon, mais attention !

**Si vous utilisez Windows**, veuillez consulter https://github.com/reasonml/reasonml.github.io/issues/195.

```
opam update
opam switch 4.02.3 # mandatory!
opam install reason.3.0.4
opam install merlin.2.5.4
```

### Dépannage

#### Mauvaise installation

Si votre installation echoue, c'est peut-être parce que vous êtes sur npm 5.4.0 (`npm --version`). Il y a un bug connu sur npm qui a été corrigé avec la 5.4.2. Mettez à jour `npm` et les choses devraient fonctionner.

Si _ceci_ échoue, essayez https://github.com/reasonml/reasonml.github.io/pull/157. Si cette solution résout votre problème, merci de laisser un +1 sur cette issue. Nous ne sommes pas sûrs que ce soit la solution adéquate pour l'instant.

Enfin, si les choses ne fonctionnent toujours pas, veuillez déposer une issue sur https://github.com/reasonml/reason-cli/issues. Désolé pour la gêne occasionnée.

#### Plugin éditeur non fonctionnel

**Si vous êtes sur Windows** : la prise en charge actuelle de l'outil d'édition pour Windows est fragile. Aidez-nous à améliorer le problème ci-dessus ! Merci d'avance !

Assurez-vous de redémarrer votre éditeur. Certains d'entre eux peuvent ne pas avoir pris en compte votre nouvel environnement shell (qui inclut maintenant les binaires nouvellement installés).

Sinon, essayez :
```
which ocamlmerlin refmt ocamlmerlin-reason
```

Il devrait renvoyer trois chemins qui contiennent le mot `reason-cli` si l'installation de `reason-cli` à réussit.

Vérifiez la version de Merlin :
```
ocamlmerlin -version
```

Il devrait dire "The Merlin toolkit version 2.5.x, for Ocaml 4.02.3". Non pas OCaml 4.03, ni 4.04, etc.

#### Message d'erreur de l'editeur : "Unbound Module `Js`", etc.

Assurez-vous d'avoir build votre projet au moins une fois, le diagnostic ne reprend qu'après cela. La commande build varie selon le projet, mais est souvent `npm run build` (qui appelle généralement `bsb -make-world`).

Si vous êtes sur le Visual Studio Codeo, assurez-vous d'ouvrir l'éditeur à la racine du projet (là où sont situés `package.json` et` bsconfig.json`). Vous pouvez le faire par exemple, en entrant `code .` dans le terminal à la racine.
