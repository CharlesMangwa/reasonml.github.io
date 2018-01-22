---
title: JSX
order: 160
---

Voudriez-vous un peu de syntaxe HTML dans votre code Reason ? Si ce n'est pas le cas, sautez cette section au plus vite et prétendez n'avoir rien vu !

Reason prend en charge la syntaxe JSX, avec quelques légères différences par rapport à celle de [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html). Reason JSX n'est pas lié à ReactJS, ils se traduisent par des appels de fonction normaux :

**Note** pour les lecteurs [ReasonReact](//reasonml.github.io/reason-react/) : ce n'est pas ce en quoi ReasonReact transforme JSX. Regardez la section Utilisation pour plus d'informations.

### Tag capitalisé

```reason
<MyComponent foo={bar} />
```

devient

```reason
([@JSX] MyComponent.make(~foo=bar, ~children=[], ()));
```

### Enfant

```reason
<MyComponent> foo bar </MyComponent>
```

Ceci est la syntaxe pour passer une liste de deux éléments, `foo` et `bar`, à la position des enfants. La syntaxe _désucre_ en une liste contenant `foo` et `bar`:

```reason
([@JSX] MyComponent.createElement(~children=[foo, bar], ()));
```

**Notez** à nouveau que ce n'est pas la transformation pour ReasonReact/ ReasonReact transforme la liste finale en un array. Mais l'idée s'applique toujours.

Donc naturellement, `<MyComponent> foo </MyComponent>` _désucre_ en `([@JSX] MyComponent.createElement(~children=[foo], ()))`. C'est à dire quoi que vous fassiez, les arguments passés à la position enfants seront enveloppés dans une liste. Et si vous ne voulez pas ce comportement ?  **ue faire si vous voulez passer directement `foo` sans un emballage supplémentaire** ?

#### Spread d'enfants

Pour résoudre le problème ci-dessus, nous avons introduit

```reason
<MyComponent> ...foo </MyComponent>
```

Ceci passe la valeur `foo` _sans_ l'encapsuler dans une liste (ou un array, dans le cas de ReasonReact). Aka, ce désucre en :

```reason
([@JSX] MyComponent.createElement(~children=foo, ()));
```

Ceci est très utile dans les cas où vous manipulez `foo` qui est déjà une liste de choses, et que vous voulez transférer cela sans l'encapsuler en plus (ce qui serait une erreur de type) \*. Cette syntaxe vous permet également de passer des structures de données arbitraires à la position des enfants (rappelez-vous, les `children` JSX ne sont vraiment que des props normales) :


```reason
<MyComponent> ...((theClassName) => <div className=theClassName />) </MyComponent>;
<MyForm> ...("Hello", "Submit") </MyForm>;
```

### Tag non-capitalisé

```reason
<div foo={bar}> child1 child2 </div>;
```

devient

```reason
([@JSX] div(~foo=bar, ~children=[child1, child2], ()));
```

### Utilisation

Voir [ReasonReact](//reasonml.github.io/reason-react/docs/jsx) pour un exemple d'application de JSX, qui transforme les appels ci-dessus en un appel spécifique à ReasonReact.

Voici un tag JSX qui présente la plupart des fonctionnalités.

```reason
<MyComponent
  booleanAttribute={true}
  stringAttribute="string"
  intAttribute=1
  forcedOptional=?{Some("hello")}
  onClick={reduce(handleClick)}>
  <div> {ReasonReact.stringToElement("hello")} </div>
</MyComponent>
```

### Différences du JSX JavaScript

- Les attributs et les enfants ne requièrent pas de `{}`, mais nous les montrons quand même pour faciliter l'apprentissage. Une fois que `refmt`er votre fichier, certains d'entre eux disparaissent et d'autres se transforment en parenthèses.
- Il n'y a aucun support de spread de props du JSX : `<Foo {...bar} />`. Bien que quelque peu liés, nous avons le sprea d'enfants, décrit ci-dessus : `<Foo> ... baz </ Foo>`.
- Le punning !

#### Punning

"Punning" se réfère à la syntaxe du raccourci utilisé lorsqu'un label et une valeur sont identiques. Par exemple, en JavaScript, au lieu de faire `return {name: name}`, vous pouvez faire `return {name}`.

Le JSX Reason supporte le punning. `<input checked />` est juste un raccourci pour `<input checked = checked />`. Le formateur vous aidera à mettre en forme ce dernier autant que possible. C'est pratique dans les cas où il y a beaucoup de props à passer :

```reason
<MyComponent isLoading text onClick />
```

De ce fait, un composant JSX Reason peut accepter un peu plus de props avant qu'on ait besoin d'utiliser des librairies supplémentaires qui évitent le passage de props.

**Notez** qu'il s'agit d'une distinction du JSX de ReactJS, qui n'a **pas** de punning. `<input checked />` en ReactJS se désucre en `<input checked = true />`, afin de se conformer aux idiomes du DOM et par soucis de rétrocompatibilité.

### Conseils & astuces

Pour les auteurs de librairies souhaitant profiter du JSX : l'attribut `[@JSX]` ci-dessus est un hook pour les *macros ppx* potentielles pour localiser une fonction souhaitant se formater en JSX. Une fois que vous trouvez la fonction, vous pouvez la transformer en toute autre expression.

De cette façon, tout le monde bénéficie de la syntaxe JSX sans avoir besoin d'opter pour une librairie spécifique en l'utilisant, ex : ReasonReact.

Les appels JSX prennent en charge les fonctionnalités des [fonctions labellisées](/guide/language/function#labeled-arguments) : facultatif, explicitement passé en option et facultatif par défaut.

### Décisions de conception

La façon dont nous avons conçu ce JSX est liée à la façon dont nous aimerions aider le langage à évoluer. Voir la section "What's the point?" dans cet [article](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82).

La possibilité d'avoir des macros dans le langage + la syntaxe agnostique de JSX permet à chaque librairie d'implémenter potentiellement JSX sans tracas. De cette façon, nous ajoutons des connaissances visuelles au langage OCaml sous-jacent sans compromettre ses sémantiques (aka, comment il s'exécute). L'un des principaux objectifs de Reason est de permettre au plus grand nombre de personnes de profiter du beau langage qu'est OCaml, tout en rejetant les débats fastidieux autour de la syntaxe et du formatage.

\* Vous pourriez vous demander pourquoi vous n'avez jamais eu besoin de ces enfants dans ReactJS. ReactJS utilise une logique d'exécution spéciale + des transformations syntaxiques spéciales + une détection et un marquage d'argument variadique pour éviter la plupart de ces cas ([voir ici](https://github.com/facebook/react/blob/9b36df86c6ccecb73ca44899386e6a72a83ad445/packages/react/src/ReactElement.js#L207)). Une telle utilisation dynamique complexifie un peu la détection du système de types. Puisque nous contrôlons toute la syntaxe et ReasonReact, nous avons décidé d'introduire le spread d'enfants pour enlever toute ambiguïté entre le cas du wrapping et celui du non wrapping, sans coût de compilation et d'exécution !
