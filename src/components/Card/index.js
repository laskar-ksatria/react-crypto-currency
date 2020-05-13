import React from 'react';
import axios from 'axios';

class Card extends React.Component {

   constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            symbol: props.symbol,
            price: null,
            lastPrice: null,
            amount: "",
        }
        this.pollPrice = this.pollPrice.bind(this)
    };

    componentDidMount() {
        this.pollPrice();
        setInterval(this.pollPrice, 1000)
    };

    createOrder = (orderType) => {
        axios({
            url: 'http://localhost:3005/trade',
            method: 'POST',
            headers: {
                jwttoken: localStorage.getItem('tradetoken')
            },
            data: {
                amount: this.state.amount,
                currency: this.state.symbol,
                price: this.state.price,
                order_type: orderType,
            }
        })
        .then(({data}) => {
            console.log(data);
            this.setState({amount: ""})
            alert('Order has executed')
            this.props.getListOrder();
        })
        .catch(err => {
            this.setState({amount: ""})
            console.log(err)
        })
    };

    pollPrice() {
        axios({
            url: `https://min-api.cryptocompare.com/data/price?fsym=${this.state.symbol}&tsyms=${this.state.symbol},USD`,
            method: 'GET',
        })
        .then(({data}) => {
            this.setState(prevState => ({
                price: data.USD,
                lastPrice: prevState.price !== data.USD ? prevState.price : prevState.lastPrice
            }))
            this.props.changePrice(this.state.symbol, data.USD)
        })
    }

    render() {
        let colorWarning;
        if (this.state.lastPrice) {
            if (this.state.lastPrice > this.state.price) {
                colorWarning = 'red'
            }else if (this.state.lastPrice < this.state.price) {
                colorWarning = '#11a511'
            }else {
                colorWarning = '#11a511'
            }
        }else {
            colorWarning = '#11a511'
        }
        return (
            <div>
            <div style={{color: 'white', fontWeight: '500'}}>
                <h2>{this.state.name}</h2>
                <hr />
                <div>
                    <h3>Price:<span style={{color: colorWarning}}>
                    {" "}
                        {this.state.price}
                        
                        </span>
                        </h3>
                </div>

                <div style={{marginTop: '20px'}}>
                    <input value={this.state.amount} placeholder="Enter amount" type="number" name="amount" id="amount" onChange={(e) => this.setState({amount: e.target.value})} />
                </div>
                   
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginTop: '20px'}}>
                    <div style={{marginRight: '30px'}}>
                        <button onClick={() => this.createOrder('buy')} style={{width: '70px', height: '30px',cursor: 'pointer', backgroundColor: '#71a95a', color: 'black', fontWeight: 'bold'}}>Buy</button>
                    </div>
                    <div>
                        <button onClick={() => this.createOrder('sell')} style={{width: '70px', height: '30px',cursor: 'pointer', backgroundColor: 'red', color: 'black', fontWeight: 'bold'}}>Sell</button>
                    </div>
                </div>
            </div>

            

            </div>
        )
    }

};


export default Card;

