import React from 'react';
import './Crypto.css';

class CryptoCard extends React.Component {

    constructor(props) { 
        super(props)
        this.state = {
            name: props.name,
            symbol: props.symbol,
            price: null,
            lastPrice: null
        }
        this.pollPrice = this.pollPrice.bind(this)
    };

    componentDidMount() {
        this.pollPrice();
        setInterval(this.pollPrice, 10000)
    };

    pollPrice() {
        console.log('Polling price')
        const { symbol } = this.state
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},USD`)
            .then(resp => resp.json())
            .then(json => {
                this.setState(prev => ({
                    price: json.USD,
                    lastPrice: prev.price !== json.USD ? prev.price : prev.lastPrice
                }))

            })
    }

    render() {

        const { name, symbol, price, lastPrice } = this.state;
        const gainLoss = lastPrice > price ? 'loss' : 'gain';

        return (
            <div className={`card ${gainLoss}`}>
                <div>
                    {name} 
                    <span>
                        ({symbol})
                    </span>
                </div>

                <div className='percent'>

                </div>

                <div className="logo">

                </div>

                <div className="price">
                    {this.state.price}
                </div>
            </div>
        )
    };



};

export default CryptoCard;