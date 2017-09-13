import React from 'react'
import {login} from '../utils'
import request from 'superagent'


const handleLogin = (e,dispatch) => {
	login(e.target.value,'default')
		.then((userData)=> {
			dispatch({
				type: "OPEN_MODAL",
				modalData: {
					name: 'enterPin',
					userData: userData
				}
			})
		})
	}

const LoginPage = props =>
	<div className='login-page' >
		{console.log(props)}
		<LoginBox dispatch={props.dispatch} />
	</div>


const LoginBox = props => 
	<div className={'login-box'} >
		<h2>I am</h2>
		<button onClick={e => handleLogin(e,props.dispatch)} value="justin">justin</button>
		<button onClick={e => handleLogin(e,props.dispatch)} value="luba">luba</button>
	</div>


export default LoginPage
