import React from "react"
import LanguageSelect from './LanguageSelect'
import Link from "./Link"
import { accent } from "../utils/colors"
import { headerFontFamily } from '../utils/typography'

const links = [
  {
    target: '/guide/javascript/quickstart',
    title: 'Démarrer',
  },
  {
    target: '/try/',
    title: 'Éditeur',
  },
  {
    target: '/guide/',
    title: 'Guide',
  },
  {
    target: '/api/index.html',
    title: 'API',
  },
  {
    target: '/community/',
    title: 'Communauté',
  },
  {
    target: '/community/blog/',
    title: 'Blog',
  },
  {
    target: 'https://github.com/facebook/reason',
    title: 'GitHub',
  },
]


export default class HeaderNav extends React.Component {
  render() {
    return (
      <div css={styles.linkContainer}>
        {links.map(link => (
          <Link css={styles.link} to={link.target} key={link.target}>
            {link.title}
          </Link>
        ))}
        <LanguageSelect />
      </div>
    )
  }
}

const styles = {
  link: {
    padding: '0 15px',
    whiteSpace: 'nowrap',
    '@media(max-width: 550px)': {
      padding: '0 5px',
      fontSize: '.9em',
    },
    '@media(max-height: 770px)': {
      fontSize: '.9em',
    }
  }, 
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    fontFamily: headerFontFamily(),
  },
}
