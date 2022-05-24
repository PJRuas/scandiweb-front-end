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

        this.initial = 'book'

        this.initialPreview = [{
            'name':'', 'type': this.initial, 'price':'', 'attribute':'', 'sku': ''
        }]
        this.formFields = this.typeFields[this.initial]
        this.productPreview = this.initialPreview
        this.attributeConverter = {}

        this.setFormFields = this.setFormFields.bind(this)
        this.setProductPreview = this.setProductPreview.bind(this)
        this.setAttributeConverter = this.setAttributeConverter.bind(this)
        
        this.handleType = this.handleType.bind(this)
        this.handleAttribute = this.handleAttribute.bind(this)
        this.handleFields = this.handleFields.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
        this.isArrayEmpty = this.isArrayEmpty.bind(this)
        this.resetFields = this.resetFields.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    setFormFields(value){
        this.formFields = value
    }
    setProductPreview(value){
        this.productPreview = value
    }
    setAttributeConverter(value){
        this.attributeConverter = value
    }
    
    handleSave(){
        let status = true
        if(!Object.values(this.productPreview[0]).includes('') ){
            if(this.productPreview[0].type !== 'furniture' || this.productPreview[0].attribute.length === 3){
                status = false
            }
        }
        this.props.statusFunction(status)
    }
    
    handleType(e){
        this.handleFields(e)
        this.handlePreview(e)
    }

    handleAttribute(e){
        let attribute = e.target
        let attributes = this.attributeConverter
        if (!this.commonFields.includes(attribute.id)) {
            attributes[attribute.id] = attribute.value
        }
        this.setAttributeConverter(attributes)
    }

    handlePreview(e) {
        let previewInput = this.productPreview[0];
        this.handleAttribute(e)
        let attribute = []
        let id = ''
        if(e.target.id === 'productType') { id = 'type'} 
        else { id = e.target.id}
        console.log(id)
        for(let field in this.attributeConverter){
            for(let i of this.formFields){
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
        this.setProductPreview([previewInput])
        this.handleSave()
        this.forceUpdate()
    }

    isArrayEmpty(array) {
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

    handleFields(e) {
        this.setFormFields(this.typeFields[e.target.value])
        this.resetFields()
    }

    resetFields() {
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


    handleSubmit(e){
        e.preventDefault()

        const formData = new FormData(e.target)

        fetch('https://pedro-ruas-scandiweb-test.herokuapp.com/add', {
            method: 'POST',
            body: formData,
        })
    }


    render(){
        return (
            <section className='container' id='add-product-page'>
                <div id="add-product-header">
                    <h1>Add Product</h1>
                </div>
                <div id="product-view">
                    <div>
                        <form id='product_form' method='POST' action='https://pedro-ruas-scandiweb-test.herokuapp.com/add' onSubmit={this.handleSubmit}>
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
                            {this.formFields.map((field) => {return <>
                                <div className='input-group'>
                                    <input type="number" autoComplete='off' name={field} step="0.01" min="0.01" className="input" id={field} required onChange={this.handlePreview}/>
                                    <label className='input-label'>{field}</label>
                                </div>
                            </>
                            })}
                            <input type='submit' id='SUBMIT-PRODUCT-FORM'/>
                    </form>
                </div>
                <div className="product-preview">
                    {this.productPreview.map((input) =>  <Product name={input.name} type={input.type} price={input.price} sku={input.sku} attribute={input.attribute}/>)}
                </div>
            </div>
        </section>
        )
    }
}

export default ProductFrom