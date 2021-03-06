---
title: Cheatsheet de la syntaxe
order: 1
---

Nous avons travaillé très dur pour que Reason ressemble à JavaScript tout en conservant les superbes sémantiques et types d'OCaml. En espérant que vous apprécierez !


### Binding let

JavaScript                  |   Reason
----------------------------|--------------------------------
`const x = 5;`              |  `let x = 5;`
`var x = y;`                |  Pas d'équivalent (heureusement)
`let x = 5; x = x + 1;`         |  `let x = ref(5); x := x^ + 1;`

### String & Char

JavaScript                  |   Reason
----------------------------|--------------------------------
`"Hello world!"`            |  Idem
`'Hello world!'`            |  Strings doivent utiliser `"`
Caractères sont des strings |  `'a'`
`"hello " + "world"`        |  `"hello " ++ "world"`

### Boolean

JavaScript                |   Reason
--------------------------|--------------------------------
`true`, `false`                      |  `true`, `false` \*
`!true`                              |  Idem
`||`, `&&`, `<=`, `>=`, `<`, `>`     |  Idem
`a === b`, `a !== b`                 |  Idem
Pas d'égalité profonde (compaison récursive) |  `a == b`, `a != b`
`a == b`                             |  Pas d'égalité avec le casting implicite (heureusement)

\* C'est l'équivalent spirituel en Reason. Cela ne veut pas dire qu'il compile en `true`/`false` JavaScript ! Pour compiler en ce dernier, utilisez `Js.true_`/`Js.false_`. Voir [ici](/guide/language/boolean#usage).

### Number

JavaScript                |   Reason
--------------------------|--------------------------------
`3`                         |  Idem \*
`3.1415`                    |  Idem
`3 + 4`                     |  Idem
`3.0 + 4.5`                 |  `3.0 +. 4.5`
`5 % 3`                     |  `5 mod 3`

\* JavaScript ne fait pas de distinction entre les integers et les floats.

### Object/Record

JavaScript                |   Reason
--------------------------|--------------------------------
pas de types statiques          |  `type point = {x: int, mutable y: int}`
`{x: 30, y: 20}`          |  Idem\*
`point.x`                 |  Idem
`point.y = 30;`           |  Idem
`{...point, x: 30}`       |  Idem

\* C'est l'équivalent spirituel en Reason. Cela ne veut pas dire qu'il compile en `object` JavaScript ! Pour compiler en ce dernier, voir [ici](/guide/language/object#tip--tricks).

### Array

JavaScript                |   Reason
--------------------------|--------------------------------
`[1, 2, 3]`               |  `[|1, 2, 3|]`
`myArray[1] = 10`         |  Idem
`[1, "Bob", true]` \*     |  `(1, "Bob", true)`
No immutable list         |  `[1, 2, 3]`

\* Nous pouvons simuler les tuples en JavaScript avec des arrays, car ils peuvent contenir plusieurs types d'éléments différents.

### Null

JavaScript                |   Reason
--------------------------|--------------------------------
`null`, `undefined`       |  `None` \*

\* Encore une fois, seulement un équivalent spirituel. Raison n'a pas de nulls, ni des bugs nulls ! Mais il existe [un type option](/guide/examples#using-the-option-type) lorsque vous avez réellement besoin de la nullité.

### Function

JavaScript                            |   Reason
--------------------------------------|--------------------------------
`arg => retVal`                       |  `(arg) => retVal`
`function named(arg) {...}`           |  `let named = (arg) => ...`
`const f = function(arg) {...}`       |  `let f = (arg) => ...`
`add(4, add(5, 6))`                   |  Idem

#### Blocks

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
const myFun = (x, y) => {
  const doubleX = x + x;
  const doubleY = y + y;
  return doubleX + doubleY
};</pre>
    </td>
    <td>
      <pre>
let myFun = (x, y) => {
  let doubleX = x + x;
  let doubleY = y + y;
  doubleX + doubleY
};</pre>
    </td>
  </tr>
</table>

#### Curryfication

JavaScript                |   Reason
--------------------------|--------------------------------
`let add = a => b => a + b`       |  `let add = (a, b) => a + b`

Aussi bien JavaScript que Reason supportent la curryfication, mais la curryfication Reason est **intégrée et optimisée pour éviter les affectations et les appels de fonctions intermédiaires**, chaque fois que cela est possible.

### If-else

JavaScript                |   Reason
--------------------------|--------------------------------
`if (a) {b} else {c}`     |  Idem \*
`a ? b : c`               |  Idem
`switch`                  |  `switch` mais [survitaminé](/guide/language/pattern-matching)

\* Les conditionnels en Reason sont toujours des expressions !

### Destructuring

JavaScript                |   Reason
--------------------------|--------------------------------
`const {a, b} = data`             |  `let {a, b} = data`
`const [a, b] = data`             |  `let [|a, b|] = data` \*
`const {a: aa, b: bb} = data`     |  `let {a: aa, b: bb} = data`

\* Produit un bon avertissement du compilateur selon lequel *data* peuvent ne pas être de longueur 2. Passez au pattern-matching à la place.

### Boucle

JavaScript                |   Reason
--------------------------|--------------------------------
`for (let i = 0; i <= 10; i++) {...}`             |  `for (i in 0 to 10) {...}`
`for (let i = 10; i >= 0; i--) {...}`             |  `for (i in 10 downto 0) {...}`
`while (true) {...}`                              |  Idem

### JSX

JavaScript                |   Reason
--------------------------|--------------------------------
`<Foo bar={1} baz="hi" onClick={bla} />`  |  Idem
`<Foo bar={bar} />`                       |  `<Foo bar />` \*
`<input checked />`                       |  `<input checked=true />`

\* Punning d'argument

### Exception

JavaScript                |   Reason
--------------------------|--------------------------------
`throw new SomeError(...)`  |  `raise(SomeError(...))`
`try (a) {...} catch (Err) {...} finally {...}`   |  `try a { | Err => ...}` \*

\* Pas de `finally`.

### Blocs

En Reason, les "expressions de séquence" sont créées avec `{}` et évaluent à leur dernière déclaration. En JavaScript, cela peut être simulé via une fonction anonyme immédiatement appelée (étant donné que les corps des fonctions ont leur propre scope local).

<table>
  <thead><tr> <th scope="col"><p >JavaScript</p></th> <th scope="col"><p>Reason</p></th></tr></thead>
  <tr>
    <td>
      <pre>
let res = (function() {
{
  const x = 23;
  const y = 34;
  return x + y;
})();</pre>
    </td>
    <td>
      <pre>
let res = {
  let x = 23;
  let y = 34;
  x + y
};</pre>
    </td>
  </tr>
</table>

### Comments

JavaScript                |   Reason
--------------------------|--------------------------------
`/* Comment */`  |  Same
`// line comment`  |  Coming soon
