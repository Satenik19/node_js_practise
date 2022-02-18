import users_ctrl  from '../controllers/users_ctrl.js';

const routes = function (express) {
    const route = express.Router();

    route.get('/user', users_ctrl.getAll);
    route.get('/user/:id', users_ctrl.getById);
    route.post('/user', users_ctrl.save);
    route.put('/user/:id', users_ctrl.update);
    route.delete('/user/:id', users_ctrl.delete);
    return route;
};

module.exports = routes;
export default routes;