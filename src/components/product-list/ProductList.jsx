import React, { useState } from 'react'
import './productList.css'
import Product from '../product/Product'

const ProductList = (props) => {

  const allProducts = props.products

  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [searchFilter, setSearchFilter] = useState({'search-input':'', 'select-filter':'all'})
  const [toDelete, setToDelete] = useState({})

  function handleSearch(e){
    let filterState = searchFilter;
    filterState[e.target.id] = e.target.value
    setSearchFilter(filterState)
    filter(filterState['select-filter'], 'name', filterState['search-input'])
  }


  function filter(type, parameter, value) {
    let result = allProducts
    if(type !== 'all'){
      result = result.filter((product) => product.type === type);
    }
    if(value) {
      result = result.filter((product) => product[parameter].toLowerCase().includes(value.toLowerCase()))
    }
    setFilteredProducts(result);
  }

  function handleCheck(e){
    let deletable = toDelete
    let key = e[Object.keys(e)[0]]
    let value = e[Object.keys(e)[1]]
    deletable[key] = value
    setToDelete(deletable)
    props.function(toDelete)
  }

  return (
    <section id='product-list' className='container'>
      <div id="product-list-header">
        <h1>Product List</h1>
        <form className='search-form'>
          <select name="filter" id='select-filter' onChange={handleSearch}>
            <option value="all">All</option>
            <option value="book">Book</option>
            <option value="dvd">Dvd</option>
            <option value="furniture">Furniture</option>
          </select>
          <div className="input-group">
           <input type="text" required id='search-input' name="search" autoComplete="off" className="input" onChange={handleSearch}/>
           <label className="input-label">Search Product(s)</label>
          </div>
        </form>
      </div>
      <div id="product-list-itens">
        {filteredProducts.map((product) => {return <Product function={handleCheck} name={product['name']} type={product['type']} attribute={product['attribute']} price={product['price']} sku={product['sku']} key={product.sku}/>})}
      </div>
    </section>
  )
}

export default ProductList