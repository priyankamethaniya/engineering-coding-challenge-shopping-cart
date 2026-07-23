import ProductList from "./ProductList";

function ProductsPanel({

    products,

    loading,

    error,

    disabled,

    onAdd

}){

    if(loading){

        return (
            <h2>
                Loading products...
            </h2>
        );

    }

    if(error){

        return (
            <h2>
                Unable to load products.
                <br />
                Please try again.
            </h2>
        );

    }

    if(products.length === 0){

        return (
            <h2>
                No products found.
            </h2>
        );

    }

    return (
        <ProductList

            products={products}

            disabled={disabled}

            onAdd={onAdd}

        />
    );

}

export default ProductsPanel;
