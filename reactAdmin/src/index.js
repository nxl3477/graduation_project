import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import axios from './http'
import './store/constants'
import '@icedesign/base/reset.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
