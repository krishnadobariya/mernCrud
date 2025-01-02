const user = require("../model/userModel");

exports.addUser = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNo } = req.body;
        if (!firstName, !lastName, !email, !mobileNo) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        const mobileNoExists = await user.findOne({ mobileNo }).lean();
        if (mobileNoExists) {
            return res.status(400).json({
                status: false,
                message: "User with the same Mobile No already exists!",
            });
        }
        const emailNoExists = await user.findOne({ email }).lean();
        if (emailNoExists) {
            return res.status(400).json({
                status: false,
                message: "User with the same email already exists!",
            });
        }
        const isAdded = new user({
            firstName,
            lastName,
            email,
            mobileNo,
        })
        await isAdded.save();
        return res.status(200).json({
            status: true,
            message: "Details added successfully!",
            data: isAdded
        });
    } catch (error) {
        console.error("error", error)
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await user.findOne({ _id: id })
        if (data) {
            const result = await user.findOneAndUpdate({ _id: id }, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobileNo: req.body.mobileNo,
                    email: req.body.email,
                }
            }, {
                new: true,
                useFindAndModify: false
            })

            return res.status(200).json({
                status: true,
                message: "User Data update successfully!"
            })

        } else {
            return res.status(401).json({
                status: false,
                message: "User Data not found!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error."
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const getUser = await user.findOne({ _id: id })
        if (getUser) {
            return res.status(200).json({
                status: true,
                message: "User data get successfully!",
                data: getUser
            })
        } else {
            return res.status(401).json({
                status: false,
                message: "User not found!",
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error."
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await user.deleteOne({ _id: id })
        if (deleteUser) {
            return res.status(200).json({
                status: true,
                message: "User data delete successfully!"
            })
        } else {
            return res.status(401).json({
                status: false,
                message: "User not found!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error."
        })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const getAllUser = await user.find()
        if (getAllUser) {
            return res.status(200).json({
                status: true,
                message: "All User data get successfully!",
                data: getAllUser
            })
        } else {
            return res.status(401).json({
                status: false,
                message: "User not found!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error."
        })
    }
}