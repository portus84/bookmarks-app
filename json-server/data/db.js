module.exports = () => {
  return Object.assign({},
    require('./db/bookmarks.json'),
    require('./db/users.json')
  );
};
