import ProductCard from "./ProductCard";



function ProductList({

    products,

    onAdd

}){


    return (

        <div className="product-list">


            {
                products.map(product => (

                    <ProductCard

                        key={product.id}

                        product={product}

                        onAdd={onAdd}

                    />

                ))
            }


        </div>

    );


}


export default ProductList;
