import React from 'react'
import NavBar from '../components/nav-bar/NavBar'
import ProductList from '../components/product-list/ProductList'

class AllProducts extends React.Component {

  constructor(){
    super()
    this.getDeletable = this.getDeletable.bind(this)
    this.handleDeleteButton = this.handleDeleteButton.bind(this)
    this.toDelete = {}
    this.buttonStatus = true
    this.setToDelete = this.setToDelete.bind(this)
    this.setButtonStatus = this.setButtonStatus.bind(this)

    this.massDelete = this.massDelete.bind(this)

    this.state = {
      dbRequest: null
    }

  }

  populateDb(){
      fetch("https://pedro-ruas-scandiweb-test.herokuapp.com")
      .then((result) => result.json())
      .then((jsonResult) => this.setState({dbRequest : jsonResult}))
  }

  componentDidMount(){
    this.populateDb()
  }

  setToDelete(value){
    this.toDelete = value
  }

  setButtonStatus(value){
    this.buttonStatus = value
  }

  getDeletable(e){
    this.setToDelete(e)
    this.handleDeleteButton()
    this.forceUpdate()
  }

  handleDeleteButton(){
    if(Object.values(this.toDelete).includes(true)){
      this.setButtonStatus(false)
    } else {
      this.setButtonStatus(true)
    }
  }

  massDelete(){
    const deletable = []
    for(let key in this.toDelete){
      if(this.toDelete[key]){
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
    this.setToDelete({})
    this.setState({dbRequest: null})
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