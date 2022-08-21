const bcrypt = require("bcrypt");

const user_uc = require("../usecase/user");

exports.login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let res_data = {
    status: "failed",
    message: "incorrect username or password",
    res_data: null,
  };

  let user = await user_uc.getUserByUsername(username);
  if (!user) {
    return res.status(400).json(res_data);
  }
  if (bcrypt.compareSync(password, user.password) !== true) {
    return res.status(400).json(res_data);
  }
  res_data.status = "ok";
  res_data.message = "success";
  res_data = user;
  return res.json(res_data);
};

exports.register = async (req, res) => {
  if (req.body.password != req.body.confrimPassword) {
    res_data.message = "password & confrim password invalid";
    return res.status(400).json(res_data);
  }

  let user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    is_admin: false,
  };

  let password = bcrypt.hashSync(req.body.password, 10);
  let confrimPassword = bcrypt.hashSync(req.body.confrimPassword, 10);

  let res_data = {
    status: "failed",
    message: "",
    data: null,
  };

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
