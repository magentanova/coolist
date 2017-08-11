//libraries 
import React from 'react'
import ReactDOM from 'react-dom'

//modules
import AppView from './components/appView'

//tools
import {getCurrentUser, init} from './utils.js'


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