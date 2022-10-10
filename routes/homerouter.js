const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController.js')
const pcPartsController = require('../controllers/pcPartsController')
const User = require('../models/user')


homeRouter.get('/', homeController.home)

// Handle registration of new user
homeRouter.get('/createAccount', homeController.createAccount)
homeRouter.post('/createAccount', (req, res, next) => {
    data = req.body;
    User.findOne({username: data.username}, (err, user) => {
        if (err) {return err}
        else if (user) {
            req.flash('error', 'This email has already been registered.')
            res.redirect('/createAccount')
        }
        else {
            User.create(data, (err, user) => {
                if (err) return next(err)
                req.flash('error', 'Your account has been created. Please log in.')
                res.redirect('/login')
            })
            }
    })
})

homeRouter.get('/cpu', pcPartsController.get_cpu_data)
homeRouter.get('/cpu/:id', pcPartsController.get_cpu_item)
homeRouter.get('/gpu', pcPartsController.get_gpu_data)
homeRouter.get('/gpu/:id', pcPartsController.get_gpu_item)
homeRouter.get('/motherboard', pcPartsController.get_motherboard_data)
homeRouter.get('/motherboard/:id', pcPartsController.get_motherboard_item)
homeRouter.get('/powerSupply', pcPartsController.get_powersupply_data)
homeRouter.get('/powerSupply/:id', pcPartsController.get_powersupply_item)
homeRouter.get('/ram', pcPartsController.get_ram_data)
homeRouter.get('/ram/:id', pcPartsController.get_ram_item)
homeRouter.get('/bestBuy', pcPartsController.get_best_deals)
homeRouter.get('/cpuDeal/:id', pcPartsController.get_cpu_deal)
homeRouter.get('/gpuDeal/:id', pcPartsController.get_gpu_deal)
homeRouter.get('/ramDeal/:id', pcPartsController.get_ram_deal)
homeRouter.get('/motherboardDeal/:id', pcPartsController.get_motherboard_deal)
homeRouter.get('/powerSupplyDeal/:id', pcPartsController.get_powersupply_deal)

module.exports = homeRouter