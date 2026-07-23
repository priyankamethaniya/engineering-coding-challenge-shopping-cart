import Header from "../components/Header";

import SearchBar from "../components/SearchBar";

import ProductList from "../components/ProductList";

import CartPanel from "../components/CartPanel";


import useProducts from "../hooks/useProducts";

import useCart from "../hooks/useCart";



function HomePage(){


    const {

        products,

        loading,

        error,

        query,

        setQuery

    } = useProducts();



    const {

        cart,

        add,

        remove,

        update,

        error:cartError

    } = useCart();



    function renderProducts(){

        if(loading){

            return (
                <h2>
                    Loading...
                </h2>
            );

        }

        if(error){

            return (
                <h2>
                    Error: {error}
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

                onAdd={add}

            />
        );

    }




    return (

        <div className="container">


            <Header />



            <main className="content">


                <section className="products">


                    <h2>
                        Products
                    </h2>



                    <SearchBar

                        value={query}

                        onChange={setQuery}

                    />



                    {renderProducts()}


                </section>




                <section className="cart">


                    <h2>
                        Cart
                    </h2>



                    <CartPanel

                        cart={cart}

                        error={cartError}

                        onRemove={remove}

                        onUpdate={update}

                    />


                </section>


            </main>


        </div>

    );


}


export default HomePage;
