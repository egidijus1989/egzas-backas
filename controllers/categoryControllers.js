const Category = require("../models/categoryModel");

//getAllCategories////////////////////////////////////////
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });
    if (!categories) {
      throw new Error("There is no categories");
    }
    res.status(200).json({
      data: categories,
      success: true,
      error: false,
      message: "Categories loaded",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//getCategory////////////////////////////////////////
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      throw new Error("There is no such category");
    }
    res.status(200).json({
      data: category,
      success: true,
      error: false,
      message: "Category loaded",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//createAutoService////////////////////////////////////////
exports.createCategory = async (req, res) => {
  try {
    if (!req?.body?.title) {
      throw new Error("Missing category title");
    }

    const newCategory = await Category.create(req.body);

    res.status(201).json({
      data: newCategory,
      success: true,
      error: false,
      message: "Category created",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//updateAutoService////////////////////////////////////////
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      data: category,
      success: true,
      error: false,
      message: "Category updated",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//deleteAutoService////////////////////////////////////////
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      data: [],
      success: true,
      error: false,
      message: "Category deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
