export const errorHandler = (err, req, res, next) => {
  if (err?.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  if (err?.name === "ValidationError") {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map(e => e.message),
    });
  }

  if (err?.code === 11000) {
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  if (err?.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || "Request failed",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};
