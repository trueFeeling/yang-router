import Router from '../src/Router';
import home from './routes/home';
import about from './routes/about';
import order from './routes/order';
import find from './routes/find';
import check from '../src/middleWare/check';
export const app = new Router('router','hash');
app.use(check);
app.route('/', home);
app.route('', home);
app.route('/home/:brand', home);
app.route('/order/:type', order);
app.route('/find/:what', find);
app.route('/about/:user', about);
