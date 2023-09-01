const Review = require("../models/review.model");

const getReviews = async (req, res) => {
  try {
    const review = await Review.find();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};
