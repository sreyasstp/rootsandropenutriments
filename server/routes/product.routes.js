const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/product.controller");
// const adminAuth = require("../middlewares/adminAuth"); // later

router.post("/", ctrl.createProduct);
router.get("/", ctrl.getProducts);
router.get("/:id", ctrl.getProduct);
router.put("/:id", ctrl.updateProduct);
router.delete("/:id", ctrl.deleteProduct);

module.exports = router;
