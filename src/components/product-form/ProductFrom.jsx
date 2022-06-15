import React from 'react'
import './productForm.css'
import Product from '../product/Product'

class ProductFrom extends React.Component {
    constructor(){
        super()

        this.typeFields = {
            'book':['Weight'],
            'dvd':['Size'],
            'furniture':['Height', 'Width', 'Length']
        }
        this.commonFields = ['sku', 'name', 'price', 'type']

        this.attributeConverter = {}

        this.state = {productPreview : {
            'name':'', 'type':'book', 'price':'', 'attribute':'', 'sku': ''
            },
            formFields : this.typeFields['book']
            
        }
    }

    setAttributeConverter = (value) => {
        this.attributeConverter = value
    }
    
    handleSave = () => {
        let status = true
        if(!Object.values(this.state.productPreview).includes('') ){
            if(this.state.productPreview.type !== 'furniture' || this.state.productPreview.attribute.length === 3){
                status = false
            }
        }
        this.props.statusFunction(status)
    }
    
    
    handleAttribute = (e) => {
        let attribute = e.target
        let attributes = this.attributeConverter
        if (!this.commonFields.includes(attribute.id)) {
            attributes[attribute.id] = attribute.value
        }
        this.setAttributeConverter(attributes)
    }
    
    handlePreview = (e) => {
        let previewInput = this.state.productPreview;
        this.handleAttribute(e)
        let attribute = []
        let id = ''
        if(e.target.id === 'productType') { id = 'type'} 
        else { id = e.target.id}
        for(let field in this.attributeConverter){
            for(let i of this.state.formFields){
                if (i === field ) {
                    attribute.push(this.attributeConverter[field])
                }
            }
        }
        
        if (this.isArrayEmpty(attribute)){
            attribute = ''
        }
        previewInput['attribute'] = attribute
        previewInput[id] = e.target.value
        this.setState({productPreview : previewInput})
        this.handleSave()
    }
    
    isArrayEmpty = (array) => {
        let emptyParameters = [null, '']
        let check = true;
        
        if(array.length === 0) {
            return check
        }
        for(let item of array){
            if(!emptyParameters.includes(item)){
                check = false;
                return check
            }
        }
        return check
    }
    
    handleFields = (e) => {
        this.setState({formFields : this.typeFields[e.target.value]})
        this.resetFields()
    }
    
    resetFields = () => {
        for(let key in this.typeFields){
            for(let item of (this.typeFields[key])){
                let target = document.getElementById(item)
                if(target){
                    target.value = ''
                }
            }
        }
        for(let field in this.attributeConverter){
            this.attributeConverter[field] = ''
        }
    }
    
    handleInputs = () =>{
        let inputs = document.querySelectorAll('#product_form input')
        let productType = document.getElementById('productType')
        
        let type = 'book'
        
        if(productType){
            type = productType.value
        }
        
        for(let element of inputs){
            element.addEventListener('invalid', function(event) {
                if(event.target.validity.valueMissing){
                  event.target.setCustomValidity('Please provide ' + type + "'s " + element.id)
                }  
            })
            
            element.addEventListener('change', function(event) {
                event.target.setCustomValidity('')
            })
        }
        
    }
    
    handleType = (e) =>{
        this.handleFields(e)
        this.handlePreview(e)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        
        const path = `https://pedro-ruas-scandiweb-test.herokuapp.com/add/${this.state.productPreview.type}`

        fetch(path, {
            method: 'POST',
            body: formData,
        })
        this.props.success();
    }
    
    
    render(){
        this.handleInputs()
        return (
            <section className='container' id='add-product-page'>
                <div id="add-product-header">
                    <h1>Add Product</h1>
                </div>
                <div id="product-view">
                    <div>
                        <form id='product_form' method='POST' onSubmit={this.handleSubmit}>
                            <div id="form-selector">
                                <label id='select-label'>Type</label>
                                <select name="productType" id="productType" onChange={this.handleType}>
                                    <option value="book">Book</option>
                                    <option value="dvd">Dvd</option>
                                    <option value="furniture">Furniture</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <input type="text" autoComplete='off' name="productSku" className="input" id="sku" required onChange={this.handlePreview} />
                                <label className='input-label'>Sku</label>
                            </div>
                            <div className="input-group">
                                <input type="text" autoComplete='off' name="productName" className="input" id="name" required onChange={this.handlePreview}/>
                                <label className='input-label'>Name</label>
                            </div>
                            <div className="input-group">
                                <input type="number" autoComplete='off' name="productPrice" step="0.01" min="0.01" className="input" id="price" required onChange={this.handlePreview}/>
                                <label className='input-label'>Price</label>
                            </div>
                            {this.state.formFields.map((field) => {return <>
                                <div className='input-group'>
                                    <input key={field} type="number" autoComplete='off' name={field} step="0.01" min="0.01" className="input" id={field} required onChange={this.handlePreview}/>
                                    <label key={`${field}Label`} className='input-label'>{field}</label>
                                </div>
                            </>
                            })}
                            <input type='submit' id='SUBMIT-PRODUCT-FORM'/>
                    </form>
                </div>
                <div className="product-preview">
                    {[this.state.productPreview].map((input) =>  <Product key={`${input.name}Preview`} name={input.name} type={input.type} price={input.price} sku={input.sku} attribute={input.attribute}/>)}
                </div>
            </div>
        </section>
        )
    }
}

export default ProductFrom