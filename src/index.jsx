import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './components/App/App';

import store from './store';
import * as FLAVORS from './constants/flavors';
import { actions } from './ducks/freezer';


setTimeout(() => {
    store.dispatch(actions.addProductToFreezer(FLAVORS.CHOCOLATE, 15));
}, 1500);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)
