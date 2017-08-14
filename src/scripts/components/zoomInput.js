import React from 'react'

class ZoomInput extends React.Component {
	componentDidUpdate() {
		this.inputNode.focus()
	}

	unZoom(){
		var viewportmeta = document.querySelector('meta[name="viewport"]')
		viewportmeta.content = 'width=device-width, maximum-scale=1.0, initial-scale=1.0'
		setTimeout(() => 
			viewportmeta.content = 'width=device-width, maximum-scale=10.0, initial-scale=1.0'
			,2500)
	}

	render(){
		return <input 
			{...this.props}
			onBlur={this.unZoom}
			ref={this.props.disableAutofocus ? null : input => this.inputNode = input}
			/>
	}
} 

export default ZoomInput