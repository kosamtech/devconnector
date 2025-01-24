import jwt from "jsonwebtoken";
import config from "config";
import { NextFunction, Response } from "express";
import { IRequest } from "../generic-types";

export const authMiddleware = (
    req: IRequest,
    res: Response,
    next: NextFunction,
) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({
            errors: [
                {
                    msg: "Authentication details were not provided",
                },
            ],
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            config.get("jsonSecret"),
        ) as jwt.JwtPayload;
        req.user = decoded.user;

        next();
    } catch (error) {
        return res.status(401).json({
            errors: [
                {
                    msg: "Token is invalid",
                },
            ],
        });
    }
};
