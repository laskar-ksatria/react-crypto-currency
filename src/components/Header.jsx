import React from 'react';

function Header(props) {

    return (

        <div style={{display: 'flex', minHeight: '100x', width: '100%',borderBottom: '1px solid gray', justifyContent: 'space-between',alignItems: 'flex-end'}}>
            <div>
                <button onClick={() => props.hide()}>Logout</button>
            </div>
        </div>

    )

};

export default Header;