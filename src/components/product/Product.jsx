import React, {useState} from 'react';
import './product.css';
import bookImg from '../../resources/images/book.png'
import dvdImg from '../../resources/images/dvd.png'
import furnitureImg from '../../resources/images/furniture.png'

const Product = (props) => {
  const productImage = {'book' : bookImg, 'dvd' : dvdImg, 'furniture' : furnitureImg};
  
  const defaultView = {'name' : 'Product Name',
    'price' : 0.00,
    'sku' : 'PCT-SKU',
    'attribute' : 'Product Attribute',
    'type' : 'book'
  }

  let product = {'name' : props.name ? props.name : defaultView.name, 
  'price' : props.price ? props.price : defaultView.price,
  'sku' : props.sku ? props.sku : defaultView.sku, 
  'attribute' : props.attribute ? props.attribute : defaultView.attribute,
  'type' : props.type ? props.type : defaultView.type,
  };

  const attributeUnit = {'book' : ' Kg', 'dvd' : ' MB', 'furniture' : ' cm'}

  const [checked, setChecked] = useState(true)

  function handleChecked(){
    setChecked(!checked)
    props.function({'sku' : product.sku, 'delete' : checked})
  }

  function generateAttributeView(attribute){
    let view = ''
    if(attribute === defaultView.attribute){return attribute}

    if(typeof attribute == 'string' || attribute instanceof String){

      if(attribute.charAt(0) !== '['){
        attribute = parseFloat(attribute)
        return attribute + attributeUnit[product.type]
      } else {
        attribute = attribute.slice(1, attribute.length-1).split(',').map(parseFloat)
        let i = 0
        while(i < attribute.length-1){
          view += attribute[i] + 'x'
          i++
        }
        view += attribute[i] + attributeUnit[product.type]
      }
    } else {
      if(attribute.length === 1){
        return attribute + attributeUnit[product.type]
      } else {
        let i = 0
        while(i < attribute.length-1){
          view += attribute[i] + 'x'
          i++
        }
        view += attribute[i] + attributeUnit[product.type]
      }
    }
    return view
  }
    
    return (
      <section className="product">
      <label className='product-checkbox'>
          <input type="checkbox" name="delete-checkbox" className='delete-checkbox' onChange={handleChecked}/>
          <div className="checkbox"></div>
      </label>
        <img className='product-image' src={productImage[product.type]} alt={product.type + ' default picture'}/>
        <h5>{product.sku}</h5>
        <h3>{product.name}</h3>
        <h5>{generateAttributeView(product.attribute)}</h5>
        <h4>U${product.price}</h4>
    </section>
  )
}

export default Product