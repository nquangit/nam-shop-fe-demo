import React, { Component } from 'react';
import './CartList.css';
import { Table, Popconfirm, Button, InputNumber } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


class CartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart,
            search: '',
            isModalLoginFormOpen: this.props.isModalLoginFormOpen,
            isLoginForm: this.props.isLoginForm,
            logged: this.props.logged,
            user: this.props.user,
            cartListData: this.props.cart.map(item => (
                {
                    key: item.id,
                    product: { title: item.title, thumbnail: item.thumbnail },
                    unitPrice: item.price,
                    quantity: { id: item.id, quantity: item.quantity },
                    totalPrice: item.price * item.quantity,
                })
            ),
            checkedList: [],
            totalSelectedPrice: 0,
            isScrollingDown: false,
            prevScrollY: 0,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.cart !== prevProps.cart) {
            this.setState({ cart: this.props.cart });
            this.setState({
                cartListData: this.props.cart.map(item => (
                    {
                        key: item.id,
                        product: { title: item.title, thumbnail: item.thumbnail },
                        unitPrice: item.price,
                        quantity: { id: item.id, quantity: item.quantity },
                        totalPrice: item.price * item.quantity,
                    })
                )
            });
            this.setState({
                totalSelectedPrice: this.state.checkedList.reduce((total, item) =>
                    Number(total) + Number(item.price) * Number(item.quantity), 0
                )
            });
        }
        if (this.props.user !== prevProps.user) {
            this.setState({ user: this.props.user });
        }
        if (this.props.logged !== prevProps.logged) {
            this.setState({ logged: this.props.logged });
        }
    }

    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < this.state.prevScrollY) {
            this.setState({ isScrollingDown: true });
        } else {
            this.setState({ isScrollingDown: false });
        }

        this.setState({ prevScrollY: currentScrollY });
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const { cart, cartListData, checkedList, isScrollingDown, totalSelectedPrice } = this.state;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                const new_checkedList = cart.filter(item =>
                    selectedRows.some(selectedItem => selectedItem.key === item.id)
                )
                this.setState({
                    checkedList: new_checkedList
                });
                this.setState({
                    totalSelectedPrice: new_checkedList.reduce((total, item) =>
                        Number(total) + Number(item.price) * Number(item.quantity), 0
                    )
                });
            },
        };
        const columns = [
            {
                title: 'Product',
                dataIndex: 'product',
                render: item => (
                    <div className="nam-shop-cart-list-product-item">
                        <img src={item.thumbnail} alt={item.title} />
                        <a href="##">{item.title}</a>
                    </div>
                ),
                width: 400,
                ellipsis: true,
            },
            {
                title: 'Unit Price',
                dataIndex: 'unitPrice',
                sorter: {
                    compare: (a, b) => a.price - b.price,
                    multiple: 3,
                },
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                sorter: {
                    compare: (a, b) => a.quantity - b.quantity,
                    multiple: 2,
                },
                render: (text) => (
                    <div className="nam-shop-cart-list-quantity">
                        <InputNumber min={1} defaultValue={text.quantity} onChange={
                            (value) => {
                                // Convert value to number
                                try {
                                    value = Number(value);
                                    if (value > text.quantity) {
                                        const productInCart = cart.find(item => item.id === text.id);
                                        if (productInCart) {
                                            this.props.addToCart(productInCart);
                                        }
                                    } else {
                                        const productInCart = cart.find(item => item.id === text.id);
                                        if (productInCart) {
                                            this.props.removeFromCart(productInCart.id, 1);
                                        }
                                    }
                                } catch (error) {
                                    console.log('error: ', error);
                                }
                            }
                        } />
                    </div>
                ),
            },
            {
                title: 'Total Price',
                dataIndex: 'totalPrice',
                sorter: {
                    compare: (a, b) => (a.price * a.quantity) - (b.price * b.quantity),
                    multiple: 1,
                },
            },
            {
                title: 'Delete',
                dataIndex: 'operation',
                render: (_, record) =>
                    cart.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.props.removeFromCart(record.key, record.quantity.quantity)}>
                            <Button danger><FontAwesomeIcon icon={faTrashCan} /></Button>
                        </Popconfirm>
                    ) : null,
            },
        ];
        return (
            <div className="nam-shop-card-list-container">
                <div className="nam-shop-cart-list">
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={cartListData}
                        onChange={this.onChange} />
                </div>
                <div className={`nam-shop-cart-list-checkout ${isScrollingDown ? 'hidden' : 'visible'}`} >
                    <div className="nam-shop-cart-list-checkout-selected">
                        <div className="nam-shop-cart-list-checkout-selected-label">
                            <span>Selected: </span>
                            {checkedList.length} items
                        </div>
                        {checkedList.length > 0 ? (
                            <Popconfirm title="Sure to delete?" onConfirm={
                                () => {
                                    checkedList.forEach(item => {
                                        this.props.removeFromCart(item.id, item.quantity.quantity);
                                    });
                                }
                            }>
                                <div className="nam-shop-cart-list-checkout-selected-button">
                                    <button >Remove all</button>
                                </div>
                            </Popconfirm>
                        ) : null}
                    </div>
                    <div className="nam-shop-cart-list-checkout-total">
                        <div className="nam-shop-cart-list-checkout-total-label">
                            <span>Total payment: </span>
                            $ {totalSelectedPrice}
                        </div>
                        {checkedList.length > 0 ? (
                            < div className="nam-shop-cart-list-checkout-total-button">
                                <button>Checkout</button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div >
        );
    }
}

export default CartList;