import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import normalize from "normalize-url";
import User from "../models/User";

const router = express.Router();

router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password must be at least 6 character").isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        const errros = validationResult(req);

        if (!errros.isEmpty()) {
            res.status(400).json({ errros: errros.array() });
            return;
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({
                    errors: [{ msg: "User already exists" }],
                });
                return;
            }

            const avatar = normalize(
                gravatar.url(email, {
                    s: "200",
                    r: "pg",
                    d: "mm",
                }),
                { forceHttps: true },
            );

            user = new User({
                name,
                email,
                password,
                avatar,
            });

            const salt = await bcrypt.genSalt(20);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(payload, config.get("jsonSecret"), {
                expiresIn: 36000,
                algorithm: "none",
            });

            res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message);
                return;
            } else {
                res.status(500).send(String(error));
                return;
            }
        }
    },
);

export default router;
