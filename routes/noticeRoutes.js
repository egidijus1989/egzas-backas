const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/noticeController");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router
  .route("/")
  .post(authentication, noticeController.createNotice)
  .get(authentication, noticeController.getAllNotices);

router
  .route("/:id")
  .delete(authentication, noticeController.deleteNotice)
  .patch(authentication, noticeController.updateNotice)
  .get(authentication, noticeController.getNotice)

router.patch("/block/:id", authentication, noticeController.blockNotice);

module.exports = router;
