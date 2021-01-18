import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export default function Analytics(props) {
  const { google } = props
  const ga = []

  if (google) {
    ga.push(
      <script
        key="ga-script-1"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${google}`}
      />
    )
    ga.push(
      <script key="ga-script-2">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${google}');
        `}
      </script>
    )
  }

  return <Helmet>{google && ga}</Helmet>
}

Analytics.propTypes = {
  google: PropTypes.string.isRequired,
}
