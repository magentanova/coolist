import React from 'react'


const loader = function(comp) {
		return props  => 
			<div className="loader">
	 			<img style={{display: props.loaded ? 'none' : 'inline'}} src="images/loading.gif" />
	 			<div style={{display: props.loaded ? 'block' : 'none'}} >
		 			{React.createElement(comp,props)}
	 			</div>
	 		</div>
 	}

export default loader
