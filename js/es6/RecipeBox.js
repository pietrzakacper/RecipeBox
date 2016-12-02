/* eslint no-console: 0*/
import React from 'react';
import Recipe from './Recipe';
import { Button } from 'reactstrap';
import Modal from './Modal';
import { Accordion, Panel, Well } from 'react-bootstrap';

const localStorageKey = 'pietrzakacper-FCC-recipes';

class RecipeBox extends React.Component {
	constructor() {
		super();

		if ( localStorage.getItem( localStorageKey ) == null ){
			localStorage.setItem( localStorageKey, '[{"name":"Kielbasa with onion","ingridients":"kielbasa, onion"},{"name":"Ruskie Pierogi","ingridients":"potatos, onion, dry cottage cheese, flour, egg"},{"name":"Sandwich with ham and cheese","ingridients":"bread, ham, cheese"}]' );
		}

		this.state = {
			recipes: JSON.parse( localStorage.getItem( localStorageKey ) ),
			showAddRecipeModal: false
		};

		this.showAddRecipeModal = this.showAddRecipeModal.bind( this );
		this.hideAddRecipeModal = this.hideAddRecipeModal.bind( this );
		this.addRecipe = this.addRecipe.bind( this );
		this.editRecipe = this.editRecipe.bind( this );
		this.deleteRecipe = this.deleteRecipe.bind( this );
	}

	deleteRecipe( index ){
		const recipes = this.state.recipes.splice( 0 );

		recipes.splice( index, 1 );

		this.setState( { recipes } );
		this.updateRecipesRecord( recipes );
	}

	addRecipe( name, ingridients ){
		const recipes = this.state.recipes.splice( 0 );

		recipes.push( { name,	ingridients	} );

		this.setState( {
			showAddRecipeModal: false,
			recipes
		} );
		this.updateRecipesRecord( recipes );
	}

	editRecipe( id, name, ingridients ){
		const recipes = this.state.recipes.splice( 0 );

		recipes[ id ] = { name, ingridients };

		this.setState( { recipes } );
		this.updateRecipesRecord( recipes );
	}

	updateRecipesRecord( recipes ){
		localStorage.setItem( localStorageKey, JSON.stringify( recipes ) );
	}

	showAddRecipeModal(){
		this.setState( {
			showAddRecipeModal: true
		} );
	}

	hideAddRecipeModal(){
		this.setState( {
			showAddRecipeModal: false
		} );
	}

	getRecipesList(){
		return (
  <Accordion>
    {
			this.state.recipes.map( ( elem, index ) => {
				return	(
  <Panel header={elem.name}  key={index + Math.random()} eventKey={index + Math.random()}>
    <Recipe name={elem.name} ingridients={elem.ingridients}  id={index} delete={this.deleteRecipe} edit={this.editRecipe} />
  </Panel> );
			}
			)
		}
  </Accordion>
		);
	}

	render() {
		return (
  <div>
    <Well>
      {this.getRecipesList()}
    </Well>
    <Button color='primary' onClick={this.showAddRecipeModal}>Add Recipe</Button>
    <Modal isOpen={this.state.showAddRecipeModal} onAccept={this.addRecipe} onHide={this.hideAddRecipeModal} id='addRecipe' />
  </div>
		);
	}
}

export default RecipeBox;
