import Header from "../components/Header";

import ProductList from "../components/ProductList";

import CartPanel from "../components/CartPanel";


import useProducts from "../hooks/useProducts";

import useCart from "../hooks/useCart";



function HomePage(){


    const {

        products,

        loading,

        error

    } = useProducts();



    const {

        cart,

        add,

        remove,

        update

    } = useCart();




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




    return (

        <div className="container">


            <Header />



            <main className="content">


                <section className="products">


                    <h2>
                        Products
                    </h2>



                    <ProductList

                        products={products}

                        onAdd={add}

                    />


                </section>




                <section className="cart">


                    <h2>
                        Cart
                    </h2>



                    <CartPanel

                        cart={cart}

                        onRemove={remove}

                        onUpdate={update}

                    />


                </section>


            </main>


        </div>

    );


}


export default HomePage;
