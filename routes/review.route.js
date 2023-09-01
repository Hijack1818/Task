const express = require("express");

const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

const router = express.Router();

/* Creating the routes for the product controller. */
router.get("/", getReviews);

router.post("/new/", createReview);

router.patch("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;
