const express = require("express");
const router = express.Router();
const {
    check,
    validationResult
} = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../../models/users");

// @route   GET api/users
// @desc     Register User
// @access  Public
router.post(
    "/",
    [
        check("email", "Email is required").isEmail(),
        check(
            "password",
            "Please entre a password with 6 or more characters"
        ).isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            email,
            password
        } = req.body;
        try {
            let user = await userModel.findOne(email);
            if (user) {
                return res.status(400).json({
                    success: false,
                    errors: [{
                        mgs: "Email already exists"
                    }]
                });
            } else {
                let hash = bcrypt.hashSync(password, 10);
                let result = await userModel.register(email, hash);
                if (result) {
                    return res.status(503).json({
                        success: true,
                        mgs: "user registered successfully"
                    });
                } else {
                    return res.status(503).json({
                        success: false,
                        errors: [{
                            mgs: "error occured on the database"
                        }]
                    });
                }
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;