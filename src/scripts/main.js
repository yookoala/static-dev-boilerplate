'use strict';

import jQuery from 'jquery';
import ReactDOM from 'react-dom';
import HelloDiv from './react-components/HelloDiv';

function hello(msg) {
	console.log("hello -- "+msg);
}
hello("world");

ReactDOM.render((
	<div>
		<HelloDiv />
		<HelloDiv message="Hello from main.js" />
	</div>
), document.getElementById('react-playground'));
