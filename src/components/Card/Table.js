import React from 'react';
import axios from 'axios';


function Table(props) {

  const closeOrder = (id) => {
    axios({
      url: `http://localhost:3005/trade/${id}`,
      method: 'PATCH',
      headers: {
        jwttoken: localStorage.getItem('tradetoken')
      }
    })
    .then(({data}) => {
      alert('Order has been close');
      props.getListOrder();
    })
    .catch(err => {
      console.log(err);
    })
  }

  return(
      <React.Fragment>
          <table class="table table-dark" style={{border: '1px solid grey',borderTopRightRadius: '20px', borderTopLeftRadius: '20px'}}>
            <thead style={{backgroundColor: '#2c7873', borderTopRightRadius: '20px', borderTopLeftRadius: '20px'}}>
              <tr style={{borderTopRightRadius: '20px', borderTopLeftRadius: '20px'}}>
                <th scope="col">No</th>
                <th scope="col">Currency</th>
                <th scope="col">Price</th>
                <th scope="col">Amount</th>
                <th scope="col">Order</th>
                <th scope="col">Gain/Loss</th>
                <th scope="col">Action</th>
              </tr>
            </thead>


          <tbody>
          {props.listOrder.length > 0 ? 
          <>
            {props.listOrder.map((order, index) => {
              let { btc, eth, ltc } = props.price;
              let gainLoss;
              let warning = {backgroundColor: '', color: 'black', fontWeight: '600'}

              if (order.currency === 'BTC') {
                gainLoss = (btc - order.price) * order.amount;
                if (gainLoss < 0) {
                  warning.backgroundColor = 'red'
                }else if (gainLoss > 0) {
                  warning.backgroundColor = 'green'
                }else {
                  warning.backgroundColor = '#1b262c'
                  warning.color = 'white'
                }
              }else if (order.currency === 'ETH') {
                gainLoss = (eth - order.price) * order.amount;
                if (gainLoss < 0) {
                  warning.backgroundColor = 'red'
                }else if (gainLoss > 0) {
                  warning.backgroundColor = 'green'
                }else {
                  warning.backgroundColor = '#1b262c'
                  warning.color = 'white'
                }
              }else if (order.currency === 'LTC') {
                gainLoss = (ltc - order.price) * order.amount;
                if (gainLoss < 0) {
                  warning.backgroundColor = 'red'
                }else if (gainLoss > 0) {
                  warning.backgroundColor = 'green'
                }else {
                  warning.backgroundColor = '#1b262c'
                  warning.color = 'white'
                }
              }

              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{order.currency}</td>
                  <td>{order.price}</td>
                  <td>{order.amount}</td>
                  <td style={order.order_type === 'buy' ? {color: 'green', fontWeight: 'bold'} : {color: 'red', fontWeight: 'bold'}}>{order.order_type === 'buy' ? "Buy" : "Sell"}</td>
                  <td style={warning}>
                      {gainLoss.toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => closeOrder(order._id)}>Close</button>
                  </td>
              </tr>
              )
            })}
          </>  
        : ""}
        </tbody>
      </table>
    </React.Fragment>
)

};

export default Table;