import mongoose from "mongoose";
import { IRequest } from "../generic-types";
import { NextFunction, Response } from "express";

export const checkObjectId =
    (idToCheck: string) =>
    (req: IRequest, res: Response, next: NextFunction) => {
        if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) {
            return res.status(400).json({ msg: "Invalid ID" });
        }
    };
