const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signUp = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
  
      if (!(first_name && last_name && email && password)) {
        res.status(401).send("all fields are required");
      }
  
      const existingUser = await User.findOne({ email: email });
  
      if (existingUser) {
        res.status(401).send("User already Exist");
      }
  
      const encryptPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptPassword,
      });
  
      const token = jwt.sign(
        {
          id: user._id,
          email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
  
      user.password = undefined;
  
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  };


  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(401).send("all fields are required");
      }
  
      const user = await User.findOne({ email: email.toLowerCase() });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            id: user._id,
            email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        user.token = token;
        user.password = undefined;
  
        const option = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
  
        res.status(200).cookie("token", token, option).json({
          success: true,
          token,
          user,
        });
      } else {
        res
          .status(401)
          .send("Either password is incorrect or user does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };