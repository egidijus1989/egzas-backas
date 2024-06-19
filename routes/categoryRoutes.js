const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryControllers");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router
  .route("/")
  .post(authentication, categoryControllers.createCategory)
  .get(authentication, categoryControllers.getAllCategories);

router
  .route("/:id")
  .delete(authentication, categoryControllers.deleteCategory)
  .patch(authentication, categoryControllers.updateCategory)
  .get(authentication, categoryControllers.getCategory);

module.exports = router;
