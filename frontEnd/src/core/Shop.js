import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
// import { getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../actions/categoryActions";
import {getFilteredProducts} from '../actions/categoryActions';

const Shop = () => {
    const dispatch = useDispatch();
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const categoryFetch = useSelector((state)=> state.categoryFetch);
    const getFilteredFetchProducts = useSelector((state)=>state.getFilteredFetchProducts)
    
    console.log("object", categoryFetch)
    console.log(getFilteredFetchProducts)
    const init = () => {
        dispatch(getCategories())
    };

    const loadFilteredResults = newFilters => {
        dispatch(getFilteredProducts(skip,limit,newFilters))
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);
    
    useEffect(()=>{
        if(categoryFetch.data){
            if (categoryFetch.error) {
                    setError(categoryFetch.error);
                } else {
                    setCategories(categoryFetch.data.data);
                }
        }
    }, [categoryFetch.data || categoryFetch.error])

    useEffect(()=>{
        if(getFilteredFetchProducts.data){
            if (getFilteredFetchProducts.error) {
                    setError(getFilteredFetchProducts.error);
                } else {
                    setFilteredResults(getFilteredFetchProducts.data.data.data);
                    setSize(getFilteredFetchProducts.data.data.size);
                    setSkip(0);
                }
        }
    }, [getFilteredFetchProducts.data || getFilteredFetchProducts.error])

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")
                            }
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {/* {loadMoreButton()} */}
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
