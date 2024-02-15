import User_model from "../../model/user_model/user.js";
import Response from "../../helper/helper.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr("node-next");
import hashPassword from "../../helper/helper.js";
import JWT from "jsonwebtoken"
import { sendResetLinkEmail } from "../../helper/sendEmail.js";

const create_user = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const errors = [];
    const passwordErrors = hashPassword.validatePassword(password);

    const exited_data = await User_model.findOne({ email: email });
    if (exited_data) {
      errors.push("Email Id is Allredy Exites..");
      res.send(await Response.requiredError({nameError: "" ,emailError: errors[0] , passwordError: [] }));
        return;
      // res.send(await Response.requiredError("Email Id is Allredy Exites.." , {status:502}));
      // return;
    }
    
    if(name =="" || email =="" || password =="" ){
      if (!name) {
        errors.push("name is requred..");
      }else{
        errors.push("");
      }

      if (!email ) {
        errors.push("Email Id is requred..");
      }else{
        errors.push("");
      }

      if (passwordErrors.length != 0) {
        errors.push(passwordErrors);
      }
      else{
        errors.push("");
      }

      if (errors.length == 3) {
        res.send(await Response.requiredError({nameError: errors[0] ,emailError: errors[1] , passwordError: errors[2] }));
        return;
      }

    }

        if(passwordErrors == 0 ){
          const pass = cryptr.encrypt(password);
           await User_model.create({
            name: name,
            email: email,
            password: pass,
          });
          res.send(await Response.successResponse("User created successfuly..."))
            return
        }else{
          res.send(await Response.requiredError({nameError: errors[0] ,emailError: errors[1] , passwordError: passwordErrors }));
          return;
        }
      
  } catch (error) {
    console.log(error);
    res.send(await Response.catchError(error));
    return;
  }
};

const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = await User_model.findOne({
      email: { $regex: email, $options: "i" },
    });
    const errors = {};

    if (!email || email === "") {
      errors.emailError = "Email Id Is required..";
    }

    if (!password || password === "") {
      errors.passwordError = "Password Is required..";
    }

    if (data === null) {
      email != "" ? errors.emailNotMatch = "Email Id Is Not Match.." : ""
    }

    let matchPass = false;
    if (password !== "") {
      if(data != null){
        matchPass = cryptr.decrypt(data.password) === password;
        if (!matchPass) {
          errors.passwordNotMatch = "Password Is not Match";
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      res.json({
        data: {
          response_code: 400,
          response_message: errors,
        },
      });
      return;
    }

    if (matchPass) {
      const webtoken = await data.gettoken();
      res.status(200).json({
        data: {
          response_code: 200,
          response_message: "User Logged In",
          auth: webtoken,
          data:data
        },
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {
        response_code: 500,
        response_message: "Internal Server Error",
      },
    });
    return;
  }
};


const logout = async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((curr) => {
      return curr.token !== req.token;
    });
    await req.admin.save();
    res.send(await Response.successResponse("User Logout Successfuly"));
  } catch (err) {
    console.log(err);
    res.send(await Response.catchError(error));
  }
};

const Change_password = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || currentPassword =="") {
      res.send(await Response.requiredError("Current password Is Required"))
      return
    }
    if (!newPassword || newPassword =="") {
      res.send(await Response.requiredError("New password Is Required"))
      return
    }
    const AuthToken = req.headers.authorization;
    if(AuthToken == undefined){
      res.send(await Response.requiredError("Current Password is Not Match"))
      return
    }else{
      const token = AuthToken.split(" ")[1];
    const decodedToken = JWT.verify(token, process.env.SCRET_KEY);
    const authenticatedUserId = decodedToken._id;
    const authenticatedUser = await User_model.findById(authenticatedUserId);
    if (!authenticatedUser) {
      res.send(await Response.ErrorResponse("User not found"));
      return;
    }
    const decryptedPassword = cryptr.decrypt(authenticatedUser.password);
    if (currentPassword !== decryptedPassword) {
      console.log("object")
      res.send(await Response.ErrorResponse("Incorrect current password"));
      return;
    }
    const errors = hashPassword.validatePassword(newPassword);
    if (errors.length != 0) {
      errors.forEach(async (error) => {
        res.send(await Response.ErrorResponse(error));
      });
      return;
    }
    const hashedNewPassword = cryptr.encrypt(newPassword);
    authenticatedUser.password = hashedNewPassword;
    await authenticatedUser.save();
    res.send(
      await Response.dataResponse(
        "Password changed successfully",
        authenticatedUser
      )
    );
    return;
    }
  } catch (error) {
    console.log(error);
    res.send(await Response.catchError(error));
  }
};

const forgot_password = async (req, res) => {
  try {
    const { email } = req.body;
    // const emailRegex = new RegExp(email, "i");
    const user = await User_model.findOne({ email: email });
    if (user) {
      if (user.resetTokenUsed) {
        res.send(await Response.ErrorResponse("Reset token has already been used."));
        return;
      }

      const Secret = process.env.SCRET_KEY + user.password;
      const payload = {
        email: user.email,
        _id: user._id,
      };

      const token = JWT.sign(payload, Secret, { expiresIn: "10m" });
      user.resetToken = token;
      await user.save();

      const link = `${process.env.link}reset-password/${user._id}/${token}`;

      await sendResetLinkEmail(user.email, link);
      res.json(
        await Response.dataResponse(
          "Password reset link has been sent to your email.",
          link
        )
      );
      return;
    } else {
      res.send(await Response.ErrorResponse("User Not Registered."));
      return;
    }

  } catch (error) {
    console.error(error);
    res.send(await Response.catchError(error));
  }
};


const reset_password = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    const user = await User_model.findOne({ _id: id });

    if (!user) {
      res.send(await Response.ErrorResponse("Invalid id."));
      return;
    }

    if (user.resetToken !== token || user.resetTokenUsed) {
      res.send(await Response.ErrorResponse("Invalid or expired reset token."));
      return;
    }

    const secret = process.env.SCRET_KEY + user.password;

    try {
      JWT.verify(token, secret);
      const errors = hashPassword.validatePassword(password);

      if (errors.length === 0) {
        user.password = cryptr.encrypt(password);
        user.resetTokenUsed = true;
        user.resetToken = undefined;
        await user.save();

        // Generate a new reset token
        const newToken = JWT.sign({ email: user.email, _id: user._id }, secret, { expiresIn: "10m" });
        user.resetToken = newToken;
        user.resetTokenUsed = false;
        await user.save();

        // Send a new reset link with the new token
        const newLink = `${process.env.link}reset-password/${user._id}/${newToken}`;
        await sendResetLinkEmail(user.email, newLink);

        res.send(
          await Response.findsuccess("Password change successful. New reset link has been sent.", user)
        );
        return;
      } else {
          res.send(await Response.ErrorResponse(errors));

        return;
      }
    } catch (error) {
      res.send(await Response.catchError(error));
      return;
    }
  } catch (error) {
    res.send(await Response.catchError(error));
    return;
  }
};

const get_user = async(req,res) => {
  try {
    const GetUsers = await User_model.find()
    res.send(await Response.findsuccess("data founded..." ,GetUsers));
  } catch (error) {
    console.log(error)
  }
}

const Protect_route = async (req, res) => {
  try {
    res.send(await Response.successResponse("User Verified Succesfully."));
    return;
  } catch (err) {
    res.send(await Response.ErrorResponse("something went wrong"));
    return;
  }
};
export default {
  create_user,
  login_user,
  get_user,
  logout,
  Change_password,
  reset_password,
  forgot_password,
  Protect_route,
};
