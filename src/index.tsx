import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './components/App/App';

import store from './store';
import * as FLAVORS from './constants/flavors';
import { actions } from './ducks/freezer';
import { UnknownAction } from 'redux';


setTimeout(() => {
    store.dispatch(actions.addProductToFreezer(FLAVORS.CHOCOLATE, 15) as unknown as UnknownAction); // Double cast
}, 1500);

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>,
    );
} else {
    console.error("Failed to find the root element");
}
