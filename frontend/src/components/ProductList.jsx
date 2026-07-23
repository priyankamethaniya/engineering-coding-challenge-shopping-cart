import ProductCard from "./ProductCard";



function ProductList({

    products,

    disabled,

    onAdd

}){


    return (

        <div className="product-list">


            {
                products.map(product => (

                    <ProductCard

                        key={product.id}

                        product={product}

                        disabled={disabled}

                        onAdd={onAdd}

                    />

                ))
            }


        </div>

    );


}


export default ProductList;
