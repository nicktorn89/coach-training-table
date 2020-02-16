import Helmet from 'preact-helmet';
import { Fragment } from 'preact';

import Main from './modules/Main';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  require('preact/debug');
}

const App = () => (
  <Fragment>
    <Helmet
      htmlAttributes={{ lang: 'ru', amp: undefined }}
      titleAttributes={{ lang: 'ru' }}
      script={[
        { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-158653337-1' },
        {
          type: 'text/javascript',
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-158653337-1');
          `,
        },
      ]}
      noscript={[
        { innerHTML: '<span>Пожалуйста включите JavaScript для работы с сайтом</span>' },
      ]}
    />
    <Main />
  </Fragment>
);

export default App;
