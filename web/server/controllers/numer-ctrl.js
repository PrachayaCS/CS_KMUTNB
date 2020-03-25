const bisection = require('../models/bisection')
const falseposition = require('../models/falseposition')
const onepoint = require('../models/onepoint')
const newtonraphson = require('../models/newtonraphson')
const secant = require('../models/secant')

const trapzoidal = require('../models/trapzoidal')
const simson = require('../models/simson')

const ndd = require('../models/ndd')
const lagrange = require('../models/lagrange')

const fwoh = require('../models/fwoh')
const bwoh = require('../models/bwoh')
const fwoh2 = require('../models/fwoh2')
const bwoh2 = require('../models/bwoh2')
const central = require('../models/central')
const central4 = require('../models/central4')

const cramer = require('../models/cramer')
const gausseli = require('../models/gausseli')
const gaussjor = require('../models/gaussjor')
const Lu = require('../models/LU')
const jacobi = require('../models/jacobi')
const gaussseidel = require('../models/gaussseidel')

const linear = require('../models/linears')

getbisections = async (req, res) => {
    await bisection.find({}, (err, bisections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bisections.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: bisections })
    }).catch(err => console.log(err))
}

getfalsepositions = async (req, res) => {
    await falseposition.find({}, (err, falsepositions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!falsepositions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: falsepositions })
    }).catch(err => console.log(err))
}

getonepoints = async (req, res) => {
    await onepoint.find({}, (err, onepoints) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!onepoints.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: onepoints })
    }).catch(err => console.log(err))
}

getnewtonraphsons = async (req, res) => {
    await newtonraphson.find({}, (err, newtonraphsons) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!newtonraphsons.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: newtonraphsons })
    }).catch(err => console.log(err))
}

getsecants = async (req, res) => {
    await secant.find({}, (err, secants) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!secants.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: secants })
    }).catch(err => console.log(err))
}

gettrapzoidals = async (req, res) => {
    await trapzoidal.find({}, (err, trapzoidals) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!trapzoidals.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: trapzoidals })
    }).catch(err => console.log(err))
}

getsimsons = async (req, res) => {
    await simson.find({}, (err, simsons) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!simsons.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: simsons })
    }).catch(err => console.log(err))
}

getndds = async (req, res) => {
    await ndd.find({}, (err, ndds) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ndds.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: ndds })
    }).catch(err => console.log(err))
}

getlagranges = async (req, res) => {
    await lagrange.find({}, (err, lagranges) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!lagranges.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: lagranges })
    }).catch(err => console.log(err))
}

getfwohs = async (req, res) => {
    await fwoh.find({}, (err, fwohs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!fwohs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: fwohs })
    }).catch(err => console.log(err))
}

getbwohs = async (req, res) => {
    await bwoh.find({}, (err, bwohs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bwohs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: bwohs })
    }).catch(err => console.log(err))
}

getfwoh2s = async (req, res) => {
    await fwoh2.find({}, (err, fwoh2s) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!fwoh2s.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: fwoh2s })
    }).catch(err => console.log(err))
}

getbwoh2s = async (req, res) => {
    await bwoh2.find({}, (err, bwoh2s) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bwoh2s.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: bwoh2s })
    }).catch(err => console.log(err))
}

getcentrals = async (req, res) => {
    await central.find({}, (err, centrals) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!centrals.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: centrals })
    }).catch(err => console.log(err))
}

getcentral4s = async (req, res) => {
    await central4.find({}, (err, central4s) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!central4s.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: central4s })
    }).catch(err => console.log(err))
}

getcramers = async (req, res) => {
    await cramer.find({}, (err, cramers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!cramers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: cramers })
    }).catch(err => console.log(err))
}

getgausselis = async (req, res) => {
    await gausseli.find({}, (err, gausselis) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!gausselis.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: gausselis })
    }).catch(err => console.log(err))
}

getgaussjors = async (req, res) => {
    await gaussjor.find({}, (err, gaussjors) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!gaussjors.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: gaussjors })
    }).catch(err => console.log(err))
}

getLus = async (req, res) => {
    await Lu.find({}, (err, lus) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!lus.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: lus })
    }).catch(err => console.log(err))
}

getjacobis = async (req, res) => {
    await jacobi.find({}, (err, jacobis) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!jacobis.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: jacobis })
    }).catch(err => console.log(err))
}

getgaussseidels = async (req, res) => {
    await gaussseidel.find({}, (err, gaussseidels) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!gaussseidels.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: gaussseidels })
    }).catch(err => console.log(err))
}

getlinears = async (req, res) => {
    await linear.find({}, (err, linears) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!linears.length) {
            return res
                .status(404)
                .json({ success: false, error: `Index not found` })
        }
        return res.status(200).json({ success: true, data: linears })
    }).catch(err => console.log(err))
}
module.exports = {
    getbisections,
    getfalsepositions,
    getonepoints,
    getnewtonraphsons,
    getsecants,
    gettrapzoidals,
    getsimsons,
    getndds,
    getlagranges,
    getfwohs,
    getbwohs,
    getfwoh2s,
    getbwoh2s,
    getcentrals,
    getcentral4s,
    getcramers,
    getgausselis,
    getgaussjors,
    getLus,
    getjacobis,
    getgaussseidels,
    getlinears
}