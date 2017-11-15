import React,{Component} from 'react'
import './app.less';
class App extends Component {
	constructor(args) {
		super()
	}
	render() {
		return (
			    <div className='app'>
			            {this.props.children}
			    </div>
		)
	}

}
export default App;

