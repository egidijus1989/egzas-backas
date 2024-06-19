exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failed",
        message: "You do not have a permission to this action",
      });
    } else {
      next();
    }
  };
};
