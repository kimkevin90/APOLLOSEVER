const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/config");
const { User } = require("../../models");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ where: { username } });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }
      const token = generateToken(user);

      return {
        ...user.dataValues,
        // id: res.id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ where: { username } });

      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      // TODO: hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res.dataValues,
        // id: res.id,
        token,
      };
    },
  },
};
