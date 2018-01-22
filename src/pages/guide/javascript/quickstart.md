---
title: Démarrage rapide
order: 0
---

```sh
npm install -g bs-platform
bsb -init my-first-app -theme basic-reason
```

Ensuite lancez votre projet comme d'habitude :

```sh
cd my-first-app
npm run build
```

Il est directement en watch mode, donc n'importe quel changement dans vos fichiers sera intercepté et compilé. C'est tout !

- Lisez ceci pour en savoir plus sur la façon dont nous compilons en JavaScript grâce à notre partenaire sur ce projet, [BuckleScript](https://bucklescript.github.io/).

- Sinon, **pour démarrer une application [ReasonReact](//reasonml.github.io/reason-react/docs/en/installation.html) app**, essayez `bsb -init my-react-app -theme react`.

- Rendez-vous sur la partie [Configuration de l'éditeur](/guide/editor-tools/global-installation) pour obtenir le plugin Reason de votre éditeur préféré !
