const User = require("./user");
const ReferralTracking = require("./referralTrackingSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateReferralCode = async () => {
  try {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let referralCode = "";

    for (let i = 0; i < 6; i++) {
      referralCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    const createdTime = new Date();

    const newReferral = new ReferralTracking({
      referralCode,
      createdTime,
      points: 10,
    });
    const savedReferral = await newReferral.save();
    return savedReferral._id;
  } catch (error) {
    console.error("Error generating referral code:", error);
    throw error;
  }
};

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          res.status(200).json({ success: true, message: "Login successful" });
        } else {
          res
            .status(401)
            .json({
              success: false,
              error: "Incorrect password. Please enter the correct password.",
            });
        }
      } else {
        res
          .status(404)
          .json({
            success: false,
            error: "Username not found. Please register to continue",
          });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
  register: async (req, res) => {
    const { username, password, email, contactNumber, referredUserCode } =
      req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ success: false, error: "Username already exists" });
      } else if (existingUser.email === email) {
        return res.status(400).json({ success: false, error: "Email already exists" });
      }
    }
      const userReferralId = await generateReferralCode();
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        contactNumber,
        referredUserCode: referredUserCode ? referredUserCode : null,
        referralId: userReferralId,
      });

      const savedUser = await newUser.save();
      const userReferralIdString = savedUser._id.toString();
      if (referredUserCode) {
        const referral = await ReferralTracking.findOne({
          referralCode: referredUserCode,
        });
        if (referral) {
          referral.referralUsers_id.push(userReferralIdString);
          referral.points += 10;
          await referral.save();
        } else {
          console.log("Invalid referral code provided");
        }
      }

      res
        .status(200)
        .json({
          success: true,
          message: "User registered successfully",
          userReferralId,
        });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
  getUserAndReferral: async (req, res) => {
    try {
      const { username } = req.query;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
  
      const referral = await ReferralTracking.findOne({ _id: user.referralId });
  
      if (!referral) {
        return res
          .status(404)
          .json({ success: false, message: "Referral not found" });
      }
  
      const referredUsers = await User.find({ _id: { $in: referral.referralUsers_id } });
  
      return res.status(200).json({
        success: true,
        userData: user,
        referralData: referral,
        referredUsers: referredUsers
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  
  

};
