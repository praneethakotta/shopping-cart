import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Logout extends Component {
    render() {
        return(
            <div>
                <Link to="/" className="btn btn-primary"></Link>
            </div>
        )
    }
}

export default Logout;