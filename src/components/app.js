import Main from './modules/Main';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  require('preact/debug');
}

const App = () => <Main />;

export default App;
