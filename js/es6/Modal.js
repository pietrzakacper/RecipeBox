/* eslint no-console: 0*/

import React from 'react';
import { Button, Modal as BsModal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';

class Modal extends React.Component {
	constructor( props ){
		super( props );

		this.accept = this.accept.bind( this );
	}

	accept(){
		const nameInput = document.getElementById( `recipeName-${this.props.id}` ).value;
		const ingridientsInput = document.getElementById( `recipeIngridients-${this.props.id}` ).value;

		this.props.onAccept( nameInput, ingridientsInput );
	}

	render(){
		return (
  <BsModal isOpen={this.props.isOpen} toggle={() => {}}>
    <ModalHeader toggle={this.props.onHide}>Add Recipe</ModalHeader>
    <ModalBody>
      <FormGroup>
        <Label for={`recipeName-${this.props.id}`}>Recipe name</Label>
        <Input id={`recipeName-${this.props.id}`} placeholder='Freddy`s Sausage' defaultValue={this.props.name} />
        <Label for={`recipeIngridients-${this.props.id}`}>Ingridients</Label>
        <Input id={`recipeIngridients-${this.props.id}`} type='textarea' placeholder='Sausage, butter, onion' className='vresize' defaultValue={this.props.ingridients} />
      </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button color='primary' onClick={this.accept}>Accept</Button>{' '}
      <Button color='secondary' onClick={this.props.onHide}>Cancel</Button>
    </ModalFooter>
  </BsModal>
		);
	}
}

Modal.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	ingridients: React.PropTypes.string,
	onAccept: React.PropTypes.func,
	onHide: React.PropTypes.func,
	isOpen: React.PropTypes.bool
};

Modal.defaultProps = {
	name: '',
	ingridients: '',
	onAccept: () => {
		console.log( 'No "onAccept" property defined' );
	},
	isOpen: false
};

export default Modal;
