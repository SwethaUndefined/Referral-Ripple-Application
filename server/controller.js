const User = require('./user');
const ReferralTracking = require("./referralTrackingSchema")

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body;
        User.findOne({ username, password })
            .then(user => {
                if (user) {
                    res.status(200).json({ success: true, message: 'Login successful' });
                } else {
                    res.status(401).json({ success: false, message: 'Please register to continue' });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ success: false, message: 'Internal server error' });
            });
    },
    register: (req, res) => {
      const { username, password, email, contactNumber, referralCode, automaticReferralCode } = req.body;
  
      const newUser = new User({
          username,
          password,
          email,
          contactNumber,
          referralCode: referralCode || null,
          automaticReferralCode,
          points: 10, 
      });
  
      newUser.save()
          .then(savedUser => {
              const newReferralTracking = new ReferralTracking({
                  username,
                  automaticReferralCode,
                  referralCode: referralCode || null,
                  referralCount: 0
              });
  
              newReferralTracking.save()
                  .then(() => {
                      if (referralCode) {
                          Promise.all([
                              User.findOne({ automaticReferralCode: referralCode }),
                              ReferralTracking.findOne({ automaticReferralCode: referralCode })
                          ])
                          .then(([matchedUser, matchedReferralTracking]) => {
                              const updates = [];
  
                              if (matchedUser) {
                                  updates.push(User.update({automaticReferralCode: referralCode }, { $inc: { points: 10 } }));
                              }
  
                              if (matchedReferralTracking) {
                                  updates.push(ReferralTracking.update({automaticReferralCode: referralCode }, { $inc: { referralCount: 1 } }));
                              }
  
                              return Promise.all(updates);
                          })
                          .then(() => {
                              res.status(200).json({ success: true, message: 'Registration successful, referral processed' });
                          })
                          .catch(error => {
                              console.error('Error processing referral:', error);
                              res.status(500).json({ success: false, message: 'Internal server error while processing referral' });
                          });
                      } else {
                          res.status(200).json({ success: true, message: 'Registration successful' });
                      }
                  })
                  .catch(error => {
                      console.error('Error saving referral tracking:', error);
                      res.status(500).json({ success: false, message: 'Internal server error' });
                  });
          })
          .catch(error => {
              console.error('Error saving user:', error);
              res.status(500).json({ success: false, message: 'Internal server error' });
          });
  },
  getUsers: (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json({ success: true, data: users });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        });
}

  }
  
  

      