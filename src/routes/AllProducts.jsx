import React from 'react'
import NavBar from '../components/nav-bar/NavBar'
import ProductList from '../components/product-list/ProductList'

class AllProducts extends React.Component {

  constructor(){
    super()
    this.initialState = {dbRequest: null, toDelete: {}, buttonStatus: true}

    this.state = this.initialState

  }

  populateDb = () =>{
      fetch("https://pedro-ruas-scandiweb-test.herokuapp.com")
      .then((result) => result.json())
      .then((jsonResult) => this.setState({dbRequest : jsonResult}))
  }

  componentDidMount(){
    this.populateDb()
  }

  getDeletable = (e) => {
    this.setState({toDelete: e})
    this.handleDeleteButton()
  }

  handleDeleteButton = () => {
    if(Object.values(this.state.toDelete).includes(true)){
      this.setState({buttonStatus: false})
    } else {
      this.setState({buttonStatus: true})
    }
  }

  massDelete = () => {
    const deletable = []
    for(let key in this.state.toDelete){
      if(this.state.toDelete[key]){
        deletable.push(key)
      }
    }

    if(deletable.length === 0){
      return null
    }

    fetch('https://pedro-ruas-scandiweb-test.herokuapp.com/delete', {
            method: 'POST',
            body: JSON.stringify(deletable),
        })
    this.setState(this.initialState)
    this.populateDb()
  }

  render(){
    if(!this.state.dbRequest){
      return <div />
    }

      return(
        <>
        <NavBar firstButton={{'id':'nav-first-button',
          'text':'ADD',
          'class':'btn btn-primary',
          'route':'/addproduct'}}
          secondButton={{'id':'delete-product-btn',
          'text':'MASS DELETE',
          'class':'btn btn-alert',
          'function': this.massDelete,
          'buttonStatus': false}}/>
          <ProductList function={this.getDeletable} products={this.state.dbRequest}/>
    </>
    )
  }
}

export default AllProducts