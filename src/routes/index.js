import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute,hashHistory} from 'react-router'
import App from '../components/App.jsx'
import Index from '../components/index/Index.jsx' 

render(
       <Router history={hashHistory}>
         <Route path='/' component={App}>
             <IndexRoute component={Index}/>
         </Route>
       </Router>,
	document.getElementById('root')
);

