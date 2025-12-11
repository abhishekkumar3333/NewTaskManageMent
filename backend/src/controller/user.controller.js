import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isExisting = await prisma.user.findUnique({
            where: { email }
        });

        if (isExisting) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



