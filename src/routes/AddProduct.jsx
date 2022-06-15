import React from 'react'
import ProductFrom from '../components/product-form/ProductFrom'
import NavBar from '../components/nav-bar/NavBar'
import { Navigate } from 'react-router-dom'

class AddProduct extends React.Component {
  constructor(){
    super()

    this.state = {buttonStatus : true, done : false }
  }

  submitForm = () => {
    document.getElementById('SUBMIT-PRODUCT-FORM').click()
  }
  
  onSubmitSuccess = () => {
    this.setState({done : true})
  }

  getStatus = (status) => {
    this.setState({buttonStatus : status})
  }

  render(){
    if(!this.state.done){   
      return (
        <>
        <ProductFrom statusFunction={this.getStatus} success = {this.onSubmitSuccess}/>
        <NavBar firstButton={{'id':'save-product-btn',
            'text':'SAVE',
            'class':'btn btn-alert',
            'function':this.submitForm,
            'buttonStatus':false}}
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