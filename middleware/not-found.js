const notFound = (res, req) => res.status(404).send("Route does not exist");

module.exports = notFound;