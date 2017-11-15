import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute,hashHistory} from 'react-router'
import App from '../components/App.jsx'
import FormTemplate from '../components/formTemplate/FormTemplate.jsx' 

render(
       <Router history={hashHistory}>
         <Route path='/' component={App}>
             <IndexRoute component={FormTemplate}/>
         </Route>
       </Router>,
	document.getElementById('root')
);

