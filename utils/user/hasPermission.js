module.exports = (user, model, action) => {
  if (typeof user.permissions === 'string') user.permissions = JSON.parse(user.permissions);
  return user.permissions[model][action];
};