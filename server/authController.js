const User = require('./user');

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
    }
};
