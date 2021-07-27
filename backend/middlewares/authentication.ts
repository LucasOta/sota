import { NextFunction, Response } from "express";
import Token from "../classes/token";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const userToken = req.get("x-token") || "";

  Token.checkToken(userToken)
    .then((decoded: any) => {
      req.user = decoded.user;
      next();
    })
    .catch((err) => {
      res.json({
        ok: false,
        desc: "The token is incorrect",
      });
    });
};
