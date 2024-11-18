require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/checkNumber", (req, res) => {

    try {
        const { number } = req.body;

        if(!number)
        {
            console.log(number)
            return res.status(400).json({
                success: true,
                message: "All fileds are required...",
                isIndia:true
            });
        }

        const normalizedNumber = number.replace(/[\s()-]/g, '');

        // Regex to check if the number starts with +91 or is a valid Indian number
        const indianNumberRegex = /^(\+91|91)?[6-9]\d{9}$/;

        if (indianNumberRegex.test(normalizedNumber)) {
            return res.status(200).json({
                success: true,
                message: "India"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "NRI",
                isIndia:true
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Server Error",
            error
        });
    }
})

app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT} port.`);
});