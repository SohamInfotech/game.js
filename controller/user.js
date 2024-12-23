const userModel = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "sohamkubavat72@gmail.com",
        pass: "tavyunsyfbtmycnf",
    },
});
async function main(email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'sohamkubavat72@gmail.com',  // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

exports.createUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const data = await userModel.create(req.body)

        res.status(200).json({
            status: "success",
            Message: 'user create succesfullly',
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            Message: error.Message
        })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const logindata = await userModel.findOne({ email: req.body.email });
        if (!logindata) throw new Error("Invalid email");

        const verypassword = await bcrypt.compare(req.body.password, logindata.password);
        if (!verypassword) throw new Error('Invalid password');

        const token = jwt.sign({ id: logindata._id }, 'verify');
        main(req.body.email)

        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: logindata,
            token
        });

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};