import React from 'react';
import { ListGroupItem } from 'reactstrap';

class Ingridient extends React.Component {
	render(){
		return ( <ListGroupItem>{ this.props.content }</ListGroupItem> );
	}
}

Ingridient.propTypes = {
	content: React.PropTypes.string
};

export default Ingridient;
