import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Section } from './components/Section';

declare let module: any

class App extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter basename="/Seans-TypeScript-ReactJS-Redux-Boilerplate/">
                <div>
                    <NavBar></NavBar>
                    <div className="container">
                        <Switch>
                            <Route path='/' exact render={() => <Section sub="Home" />} /> />
                            <Route path='/cats' render={() => <Section sub="Cats" />} /> />
                            <Route path='/dogs' render={() => <Section sub="Dogs" />} /> />
                            <Route path='/birds' render={() => <Section sub="Birds" />} /> />
                        </Switch>
                    </div>
                    <Footer url="https://github.com/Sean-Bradley/Seans-TypeScript-ReactJS-Redux-Boilerplate"></Footer>
                </div>
            </BrowserRouter>
        )
    }
}

const store = createStore(reducers)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}

