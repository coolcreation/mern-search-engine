import { useState, useEffect} from 'react';

export default function Products() {

    const [products, setProducts] = useState([])
    
    const fetchedProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/products')
            const data = await response.json()
            console.log(data)
            setProducts(data)
        } catch (err) {
            console.error('Could not load products:', err)
        }
    }

    useEffect(() => {
        // document.title = 'Products';
        fetchedProducts();
    }, []);



    return (

       <div className='product-card-container d-flex flex-wrap justify-content-around w-100 gap-3'>
        {products.map((product, index) => (
            <div className="card bg-dark col-12 col-lg-3" key={index.id}>

                <div class="card-body text-products">
                    <h4 className="card-title text-white">{product.name}</h4>
                    <p className="card-text text-white">{product.description}</p>
                    <p className="card-text text-info fs-5 fw-semibold">${product.price}</p>
                    <p className="card-text text-white">qty: {product.stock}</p>
                    <a className="btn btn-primary w-100 fw-semibold">ADD TO CART</a>
                </div>
            </div>
        ))}
       </div>

    )
}


// function Blog(props) {
//   const sidebar = (    <ul>
//       {props.posts.map((post) =>
//         <li key={post.id}>          {post.title}
//         </li>
//       )}
//     </ul>
//   );
//   const content = props.posts.map((post) =>    <div key={post.id}>      <h3>{post.title}</h3>
//       <p>{post.content}</p>
//     </div>
//   );
//   return (
//     <div>
//       {sidebar}      <hr />
//       {content}    </div>
//   );
// }

// const posts = [
//   {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
//   {id: 2, title: 'Installation', content: 'You can install React from npm.'}
// ];

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Blog posts={posts} />);