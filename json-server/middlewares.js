const _ = require('lodash');

const jsonServer = require('json-server');
const router = jsonServer.router(require('./data/db.js')());

module.exports = (req, res, next) => {
  // login
  if (req.method === 'POST' && req.path === '/signin') {
    const user = req.body;

    console.log(`Login for user: ${user.username}`);

    let users = router.db.get('users').value().find(u => u.username === user.username);

    if (users) {
      //if (signinUser.password === user.password) {
      if (users.username === user.username) {
        res.status(200).json({'access_token': users.id});
      } else {
        res.status(400).json({message: 'wrong username/password'});
      }
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } else if (req.method === 'GET' && req.path === '/me') {
    const token = req.headers['authorization'];

    console.log(`Token: ${token}`);

    //let user = router.db.get('users').value().find(u => (u.token === token || ('Bearer ' + u.token) === token));
    let user = router.db.get('users').value().find(u => (u.id === token || ('Bearer ' + u.id) === token));

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }

  } else {
    next()
  }
};
