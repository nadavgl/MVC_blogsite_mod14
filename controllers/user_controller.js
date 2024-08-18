const { User } = require('../models')

module.exports = {
    async registerUser(req, res) {
        try {
            const user = await User.create(req.body);
            req.session.user_id = user.id;

            res.redirect('/dashboard')
        } catch (error) {
            console.error('Error registering user:', error);
            res.redirect('/register');        }
    },
    async loginUser(req, res) {
      try {
        const formData = req.body;
        console.log('Form data:', formData);

        const user = await User.findOne({
            where: {
                username: formData.username
            }
        })
        if(!user){
            return res.redirect('/register')
        }
        req.session.user_id = user.id;

        res.redirect('/dashboard')
      } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    
      }  
    },
    
    logoutUser(req, res){
        req.session.destroy();
        res.redirect('/')

    }
}