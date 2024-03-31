import React from 'react'
import { Helmet } from 'react-helmet'

export default function Helemt({title}) {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
    )
}
