'use strict';

import React from 'react';

// dummy class to show react possibility
class HelloDiv extends React.Component {

  constructor(props) {
    super(props);
  }

	render() {
    const message = this.props.message;
		return (
			<div>Hello World! { message }</div>
		);
	}

}

HelloDiv.defaultProps = {
  "message": "Default Hello Message"
};

export default HelloDiv;
