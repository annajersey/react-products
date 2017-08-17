import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
	this.handlePriceInputChange = this.handlePriceInputChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  
  handleNameInputChange(e) {
	this.props.onFilterTextInput('nameValue',e.target.value);
	//this.setState({nameValue: event.target.value});
  }
  
  handlePriceInputChange(e) {
	this.props.onFilterTextInput('priceValue',e.target.value);
	//this.setState({priceValue: event.target.value});
   }
  
  handleFormChange(e) {
	this.props.onHandleNewProductInput();
	 e.preventDefault();
    
  }
  render() {
    return (
     <div>
        <input
          type="text"
		  value={this.props.nameValue}
          placeholder="Name..."
          onChange={this.handleNameInputChange}
        />
		
        <input
          type="text"
		  value={this.props.priceValue}
          placeholder="Price..."
		  onChange={this.handlePriceInputChange}
        />
		<button onClick={this.handleFormChange}>Submit</button>
      </div>
    );
  }
}

const ProductRow = ({name, price}) => {   
    return (
      <tr>
        <td>{name}</td>
        <td>{price}</td>
      </tr>
    );
}

class ProductList extends React.Component {
  render() {
	const {products} = this.props;
    const rows = products.map((product) => <ProductRow key={product.id} name={product.name} price={product.price} />);
      
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class ProductsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [	 ],
	  nameValue : 'testname',
	  priceValue: '99.9'
      
    };
    
    this.handleNewProductInput = this.handleNewProductInput.bind(this);
   this.handleTextInput = this.handleTextInput.bind(this);
  }

  handleNewProductInput() {
	var product = {price:this.state.priceValue,name:this.state.nameValue, id:this.state.products.length}
	this.state.products.push(product);
	this.setState({
      products: this.state.products
	  
    });
  }
  
 handleTextInput(fieldName,fieldValue){
	 console.log('change'+fieldName+':'+fieldValue);
	
	 this.setState({
		[ fieldName]:fieldValue
    });
 }

  render() {
	  console.log(this.state.nameValue);
	  console.log(this.state.priceValue);
     return (
      <div>
       <InputBar
			onHandleNewProductInput={this.handleNewProductInput}
			onFilterTextInput={this.handleTextInput}
			nameValue={this.state.nameValue}
			priceValue={this.state.priceValue}
        />
        <ProductList
          products={this.state.products}
         />
      </div>
    );
  }
}
ReactDOM.render(
  <ProductsBlock  />,
  document.getElementById('root')
);
