import React, { useState, useEffect } from 'react';
import Layout from './Layout';
// import { getProducts } from './apiCore';
import { getProducts, getProductsByArrival } from '../actions/productActions';
import Card from './Card';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const dispatch = useDispatch()
    const productFetch = useSelector((state)=>state.productFetch)
    const productArrivalFetch = useSelector((state)=>state.productArrivalFetch)
    console.log(productFetch);


    const loadProductsBySell = () => {
        // getProducts('sold').then(data => {
        //     if (data.error) {
        //         setError(data.error);
        //     } else {
        //         setProductsBySell(data);
        //     }
        // });
        dispatch(getProducts('sold'))
    };

    const loadProductsByArrival = () => {
        dispatch(getProductsByArrival('createdAt'))
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);
    useEffect(()=>{
        if(productFetch.data){
            if (productFetch.error) {
                    setError(productFetch.error);
                } else {
                    setProductsBySell(productFetch.data.data);
                }
        }
        
    },[productFetch.data])
    useEffect(()=>{
        if(productArrivalFetch.data){
            if (productArrivalFetch.error) {
                        setError(productArrivalFetch.error);
                    } else {
                        setProductsByArrival(productArrivalFetch.data.data);
                    }
        }

    },[productArrivalFetch.data])

    return (
        <Layout
            title="Book Store"
            description="Node React Book Store"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
