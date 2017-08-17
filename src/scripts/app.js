//libraries 
import React from 'react'
import ReactDOM from 'react-dom'

//modules
import AppView from './components/appView'

//tools
import {getCurrentUser, init} from './utils.js'


// browser fixes

if (typeof Object.values !== 'function') {
	Object.values = function(obj) {
		var arr = []
		for (var prop in obj) {
			arr.push(obj[prop])
		}
		return arr
	}
}

const app = function() {
  init()
  location.hash = getCurrentUser() ? 'home' : 'login'
  function route() {
    ReactDOM.render(<AppView />, document.querySelector('.container'))
  }
  route()
  window.onhashchange = route
}

app()