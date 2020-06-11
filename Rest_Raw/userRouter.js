const router = require("express").Router();
const User = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const message = require("./constans")

router.post("/register",async (req,res) => {
    try{
        var emailExist = await User.findOne({email: req.body.email})
        if(emailExist){
            return res.status(200).json(message.error_emailExist)
        }else{      
            var hash = await bcrypt.hash(req.body.password,10);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });
            let data = await user.save();
            res.json({ data,
                       success:message.success_register
                    })
        }
    }catch(err){
        res.status(400).json(err)
    }
})

router.post("/login",async (req,res) => {
    try{
        var userdata = await User.findOne({email: req.body.email})
        if(!userdata){
            return res.status(200).json(message.error_emailNotExist)
        }else{
            var validpass = await bcrypt.compare(req.body.password,userdata.password);
            if(!validpass){
                return res.status(200).json(message.error_passwoardNotValid)
            }
            else{
                var userToken = await jwt.sign({
                    email: userdata.email
                },"playground", { expiresIn: "1h" });
                res.header("auth",userToken).send({
                    userToken,
                    success: "Login Seccess",
                    name: userdata.name,
                    email: userdata.email});
            }
        }
    }catch(err){
        res.status(400).json(err)
    }
})


const validUser = (req,res,next)=>{
    var token = req.header("auth");
    req.token = token;
    next();
}

router.get("/getAll", validUser,async (req,res) =>{
    jwt.verify(req.token,"playground", async (err, data)=>{
        if(err){
            res.sendStatus(403)
        } else {
            const allData = await User.find().select(["-password"]);
            res.json(allData)
        }
    })
})

module.exports = router;