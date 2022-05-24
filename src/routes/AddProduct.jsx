import React from 'react'
import ProductFrom from '../components/product-form/ProductFrom'
import NavBar from '../components/nav-bar/NavBar'
import { Navigate } from 'react-router-dom'

class AddProduct extends React.Component {
  constructor(){
    super()

    this.buttonStatus = true
    this.done = false

    this.submitForm = this.submitForm.bind(this)
    this.getStatus = this.getStatus.bind(this)
  }

  submitForm(){
    document.getElementById('SUBMIT-PRODUCT-FORM').click()
    this.done = true
    this.forceUpdate()
  }

  getStatus(status){
    this.buttonStatus = status
    this.forceUpdate()
  }

  render(){
    if(!this.done){   
      return (
        <>
        <ProductFrom statusFunction={this.getStatus}/>
        <NavBar firstButton={{'id':'save-product-btn',
            'text':'SAVE',
            'class':'btn btn-alert',
            'function':this.submitForm,
            'buttonStatus':this.buttonStatus}}
            secondButton={{'id':'btn-cancel-add',
            'text':'CANCEL',
            'class':'btn btn-primary',
            'route': '/'}}/>
        </>
      )
    } else {
      return <Navigate to={"/"}></Navigate>
    }
  }

}
export default AddProduct