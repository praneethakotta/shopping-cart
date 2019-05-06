import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import Navbar from './Navbar'
import {Redirect} from 'react-router-dom'

 class Home extends Component{
     constructor(props) {
         super(props)

         this.state = {
             userLoggedIn: true
         }
     }

    // componentDidMount() {
    //     document.body.addEventListener('mousemove', )
    //     this.interval = setInterval(() => {
    //         fakeAuth.signout(() => {
    //             this.setState(() => ({
    //                 userLoggedIn: false
    //             }))
    //         }, this.props.location.session)
    //     }, 1000 * 60)
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    render() {
        // if(this.state.userLoggedIn === false) {
        //     return(
        //         <Redirect to={{
        //             pathname: '/'
        //         }} />
        //     )
        // }
        let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={item.img} alt={item.title}/>
                            <span className="card-title">{item.title}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p><b>Price: {item.price}$</b></p>
                            <p style={styles.addedLabel}>{item.addedLabel ? 'Item already added to cart' : ''}</p>
                            <p>{item.quantity ? 'Qunatity:' + item.quantity : ''}</p>
                        </div>
                 </div>

            )
        })

        return(
            <div>
                <Navbar username={this.props.location.username}/>
                <div className="container">
                    <div className="box">
                        {itemList}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        items: state.items
    //   items: state.items.slice(0, 6)
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

const styles = {
     addedLabel: {
         color: '#ee6e73'
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)