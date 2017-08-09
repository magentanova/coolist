import request from 'superagent'

export const getCurrentUser = () =>
	JSON.parse(localStorage.getItem(['coolist_user'])) ? JSON.parse(localStorage.getItem(['coolist_user'])) : null

export const getValCopy = (obj,key) => Object.assign({},obj[key])

export const getUpdatedObj = (obj,key,val) => {
	var keyVal = {}
	keyVal[key] = val
	return Object.assign({}, obj, keyVal)
}

export const init = () => {
	var cookieTable = parseCookies()
	localStorage.setItem('coolist_user',JSON.parse(cookieTable.coolist_user) ? cookieTable.coolist_user : null)
}

export const login = (email,password) => 
	request
		.post('/auth/login')
		.send({email,password})
		.set('Accept','application/json')
		.end(function(err,res) {
			if (err) {
				console.log(user,pw)
				console.log(err)
				alert('error loggin in')
			}
			else {
				console.log(res)
				updateCurrentUser(res.body)
				location.hash = 'home'
			}
		})

export const logout = () =>
	request
		.get('/auth/logout')
		.end(function(err,res) {
			if (err) {
				console.log(err)
				alert('error loggin out')
			}
			else {
				updateCurrentUser(null)
				location.hash = 'login'
			}
		})

export const map = (obj,cb) => {
	if (obj instanceof Array) return obj.map(cb)
	return Object.values(obj).map(cb)
}

export const parseCookies = () => {
	var cookieString = document.cookie,
		pairs = cookieString.split(';'),
		cookieTable = {}

	pairs.forEach(pairStr => {
		var keyVal = pairStr.split('=')
		cookieTable[keyVal[0]] = decodeURIComponent(keyVal[1])
	})
	return cookieTable
}

export const remove = (arr,i) => arr.slice(0,i).concat(arr.slice(i+1))

export const removeById = (obj,id) => {
	var newObj = {}
	for (var idKey in obj) {
		if (idKey !== id) {
			newObj[idKey] = obj[idKey]
		}
	}
	return newObj
}

export const updateCurrentUser = (user) => {
	localStorage.setItem('coolist_user', JSON.stringify(user))
}

export const where = (arr,criteria) => {
	if !(arr instanceof Array) {
		arr = Object.values(arr)
	}
	for (var i = 0; i < arr.length; i ++) {
		var obj = arr[i],
			match = true
		for (var prop in criteria) {
			if (obj[prop] !== criteria[prop]) {
				match = false
			}
		}
		if (match) {
			return obj
		}
	}
	return null
}

export const without = (obj,criteria) => {
	if (obj instanceof Array) {
		var arr = obj
		var el = where(arr,criteria)
		if (!el) return arr
		return remove(arr,arr.indexOf(el))
	}
	else {
		throw new Error('without() can only be run on arrays')
	}	
}

window.parseCookies = parseCookies