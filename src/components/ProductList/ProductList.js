import React, { Component } from 'react';
import './ProductList.css';
import config from '../../config';
import { Badge } from 'antd';


class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            search: this.props.search,
            products: [],
        };
        this.getProducts = this.getProducts.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search !== this.props.search) {
            this.setState({
                search: this.props.search,
            });
        }
    }

    async getProducts() {
        try {
            const response = await fetch(`${config.apiUrl}/products`);
            const products = await response.json();
            this.setState({ products: products.products });
        } catch (error) {
            console.log('error: ', error);
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        const { products } = this.state;
        return (
            <div className="nam-shop-product-list-container">
                <div className="nam-shop-product-list">
                    {products.map((product, index) => (
                        <div key={`key-${product.id}`} className="nam-shop-product-list-item-container">
                            <Badge.Ribbon text={`${product.discountPercentage}% discount`} color="green">
                                <div className="nam-shop-product-list-item">
                                    <div className="nam-shop-product-list-item-image-container">
                                        <img className="nam-shop-product-list-item-image" src={product.thumbnail} alt={product.name} />
                                    </div>
                                    <div className="nam-shop-product-list-item-name">{product.title}</div>
                                    <div className="nam-shop-product-list-item-price">$ {product.price}</div>
                                    <div className="nam-shop-product-list-item-add-to-cart">
                                        <button onClick={() => this.props.addToCart(product)}>Add to cart</button>
                                    </div>
                                </div>
                            </Badge.Ribbon>
                        </div>
                    ))
                    }
                </div>
            </div >
        )
    }
}

export default ProductList;