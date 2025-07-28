const rootRoute = (_req, res, next) => {
  res.send("Hello");
  next();
};
export default rootRoute;
