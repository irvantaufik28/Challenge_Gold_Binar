const bcrypt = require("bcrypt");
const user_uc = require("../usecase/user");
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  let user_data = req.body.username

  let user = await user_uc.getUserByUsername(user_data)
  let match = await bcrypt.compare(req.body.password, user.password)
  if (!match) return res.status(400).json({ message: "incorrect email or passwor" })

 
  let user_id = user.id
  let username =user.username
  let name= user.name
  let is_admin = user.is_admin
  let  refesh_token = user.refesh_token

  
  const accessToken = jwt.sign({ user_id, username, name, is_admin, refesh_token }, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: '60'
  })

  const refeshToken = jwt.sign({ user_id, username, name, is_admin, refesh_token }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d'
  })

  await user_uc.updateUser(refesh_Token = refeshToken, user_id)

  res.cookie('refreshToken', refeshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  })
  res.json({
    id : user_id,
    username : username,
    accessToken:accessToken
  })
}



exports.register = async (req, res) => {

  let res_data = {
    status: "failed",
    message: "",
    data: null,
  };
  let user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    is_admin: false,
  };

  if (req.body.password != req.body.confrimPassword) {
    res_data.message = "password & confrim password invalid";
    return res.status(400).json(res_data);
  }
  let password = bcrypt.hashSync(req.body.password, 10);
  let confrimPassword = bcrypt.hashSync(req.body.confrimPassword, 10);


  user.password = password;
  user.confrimPassword = confrimPassword;

  // check if username not exits
  let user_res = await user_uc.getUserByUsername(user.username);
  if (user_res !== null) {
    res_data.message = "username or email already use";
    return res.status(400).json(res_data);
  }

  let create_res = await user_uc.createUser(user);
  if (create_res.is_success !== true) {
    res_data.message = "somthing went wrong";
    return res.status(400).json(res_data);
  }

  res_data.status = "ok";
  res_data.message = "succes";
  res_data.data = create_res.user;
  res.json(res_data);
};