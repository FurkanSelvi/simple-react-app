import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import registerServiceWorker from './worker';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

} else {
    navigator.serviceWorker
        .register(`${window.origin}/service-worker.js`)
        .then(registration => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                console.log('SKIP_WAITING')
                window.location.reload();
            }
        });
}

registerServiceWorker();
ReactDOM.render(<App />, document.getElementById('root'));

