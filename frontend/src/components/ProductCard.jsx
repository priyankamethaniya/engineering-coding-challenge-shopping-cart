function ProductCard({
    product,
    disabled,
    onAdd
}){
    return (
        <div className="product-card">
            <h3>
                {product.name}
            </h3>
            <p>
                Price: ${product.price}
            </p>
            <p>
                Stock: {product.stock}
            </p>
            <button
                disabled={disabled}
                onClick={() =>
                    onAdd(product.id)
                }
            >
                Add Cart
            </button>
        </div>
    );
}

export default ProductCard;
