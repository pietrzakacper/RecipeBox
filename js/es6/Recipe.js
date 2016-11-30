/* eslint no-console: 0*/
import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Modal from './Modal';

class Recipe extends React.Component{
	constructor( props ){
		super( props );

		this.state = {
			showEditRecipeModal: false
		};

		this.showEditRecipeModal = this.showEditRecipeModal.bind( this );
		this.hideEditRecipeModal = this.hideEditRecipeModal.bind( this );
		this.editRecipe = this.editRecipe.bind( this );
	}

	showEditRecipeModal(){
		this.setState( {
			showEditRecipeModal: true
		} );
	}

	hideEditRecipeModal(){
		this.setState( {
			showEditRecipeModal: false
		} );
	}

	editRecipe( name, ingridients ){
		this.setState( {
			showEditRecipeModal: false,
		} );

		this.props.edit( this.props.id, name, ingridients );
	}

	getIngridientsList(){
		return (
  <ListGroup>
    {this.props.ingridients.split( ', ' ).map(  ( elem, index )  => ( <ListGroupItem key={index}>{ elem }</ListGroupItem> ) )}
  </ListGroup>
		);
	}

	render(){
		return (
  <div>
    { this.getIngridientsList() }
    <button className='btn btn-danger delete' onClick={() => this.props.delete( this.props.id )}>Delete</button>
    <Button onClick={this.showEditRecipeModal}>Edit</Button>
    <Modal isOpen={this.state.showEditRecipeModal} onAccept={this.editRecipe} onHide={this.hideEditRecipeModal} id='addRecipe' name={this.props.name} ingridients={this.props.ingridients} />
  </div>
		);
	}

}

Recipe.propTypes = {
	name: React.PropTypes.string,
	ingridients: React.PropTypes.string,
	id: React.PropTypes.number,
	delete: React.PropTypes.func,
	edit: React.PropTypes.func
};

export default Recipe;
