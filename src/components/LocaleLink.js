import React from "react"
import PropTypes from "prop-types"
import { Link, StaticQuery, graphql } from "gatsby"

const LocaleLink = ({ children, to, locale, ...other }) =>
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultLocale,
          supportedLocales,
        },
      },
    }) => {

      let localeTo = to

      if (!supportedLocales.includes(locale)) {
        locale = defaultLocale
      }

      // strip any existing locale from the pathname
      localeTo = localeTo.replace(/^\/\w{2}\//, "/")

      if (locale !== defaultLocale) {
        localeTo = `/${locale}${localeTo}`
      }

      return <Link
        to={localeTo}
        {...other}>
        {children}
      </Link>
    }} />

LocaleLink.propTypes = {
  to: PropTypes.string,
  locale: PropTypes.string
}

export default LocaleLink

const query = graphql`
  query SiteLocale {
    site {
      siteMetadata {
        supportedLocales,
        defaultLocale
      }
    }
  }
`
