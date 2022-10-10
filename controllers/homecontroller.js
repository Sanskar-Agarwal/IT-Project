const home = (req, res) => {
    res.render('home');
}

const createAccount = (req,res) => {
    res.render('createAccount', { flash: req.flash('error') })
}

module.exports = {
    home,
    createAccount,
}