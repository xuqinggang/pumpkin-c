import { Router, Switch, Route } from 'react-router';
import App from 'views/App/App';
import HouseDetail from 'views/HouseDetail/HouseDetail';
import HouseList from 'views/HouseList/HouseList';

const routes = (history) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/detail" component={HouseDetail} />
                <Route exact path="/list" component={HouseList} />
            </Switch>
        </Router>
    )
}

export default routes;
