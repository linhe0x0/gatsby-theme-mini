import React from 'react'
import Helmet from 'react-helmet'

const Analytics = ({ google }) => {
  const Ga = []

  if (google) {
    Ga.push(
      <script
        key="ga-script-1"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${google}`}
      />
    )
    Ga.push(
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

  return <Helmet>{google && Ga}</Helmet>
}

export default Analytics
