
const express = require('express')

const NumerCtrl = require('../controllers/numer-ctrl')

const router = express.Router()

router.get('/getbisection', NumerCtrl.getbisections)
router.get('/getfalseposition', NumerCtrl.getfalsepositions)
router.get('/getonepoint', NumerCtrl.getonepoints)
router.get('/getnewtonraphson', NumerCtrl.getnewtonraphsons)
router.get('/getsecant', NumerCtrl.getsecants)
router.get('/gettrapzoidal', NumerCtrl.gettrapzoidals)
router.get('/getsimson', NumerCtrl.getsimsons)
router.get('/getndd', NumerCtrl.getndds)
router.get('/getlagrange', NumerCtrl.getlagranges)

router.get('/getfwoh', NumerCtrl.getfwohs)
router.get('/getbwoh', NumerCtrl.getbwohs)
router.get('/getfwoh2', NumerCtrl.getfwoh2s)
router.get('/getbwoh2', NumerCtrl.getbwoh2s)
router.get('/getcentral', NumerCtrl.getcentrals)
router.get('/getcentral4', NumerCtrl.getcentral4s)

router.get('/getcramer', NumerCtrl.getcramers)
router.get('/getgausseli', NumerCtrl.getgausselis)
router.get('/getgaussjor', NumerCtrl.getgaussjors)
router.get('/getLU', NumerCtrl.getLus)
router.get('/getjacobi', NumerCtrl.getjacobis)
router.get('/getgaussseidel', NumerCtrl.getgaussseidels)

router.get('/getlinear', NumerCtrl.getlinears)
module.exports = router