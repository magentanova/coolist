const checkAuth = function(req, res, next){
  if(!req.user) {
    res.status(400).send( 'no authenticated user for current session' )
  }
  else next()
}

const errorHandler = function(err, req, res, next) {
  console.log(err)
  res.render(err);
  return
} 

const cookifyPin = function(req,res,next) {
  res.cookie('coolist_digits', '3030')
  next()
}

const cookifyUser = function(req,res,next) {
  if (req.user) {
    res.cookie('coolist' + '_user',JSON.stringify(req.user))
    next()
  }
  else {
    res.cookie('coolist' + '_user','null')
    next()
  }
}

const parseQuery = function(req,res,next) {
  if (req.query) {
    for (var prop in req.query) {
      if (prop[0] === '$') {
        let val = req.query[prop]
        req.query[prop] = JSON.parse(val)
      }
    }
  }
  next()
}

module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler,
  cookifyPin: cookifyPin,
  cookifyUser: cookifyUser,
  parseQuery: parseQuery
}

