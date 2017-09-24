import React from "react"

const langs = [
  {code: 'fr', name: 'Français'},
  {code: 'en', name: 'English'},
  {code: 'es', name: 'Español'},
];

const ru = {code: 'ru', name: 'русский'};

/* TODO ru only translates /guide... - this will help prevent 404s in short term
 * This should be replaces with a better mechanism. */
const getLangs = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.indexOf('/guide/') !== -1
    ? langs.concat(ru)
    : langs;
  }
  return null
}

const frBase = 'https://reasonml-fr.surge.sh';

const defaultBase = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? window.location.protocol + '//' + window.location.host
  : 'https://reasonml.github.io';

const currentCode = () => {
  if (typeof window !== 'undefined') {
    return langs.map(l => l.code).find(s => s === window.location.pathname.split("/")[1]) ||
      (frBase.indexOf(window.location.hostname) !== -1
        ? langs[0] /* fr is default on surge */
        : langs[1] /* en is default on github */
      ).code;
  }
}

const onChange = (e) => {
  const newLang = e.target.value;
  if (newLang !== currentCode() && typeof window !== 'undefined') {
    const path = window.location.pathname;
    const currentLang = getLangs().map(l => l.code).find(
      s => s === path.split('/')[1]
    );
    const currentLangRe = new RegExp(`\/${currentLang}(/|\$)`)
    if (newLang === 'en') {
      window.location = defaultBase + path.replace(currentLangRe, '/');
    } else if (newLang === 'fr') {
      window.location = frBase + path.replace(currentLangRe, '/');
    } else if (currentLang) {
      window.location = defaultBase + path.replace(
        currentLangRe,
        `/${newLang}/`
      );
    } else {
      window.location = defaultBase + '/' + newLang + path;
    }
  }
}

export default () => (
  getLangs()
  ? <select css={styles.select} value={currentCode()} onChange={onChange}>
      {getLangs().map(({code, name}) =>
        <option key={code} value={code}>{name}</option>)}
    </select>
  : null
);

const styles = {
  select: {
    minWidth: 40,
  },
}
