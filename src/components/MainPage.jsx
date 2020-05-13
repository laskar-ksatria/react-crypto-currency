import React from 'react';
import Header from './Header';
import Card from './Card';
import Table from './Card/Table';
import axios from 'axios'

const MainPage = props => {

    const [price, setPrice] = React.useState({btc: 0, eth: 0, ltc: 0});

    const [listOrder, setListOrder] = React.useState([]);

    React.useEffect(() => {
      getListOrder();
    },[])

    const getListOrder = () => {
      axios({
        url: 'http://localhost:3005/trade/myTrade',
        method: 'GET',
        headers: {
          jwttoken: localStorage.getItem('tradetoken')
        }
      })
      .then(({data}) => {
        setListOrder(data)
      })
      .catch(err => {
        alert('Error')
        console.log(err)
      })
    }

    const changePrice = (type, data) => {
      if (type === 'BTC') {
        setPrice({...price, btc: data})
      }else if (type === 'ETH') {
        setPrice({...price, eth: data})
      }else if (type === 'LTC') {
        setPrice({...price, ltc: data})
      }
    }

    return (
        <React.Fragment>
        <Header hide={props.hideMainPage} />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>


          {/* CARD ====================================== */}


          <div style={{margin: '30px', backgroundColor: '#30475e', flex: 1, minHeight: '150px', border: '1px solid grey', borderRadius: '15px'}}>

            <Card getListOrder={getListOrder} changePrice={changePrice} name="Bitcoin" symbol="BTC" />

          </div>

          <div  style={{margin: '30px', backgroundColor: '#30475e', flex: 1, minHeight: '150px', border: '1px solid grey', borderRadius: '15px'}}>
            
            <Card getListOrder={getListOrder} changePrice={changePrice} name="Ethereum" symbol="ETH" />

          </div>

          <div style={{margin: '30px', backgroundColor: '#30475e', flex: 1, minHeight: '150px', border: '1px solid grey', borderRadius: '15px'}}>
            
            <Card getListOrder={getListOrder} changePrice={changePrice} name="Litecoin" symbol="LTC" />

          </div>

          {/* END CARD =========================================== */}

        </div>

        <div style={{margin: '0 50px 0 30px', width: '96%', marginTop: '30px'}}>
          <Table price={price} listOrder={listOrder} getListOrder={getListOrder}/>
        </div>

        </React.Fragment>
    )
}

export default MainPage;