const Notice = require("../models/noticeModel");

//getAllNotices////////////////////////////////////////
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({
      createdAt: -1,
    });

    if (!notices) {
      throw new Error("There is no notices");
    }
    

    res.status(200).json({
      data: notices,
      success: true,
      error: false,
      message: "Notices loaded",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//getNotice////////////////////////////////////////
exports.getNotice = async (req, res) => {
  try {
    const notice = await Notice.findOne({ _id: req.params.id });

    if (!notice) {
      throw new Error("There is no such notice");
    }
    res.status(200).json({
      data: notice,
      success: true,
      error: false,
      message: "Notice loaded",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//createNotice////////////////////////////////////////
exports.createNotice = async (req, res) => {
  try {
    if (!req?.body?.title) {
      throw new Error("Missing notice title");
    }
    if (!req?.body?.description) {
      throw new Error("Missing notice description");
    }
    if (!req?.body?.price) {
      throw new Error("Missing notice price");
    }
    if (!req?.body?.category) {
      throw new Error("Missing notice category");
    }

    const newNotice = await Notice.create(req.body);

    res.status(201).json({
      data: newNotice,
      success: true,
      error: false,
      message: "New notice created",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//updateNotice////////////////////////////////////////
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      data: notice,
      success: true,
      error: false,
      message: "Notice updated",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//deleteNotice////////////////////////////////////////
exports.deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      data: [],
      success: true,
      error: false,
      message: "Notice deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//blockNotice////////////////////////////////////////
exports.blockNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      data: notice,
      success: true,
      error: false,
      message: "Notice blocked",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
