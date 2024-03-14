const User = require('./user');

module.exports = {
    login: (req, res) => {
        console.log("===============================================")
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
        const { username, password, email, contactNumber } = req.body;
        User.findOne({ username })
            .then(existingUser => {
                if (existingUser) {
                    res.status(400).json({ success: false, message: 'Username already exists' });
                } else {
                    const newUser = new User({
                        username,
                        password,
                        email,
                        contactNumber
                    });

                    newUser.save()
                        .then(savedUser => {
                            console.log({savedUser},"]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
                            res.status(200).json({ success: true, message: 'Registration successful' });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            res.status(500).json({ success: false, message: 'Internal server error' });
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ success: false, message: 'Internal server error' });
            });
    }
};