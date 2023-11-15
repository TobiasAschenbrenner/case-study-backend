import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(CreateError(401, "Access denied, token missing!"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(CreateError(403, "Access denied, invalid token!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) return next();
    return next(CreateError(403, "Access denied, invalid token!"));
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) return next();
    return next(CreateError(403, "Access denied, invalid token!"));
  });
};
