const Usermodel = require("../model/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) {
        return res.json({ message: "Wrong Email or password" });
    }
    try {
        const hasmatch = await bcrypt.compare(password, user.password);
        if (hasmatch) {
            const jwttoken = jwt.sign(user.toJSON(), "12@g", { expiresIn: 180 });
            res.json({ jwttoken, user });
        } else {
            res.json({ message: "Wrong Email or password" });
        }
    } catch (err) {
        res.json({ message: "oops something went wrong" });
    }
};

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const alreadyuser = await Usermodel.findOne({ email });
    if (alreadyuser) {
        return res.json({ message: "Email already present" });
    }
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new Usermodel({ name, email, password: hashedpassword });
        const saveduser = await user.save();
        const jwttoken = jwt.sign(user.toJSON(), "12@g", { expiresIn: 180 });
        res.json({ jwttoken, user: saveduser });
    } catch (err) {
        res.json({ message: "something went wrong" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, password } = req.body;
        if (name && password) {
            const hashedpassword = await bcrypt.hash(password, 10);
            const updateduser = await Usermodel.findByIdAndUpdate(id, { name, password: hashedpassword }, { new: true });
            return res.json({ updateduser });
        } else if (password) {
            const hashedpassword = await bcrypt.hash(password, 10);
            const updateduser = await Usermodel.findByIdAndUpdate(id, { password: hashedpassword }, { new: true });
            return res.json({ updateduser });
        } else {
            const updateduser = await Usermodel.findByIdAndUpdate(id, { name }, { new: true });
            return res.json({ updateduser });
        }
    } catch (err) {
        res.json({ message: "something went wrong" });
    }
};

// Exporting controller functions
module.exports = {
    login,
    register,
    updateUser
};