import { Router, Switch, Route } from 'react-router';
import App from 'views/App/App';
import HouseDetail from 'views/HouseDetail/HouseDetail';

const routes = (history) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/detail" component={HouseDetail} />
            </Switch>
        </Router>
    )
}

export default routes;
