import React from 'react';
import axios from 'axios';

function Login (props) {

    const [loginData, setLoginData] = React.useState({email: '', password: ''});
    const [loading, setLoading] = React.useState(false)

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios({
            url: 'http://localhost:3005/users/login',
            method: 'POST',
            data: {
                email: loginData.email,
                password: loginData.password
            }
        })
        .then(({data}) => {
            setLoading(false)
            localStorage.setItem('tradetoken', data.token);
            props.showMainPage();
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <div style={{marginTop: '150px'}}>
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input name="email" value={loginData.email} onChange={handleChange} />
            <br />
            <input name="password" value={loginData.password} onChange={handleChange} style={{marginTop: '10px'}} />
            <br />
            <button style={{marginTop: '20px', width: '100px'}} type="submit">
                {loading ? <> 
                    <div class="spinner-border text-warning" role="status">
                    <span class="sr-only">Loading...</span>
                    </div>
                
                </> : "Login"}
            </button>
            </form>
        </div>
    )


}

export default Login;