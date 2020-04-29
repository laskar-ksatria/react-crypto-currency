import React from 'react';
import './style.css';
import fetch from 'isomorphic-fetch';

class CryptoCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            symbol: props.symbol,
            price:null,
            lastPrice: null,
        }
    };

    componentDidMount() {
       this.pollPrice()
       setInterval(this.pollPrice, 5000)
    };

    pollPrice = () => {
        const { symbol } = this.state;
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},USD`)
            .then(res => res.json())
            .then(json => {
                this.setState((prevState) => ({
                    price: json.USD,
                    lastPrice: prevState.price !== json.USD
                        ? prevState.price
                        : prevState.price
                }))
            })


    }

    priceChange = (lastPrice, price) => {
        const diff = lastPrice - price;
        const change = diff / lastPrice
        return (change * 100).toFixed(3);
    }

    render() {
        const { name, symbol, price, lastPrice } = this.state;
        const gainLoss = lastPrice > price ? 'loss' : 'gain';
        
        return (
            <div className={`card ${gainLoss}`}>
                <div className="name">
                    {name}
                    <span>({symbol})</span>
                </div>

                <div className="percent">
                    {this.state.lastPrice ? <>
                        {this.priceChange(lastPrice, price)}%
                    </> : <>No Data</>}
                </div>

                <div className="logo">

                </div>

                <div className="price">
                    {price}
                </div>
            </div>
        )
    }

};

export default CryptoCard;