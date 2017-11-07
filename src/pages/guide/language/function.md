---
title: Function
order: 100
---

_Cheatsheet avec la syntaxe complète des fonctions tout en bas_

Pouvez-vous croire que nous n'avions toujours parlé de fonction jusqu'à présent ?

Les fonctions sont déclarées avec une flèche et retournent une expression.

```reason
let greet = (name) => "Hello " ++ name;
```

Nous déclarons ici une fonction et lui assignons le nom `greet`, qu'on peut ensuite appeler de cette façon :

```reason
greet("world!"); /* "Hello world!" */
```

Les fonctions à plusieurs arguments séparent ces derniers par une virgule :

```reason
let add = (x, y, z) => x + y + z;
add(1, 2, 3); /* 6 */
```

Pour des fonctions plus longues, vous entourerez le corps de la fonction d'un bloc : 

```reason
let greetMore = (name) => {
  let part1 = "Hello";
  part1 ++ " " ++ name
};
```

### Aucun argument

Une fonction prend toujours un argument. Mais parfois, nous l'utilisons pour gérer des *side-effects* par exemple, et n'avons rien à lui passer. Dans d'autres langages, nous passions conceptuellement «no argument». En Reason, chaque fonction prend un argument. Ici, nous avons passé la valeur `()`par convention, appelée "*unit*".

```reason
/* reçoit & destructure l'argument unitaire */
let logSomething = () => {
  print_endline("hello");
  print_endline("world");
};

/* appelle la fonction avec la valeur de type unit */
logSomething();
```

`()` est une valeur tout à fait normale, la valeur unique possible dans `unit`. Reason lui a donné une syntaxe spéciale par soucis de commodité.

### Arguments labellisés
Les fonctions multi-arguments, en particulier celles dont les arguments sont du même type, peuvent être source de confusion lors des appels.

```reason
let addCoordinates = (x, y) => {
  /* utilisez x et y ici */
};
...
addCoordinates(5, 6); /* lequel est x, lequel est y? */
```

En OCaml/Reason, vous pouvez attacher des labels à un argument :

```reason
let addCoordinates = (~x, ~y) => {
  /* utilisez x et y ici */
};
...
addCoordinates(~x=5, ~y=6);
```

Étant donné que nous avons la *curryfication* (plus à ce sujet ci-dessous), nous pouvons fournir les arguments **dans n'importe quel ordre** :

```reason
addCoordinates y::6 x::5;
```

La partie `~x` de la déclaration signifie que la fonction accepte un argument avec le label `x`, et peut y référer dans le corps de la fonction avec le même nom. Vous pouvez également faire référence aux arguments dans le corps de la fonction par un nom différent, par soucis de concision : 

```reason
let drawCircle = (~radius as r, ~color as c) => {
  setColor(c);
  startAt(r, r);
  ...
};


drawCircle(~radius=10, ~color="red");
```

En effet, `(~radius)` est juste un raccourci (appelé **punning**) pour `(~radius as radius)`.

Voici la syntaxe pour typer des arguements :

```reason
let drawCircle = (~radius as r: int, ~color as c: string) => ...;
```

#### Curryfication

Les fonctions Reason peuvent être automatiquement appelées **en partie** :

```reason
let add = (x, y) => x + y;
let addFive = add(5);
let eleven = addFive(6);
let twelve = addFive(7);
```

En fait, le `add` ci-dessus n'est rien d'autre que du *sucre syntaxique* pour :

```reason
let add = (x, y) => x + y;
```

OCaml optimise ceci pour [éviter l'allocation inutile de fonctions](/try/?reason=DYUwLgBAhgJjEF4IAoAeBKRA+FBPTCOqEA1BLgNwBQVA9AFQTAD2zA1tJGABYgTMBXMAAchAQmhwAYgEsAbnxkBnaBAD6SmQDsA5qDUQAZgK0BjMDOZaIpqMGAT6tKqEiwYshYkkxkAVnRqF3AITWIkd08QZABGQKA) (2 fonctions ici) chaque fois qu'il le peut ! De cette façon, nous obtenons :

- une belle syntaxe
- la curryfication sans effort supplémentaire (chaque fonction prend un seul argument, en fait !)
- aucun coût de performance

### Arguments labellisés optionnels

Les arguments labellisés d'une fonction peuvent être rendus facultatifs lors de sa déclaration. Vous pouvez ensuite les omettre lors de l'appel de la fonction.

```reason
/* radius est facultatif */
let drawCircle = (~color, ~radius=?, ()) => {
  setColor(color);
  switch radius {
  | None => startAt(1, 1);
  | Some(r_) => startAt(r_, r_);
  }
};
```

Lorsqu'il est fourni dans cette syntaxe, `radius` est **englobé** dans le type `option` de la librairie standard, qui vaut par défaut `None`. S'il est fourni, `radius` sera enveloppé d'un `Some`. Donc la valeur du type de `radius` vaut soit `None` soit `Some int` ici.

**Note**: `None | Some(foo)` est un type de structure de données appelé *variant* et est décrit [plus loin](/guide/language/variant). Ce type de variant particulier, fourni par la librairie standard, est appelé `option`. Sa définition ressemble à : `type option('a) = None | Some('a)`.

**Notez** l'unit `()` à la fin de `drawCircle`. Sans ça, vu que `radius` et `color` sont tous deux labellisés, peuvent être curryfiés, et peuvent être appliqués sans ordre spécifique, il n'est pas évident de comprendre ce que siginifie :

```reason
let whatIsThis = drawCircle(~color);
```

Est-ce que `whatIsThis` est une fonction `drawCircle` curryfiée, qui attend que l'argument optionnel `radius` soit appliqué ? Ou bien a-t-il fini de s'appliquer ? Pour résoudre cette confusion, ajoutez un argument positionnel (aka non-labellisé) à `drawCircle` (par convention `()`), et OCaml, en règle générale, supposera que l'argument marqué optionnel est omis lorsque l'argument positionnel est fourni.

```reason
let curriedFunction = drawCircle(~color);
let actualResultWithoutProvidingRadius = drawCircle(~color, ());
```

#### Optionnel passé explicitement

Parfois, vous pouvez vouloir transférer une valeur à une fonction sans savoir si la valeur est `None` ou `Some a`. Naïvement, vous feriez :

```reason
let result =
  switch payloadRadius {
  | None => drawCircle(~color, ())
  | Some(r) => drawCircle(~color, ~radius=r, ())
};
```

Cela devient rapidement fastidieux. Nous fournissons un raccourci :

```reason
let result = drawCircle(~color, ~radius=?payloadRadius, ());
```

Ceci signifie "Je comprends que `radius` est optionnel, et que lorsque je lui passe une valeur, il doit s'agir d'un `int`. Mais je ne sais pas si la valeur que je passe est `None` ou `Some(val)`, alors je vais passer toute le wrapper `option`".

#### Optionnel avec valeur par défaut

Il est aussi possible de définir une valeur par défaut pour les arguments labellisés optionnels. Dans ce cas, ils ne sont pas englobés dans un type `option`.

```reason
let drawCircle = (~radius=1, ~color, ()) => {
  setColor(color);
  startAt(radius, radius)
};
```

#### Fonctions récursives

Par défaut, un valeure ne peut pas voir un binding qui pointe sur elle, mais on peut rendre cela possible en incluant le mot-clé `rec` dans un binding `let`. Cela permet aux fonctions de pouvoir accéder à elles-mêmes et de s'appeler, nous donnant ainsi le Pouvoir de la Récursivité.

```reason
let rec neverTerminate = () => neverTerminate();
```

#### Fonctions mutuellement récursives

Les fonctions mutuellement récursives commencent comme un simple fonction récursive en utilisant le mot-clé `rec`, et sont chaînées avec `and`:

```reason
let rec callSecond = () => callFirst()
and callFirst = () => callSecond();
```

**Notez** qu'il n'y a aucun point-virgule à la fin de la première ligne, ni de `let` à la seconde.

### Conseils & astuces

Cheatsheet pour les différentes syntaxes d'une fonction :

#### Déclaration

```reason
/* fonction anonyme. Listé uniquement par soucis d'exhaustivité */
(x) => (y) => 1;
/* sucre syntaxique de la version ci-dessus */
(x, y) => 1;
/* assigner à un nom */
let add = (x, y) => 1;

/* avec labels */
let add = (~first as x, ~second as y) => x + y;
/* avec sucre syntaxique pour le punning */
let add = (~first, ~second) => first + second;

/* labels avec valeur par défaut */
let add = (~first as x=1, ~second as y=2) => x + y;
/* avec le punning */
let add = (~first=1, ~second=2) => first + second;

/* optionnel */
let add = (~first as x=?, ~second as y=?) => switch x {...};
/* avec le punning */
let add = (~first=?, ~second=?) => switch first {...};
```

##### Avec annotation de type

```reason
/* fonction anonyme */
(x: int) => (y: int): int => 1;
/* sucre syntaxique de la version ci-dessus */
(x: int, y: int): int => 1;
/* assigner à un nom */
let add = (x: int, y: int): int => 1;

/* avec labels */
let add = (~first as x: int, ~second as y: int) : int => x + y;

/* labels avec valeur par défaut */
let add = (~first as x: int=1, ~second as y: int=2) : int => x + y;

/* optionnel */
let add = (~first as x: option(int)=?, ~second as y: option(int)=?) : int => switch x {...};
/* avec sucre syntaxique pour le punning */
/* notez que l'appelant passerait un `int` et non `option int` */
/* À l'intérieur de la fonction, `first` et `second` sont des `option int`. */
let add = (~first: option(int)=?, ~second: option(int)=?) : int => switch first {...};
```

#### Appel

```reason
/* appel anonyme. Listé uniquement par soucis d'exhaustivité */
add(x)(y);

/* sucre syntaxique de la version ci-dessus. */
add(x, y);

/* avec labels */
add(~first=1, ~second=2);

/* avec sucre syntaxique pour le punning */
add(~first, ~second);

/* appel avec valeur par défaut. Pareil qu'un appel normal */
add(~first=1, ~second=2);

/* appel avec optionnel explicite */
add(~first=?Some(1), ~second=?Some(2));

/* avec le punning */
add(~first?, ~second?);
```

##### Avec annotation de type

```reason
/* appel anonyme */
add(x: int)(y: int);

/* avec labels */
add(~first=1: int, ~second=2: int);

/* avec sucre syntaxique pour le punning */
add(~first: int, ~second: int);

/* appel avec valeur par défaut. Pareil qu'un appel normal */
add(~first=1: int, ~second=2: int);

/* appel avec optionnel explicite */
add(~first=?Some(1): option(int), ~second=?Some(2): option(int));

/* avec sucre syntaxique pour le punning */
 +add(~first: option(int)?, ~second: option(int)?);
```

#### Signature de type autonome

```reason
/* premier argument de type, second argument de type, type retourné */
type foo = int => int => int;
/* sucre syntaxique de la version ci-dessus */
type foo = (int, int) => int;

/* avec labels */
type foo = (~first: int, ~second: int) => int;

/* labels avec valeur par défaut */
type foo = (~first: int=?, ~second: int=?) => int;
```

##### Dans les fichiers d'interface

Pour annoter une fonction à partir du fichier d'implémentation (`.re`) :

```reason
let add: int => int => int;
/* sucre syntaxique de la version ci-dessus */
let add: (int, int) => int;
```

Mêmes règles que la section précédente, à l'exception du remplacement de `type foo = bar` par `let add: bar`.

**Ne confondez pas** ceci avec une exportation réelle d'un type dans le fichier d'interface. `let add: bar` annote un valeur `bar` existante depuis le fichier d'implémentation. `type foo = bar` exporte un type de même forme à partir du fichier d'implémentation.
