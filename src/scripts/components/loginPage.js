import React from 'react'
import {login} from '../utils'
import request from 'superagent'


const handleLogin = e => login(e.target.value,'default')

const LoginPage = props =>
	<div className='login-page' >
		<LoginBox />
	</div>


const LoginBox = props => 
	<div className={'login-box'} >
		<h2>I am</h2>
		<button onClick={handleLogin} value="justin">justin</button>
		<button onClick={handleLogin} value="luba">luba</button>
	</div>


export default LoginPage
