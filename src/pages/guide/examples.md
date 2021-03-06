---
title: Exemples
order: 70
---

Un exemple vaut mille mots.

Cette section est consacrée aux néophytes essayant de trouver des idiomes et des conventions générales pour Reason et BuckleScript. Si vous êtes un débutant qui a une bonne idée d'exemple, n'hésitez pas à suggérer une modification !

### Utilisation du type `option`

`option` est une [variant](/guide/language/variant) proposée par la [librairie standard](/api/index.html). Il évite le besoin de valeurs nulles d'autres langages.

```reason
let possiblyNullValue1 = None;
let possiblyNullValue2: option string = Some("Hello@");

switch possiblyNullValue2 {
| None => print_endline("Nothing to see here.")
| Some(message) => print_endline(message)
};
```

### Création d'un type paramétré

```reason
type universityStudent = {gpa: float};

type response('studentType) = {
  status: int,
  student: 'studentType
};

let result: response(universityStudent) = fetchDataFromServer();
```

### Création d'un object JavaScript

En supposant que vous êtes entrain de [compiler en JS](/guide/javascript), bien évidemment.

```reason
let obj1 = {
  "name": "John",
  "age": 30
};
/* Compile en un objet JavaScript qui ressemble exactement à ce que vous voyez là */
```

Vous noterez que ce qui précède n'est pas un record. Les clés sont encapsulées dans une string via le apostrophes. C'est le *syntax sugar* de Reason pour [bs.obj](https://bucklescript.github.io/docs/en/object.html#creation). Le type est déduit. L'exemple suivant l'identifie explicitement.

### Typage d'un object JavaScript

```reason
type payload = {.
  "name": string,
  "age": int
};
let obj1: payload = {"name": "John", "age": 30};
```

Vous noterez que `{. name: string, age: int}` est la syntaxe requise pour la déclaration du type d'un object Reason/OCaml (pas d'un record !). Il est *lifté* dans `Js.t` afin que  BuckleScript voit le type entier et le compile correctement dans un objet JavaScript normal. D'habitude, les objets OCaml *non-liftés* sont compilés en quelque chose de différent (et rarement nécessaire d'ailleurs).

### Binding avec un Module JavaScript via Default Export

En supposant que le module est nommé `store.js`, et a un export par défault ainsi qu'une méthode `getDate`.

```reason
type store = {. "getDate": [@bs.meth] (unit => float)};
[@bs.module] external store : store = "./store";

Js.log(store);
Js.log(store##getDate());
```

### Vérification des types nuls JavaScript en utilisant le type `option`

Pour une fonction dont l'argument passé est une valeur JavaScript potentiellement `null` ou `undefined`, il faut penser à le convertir en un `option` Reason. La conversion se fait par l'intermédiaire des fonctions helpers du module Bucklescript [`Js.Nullable`](http://bucklescript.github.io/bucklescript/api/Js.html#TYPEnullable). Dans le cas d'espèce, `to_opt`:

```reason
let greetByName = (possiblyNullName) => {
  let optionName = Js.Nullable.to_opt(possiblyNullName);
  switch optionName {
  | None => "Hi"
  | Some(name) => "Hello " ++ name
  }
};
```

Cette vérification compile en `possiblyNullName == null` en JavaScript, alors vérifiez la présence de `null` ou `undefined`.
