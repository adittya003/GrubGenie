const AppRouter = require("express").Router();
// this route is equivalent to "/cart" get method
AppRouter.get("/", (req, res) => {
  // logic for getting cart items
});
// this route is equivalent to "/cart" post method
AppRouter.post("/", (req, res) => {
  // logic for adding item to cart
});
// this route is equivalent to "/cart/:id" delete method
AppRouter.delete("/:id", (req, res) => {
  // logic for deleting item from cart
});
module.exports = AppRouter;