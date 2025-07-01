const express = require("express");
const router = express.Router();
const controller = require("../Server/controller.js");


router.route("/").get(controller.home);
router.route("/get").post(controller.create);
router.route("/admin").post(controller.admin_login);
router.route("/get-data").get(controller.get_data);
router.route("/forgotpassword").post(controller.forgot_pass);
router.route("/resetpassword").post(controller.reset_password);


module.exports = router;