import Header from "../components/Header";

import SearchBar from "../components/SearchBar";

import ProductsPanel from "../components/ProductsPanel";

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

        loading:cartLoading,

        actionPending,

        add,

        remove,

        update,

        error:cartError

    } = useCart();




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



                    <ProductsPanel

                        products={products}

                        loading={loading}

                        error={error}

                        disabled={actionPending}

                        onAdd={add}

                    />


                </section>




                <section className="cart">


                    <h2>
                        Cart
                    </h2>



                    <CartPanel

                        cart={cart}

                        loading={cartLoading}

                        actionPending={actionPending}

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
