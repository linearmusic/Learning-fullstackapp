const {Router} = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userModel = require("../db");
const { userMiddleware } = require("../middlewares/user");

userRouter.post("/signup", async (req, res) => {
    const {userId, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            userid: userId,
            password: hashedPassword
        });
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: "User already exists" });
    }
});

userRouter.post("/signin", async (req, res) => {
    const {userId, password} = req.body;
    try {
        const user = await userModel.findOne({ userid: userId });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

userRouter.get("/1", userMiddleware, (req, res) => {
    res.json({ message: "Protected route accessed successfully!" });
});

module.exports = userRouter;