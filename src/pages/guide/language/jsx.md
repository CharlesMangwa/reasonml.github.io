---
title: JSX
order: 160
---

Voudriez-vous un peu de syntaxe HTML dans votre code Reason ? Si ce n'est pas le cas, sautez cette section au plus vite et prétendez n'avoir rien vu !

Reason prend en charge la syntaxe JSX, avec quelques légères différences par rapport à celle de [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html). Reason JSX n'est pas lié à ReactJS, ils se traduisent par des appels de fonction normaux :

### Tag capitalisé

```reason
<MyComponent foo={bar} />
```

devient

```reason
MyComponent.make(~foo=bar, ~children=[], ());
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

Voir [ReasonReact](//reasonml.github.io/reason-react/) pour un exemple d'application de JSX.

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
- Il n'y a aucun support des attributs spread du JSX.
- Le punning !

#### Punning

"Punning" se réfère à la syntaxe du raccourci utilisé lorsqu'un label et une valeur sont identiques. Par exemple, en JavaScript, au lieu de faire `return {name: name}`, vous pouvez faire `return {name}`.

Le JSX Reason supporte le punning. `<input checked />` est juste un raccourci pour `<input checked = checked />`. Le formateur vous aidera à mettre en forme ce dernier autant que possible. C'est pratique dans les cas où il y a beaucoup de props à passer :

```reason
<MyComponent isLoading text onClick />
```

De ce fait, un composant JSX Reason peut accepter un peu plus de props avant qu'on ait besoin d'utiliser des librairies supplémentaires qui évitent le passage de props.

### Conseils & astuces

Pour les auteurs de librairies souhaitant profiter du JSX : l'attribut `[@JSX]` ci-dessus est un hook pour les *macros ppx* potentielles pour localiser une fonction souhaitant se formater en JSX. Une fois que vous trouvez la fonction, vous pouvez la transformer en toute autre expression.

De cette façon, tout le monde bénéficie de la syntaxe JSX sans avoir besoin d'opter pour une librairie spécifique en l'utilisant, ex : ReasonReact.

Les appels JSX prennent en charge les fonctionnalités des [fonctions labellisées](/guide/language/function#labeled-arguments) : facultatif, explicitement passé en option et facultatif par défaut.

### Décisions de conception

La façon dont nous avons conçu ce JSX est liée à la façon dont nous aimerions aider le langage à évoluer. Voir la section "What's the point?" dans cet [article](https://medium.com/@chenglou/cool-things-reason-formatter-does-9e1f79e25a82).

La possibilité d'avoir des macros dans le langage + la syntaxe agnostique de JSX permet à chaque librairie d'implémenter potentiellement JSX sans tracas. De cette façon, nous ajoutons des connaissances visuelles au langage OCaml sous-jacent sans compromettre ses sémantiques (aka, comment il s'exécute). L'un des principaux objectifs de Reason est de permettre au plus grand nombre de personnes de profiter du beau langage qu'est OCaml, tout en rejetant les débats fastidieux autour de la syntaxe et du formatage.
