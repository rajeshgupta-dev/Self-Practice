import React, { useEffect, useState } from 'react'

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortValue] = useState("a-z");
  const [sortPrice, setSortPrice] = useState(0);

  async function fetchProductData() {
    setLoading(true)
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      console.log(data.products);

    } catch (error) {
      console.log("Error in fethcin api", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  if (loading) {
    return <p>Loading....</p>
  }

  {/* search by title  */ }
  let filterdProduct = products.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase()))
  // console.log(searchData)
  
  // pagination 
  const perPage = 8;
  const totalPage = Math.ceil(filterdProduct.length / perPage)
  const startIndex = (currentpage - 1) * perPage;
  const endIndex = startIndex + perPage

  // sort by title

  let sortedProduct = products.sort((a, b) => {
    return sortValue === "a-z" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  });


  console.log("price", sortPrice);


  const productPerPage = filterdProduct.slice(startIndex, endIndex);
  
  // console.log(totalPage, startIndex, endIndex, productPerPage);

  // page number count 
  let pageNumber = Array.from({ length: totalPage }, (_, i) => i + 1);




  return (
    <div>

      {/* search by title  */}
      <div className='seach-input'>

        <input type="text"
          placeholder='Search product...'
          onChange={(e) => setSearchInput(e.target.value)} />
        {/* sorting by title  */}
        <select className='select'
          // value={sortValue}
          onChange={(e) => setSortValue(e.target.value)} value={sortValue}>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>

        {/* sort price  */}
        <input type="number" placeholder='Enter price...' onChange={(e) => setSortPrice(e.target.value)} />
      </div>

      {/* data display */}
      {
        productPerPage.length > 0 ? <div className='product-container'>
          {
            productPerPage.map((item) => (
              <div key={item.id} className='product-card'>
                <p>{item.id}</p>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
                <p>{item.price}</p>
              </div>
            ))
          }
        </div> : <div>
          <p>Product is not avalable...</p>
        </div>
      }

      {/* pagination  */}
      {
        <div>
          <div className='pagination-container'>
            <button className='btn' onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentpage === 1}>prev</button>

            {/* page number pagiantion  */}
            {
              pageNumber.map((num) => (
                <button className={currentpage === num ? "active" : "btn"} key={num} onClick={() => setCurrentPage(num)}>{num}</button>
              ))
            }


            <button className='btn' onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={totalPage === currentpage}>next</button>
          </div>
        </div>
      }

    </div>
  )
}

export default ProductCard