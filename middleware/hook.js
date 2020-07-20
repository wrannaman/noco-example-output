
module.exports = (req, res, next) => {
  /*
  Middleware layer called before every route.
  Here you could de-code an auth token, or other stuff!
  */
  return next();
}
