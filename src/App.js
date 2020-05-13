import React from 'react';
import './App.css';
import MainPage from './components/MainPage'
import Login from './components/Login';

class App extends React.Component {
  state = {
    showPage: false,
  }

  componentWillMount() {
    if (localStorage.getItem('tradetoken')) {
      this.setState({showPage: true});
    }else {
      this.setState({showPage: false});
    }
  }

  showMainPage = () => {
    this.setState({showPage: true})
  };

  hideMainPage = () => {
    localStorage.removeItem('tradetoken')
    this.setState({showPage: false})
  }

  render() {
    return (
      <div className="App">


      {this.state.showPage ? <MainPage hideMainPage={this.hideMainPage} /> : <Login showMainPage={this.showMainPage} />}


      </div>
    )
  }


}

export default App;