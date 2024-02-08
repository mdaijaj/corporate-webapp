const UserDetail = require('../models/user_model')
const Bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


exports.createUserDetails = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    mobile,
    password,
    role_name,
  } = req.body;

  const salt = await Bcrypt.genSalt(10);
  let hashedPassword;
  if(password){
    hashedPassword = await Bcrypt.hash(password, salt);
    console.log("hashedPassword", hashedPassword)
  }


  try {
    const UserdetailData = await UserDetail.create({
      first_name,
      last_name,
      email,
      mobile,
      password: hashedPassword,
      role_name,
    })
    return res.status(200).send({
      message: "create successfully!", data: UserdetailData
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the UserdetailData."
    });
  }
}


//signin user
exports.signin= async (req,res)=>{
  try{
      const {email, password}=req.body;
      if(!password || !email){
          res.status(400).send("please fill the data...");
      }
      let agent_detail =await UserDetail.findOne({email: email})
      console.log("agent_detail", agent_detail)
      if(agent_detail){
          const isMatch=await Bcrypt.compare(password, agent_detail.password);
          if(!isMatch){
              return res.status(400).send({error: "Invalid Credentials", data: null})
          }

          // console.log("encrypted password match success!")
          let token =await jwt.sign({ agent_detail: agent_detail }, process.env.SECRET || "aijajkhan", {expiresIn: 86400 }); // expires in 24 hours
          // let token= await userInfo.generateAuthToken();
          res.cookie("jwtToken", token, {
              expires: new Date(Date.now()+ 300000000),
              httpOnly: true
          });
          res.send({
              token: token,
              userInfo: agent_detail,
              status: 200,
              message: "login Success"
          })
      }else{
          res.status(400).send({error: "email not verified please email verified...", code: 403})
      }     
  }
  catch(err){
      console.log(err.message)
      res.send("there is problem to login...", err.message)
  } 
}





exports.getUserList = async (req, res) => {
  try {
    const UserdetailData = await UserDetail.find({status: true})
    console.log("UserdetailData", UserdetailData)
    if (UserdetailData) {
      res.status(200).send({ message: "get all UserdetailData list", data: UserdetailData })
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.getUserDetails = async (req, res) => {
  try {
    console.log(req.params.id)
    const restData = await UserDetail.findById({
      _id: req.params.id, status: true
    })
    console.log("restData", restData)
    if (!restData || restData == undefined) {
      return res.send("not found restaurant")
    }
    return res.status(200).send({
      message: "user resitered save data",
      data: restData
    })
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.editUserDetails = async (req, res) => {
  try {

    const userdata = await UserDetail.find({ _id: req.params.id });
    // await uderdata.save({validateBeforeSave: false});
    console.log(req.body)
    if (userdata) {
      const updateData = await UserDetail.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "update data successfully! ", "result": updateData })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.deleteUser = async (req, res) => {
  try {

    const userdata = await UserDetail.find({ _id: req.params.id });
    if (userdata) {
      const updateData = await UserDetail.findByIdAndRemove({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "Delete data successfully! " })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.paginationData= async(req, res)=>{

  let { page, size, sort } = req.query;
    if (!page) {
      page = 1;
  }

  if (!size) {
      size = 10;
  }

  const limit = parseInt(size);
  const user = await UserDetail.find().limit(limit)
  res.send({
      page,
      size,
      Info: user,
  });
}







