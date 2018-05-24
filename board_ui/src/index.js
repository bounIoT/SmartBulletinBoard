import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Background from './background.jpg'

ReactDOM.render(<App style={{backgroundImage :`url(${Background})`}} />, document.getElementById('root'));
registerServiceWorker();
