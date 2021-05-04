// import React, { Component } from "react";
// import { connect } from "react-redux";

// import { fetchCart, fetchOrders } from "../../store/thunks/orderThunk";

// let theCart;

// class Cart extends Component {
//   constructor(props) {
//     super(props);
//     // this.state = {
//     //   currentCart: {},
//     // };
//   }
//   componentDidMount() {
//     this.props.getOrders();
//     this.props.getCart();
//   }

//   render() {
//     const currentCart = this.props.orderReducer.currentCart || [];
//     if (!currentCart.products) return <div>Your cart is empty!</div>;
//     else
//       return (
//         <div>
//           <ol>
//             {currentCart.products.map((product) => (
//               <li key={product.id}>
//                 <img src={product.image}></img>
//                 <hr />
//                 <button>+</button>
//                 {"   "}
//                 {product.order_product.product_quantity}
//                 {"   "}
//                 <button onClick={() => this.deleteProductFromCart()}>
//                   --
//                 </button>{" "}
//                 x {product.name} - $
//                 {product.price * product.order_product.product_quantity} {"   "}
//                 <button>Delete</button>
//               </li>
//             ))}
//           </ol>
//           <hr />
//           <h5>Subtotal: ${+currentCart.total}</h5>
//           <h5>Tax: ${+currentCart.tax}</h5>
//           <h3>Grand total: ${Number(currentCart.total) + +currentCart.tax}</h3>
//         </div>
//       );
//     // console.log(currentCart.products);
//     // if (!currentCart) return null;
//     // return null;
//     // <div id="cart">
//     //   {currentCart.products.map((product) => (
//     //     <div>{product.name}</div>
//     //   ))}
//     // </div>
//   }
// }

// const mapStateToProps = ({ orderReducer }) => ({ orderReducer });

// const mapDispatchToProps = (dispatch) => ({
//   getCart: () => dispatch(fetchCart()),
//   getOrders: () => dispatch(fetchOrders()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);
import React, { Component } from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout";
import { fetchCart, fetchOrders } from "../../store/thunks/orderThunk";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
    };
    this.showCheckoutFunc = this.showCheckoutFunc.bind(this);
  }
  componentDidMount() {
    this.props.getOrders();
    this.props.getCart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showCheckout !== this.state.showCheckout) {
      this.render();
    }
  }
  showCheckoutFunc() {
    this.setState({ ...this.state, showCheckout: !this.state.showCheckout });
  }
  render() {
    console.log(this.state);
    const currentCart = this.props.orderReducer.currentCart || [];
    if (!currentCart.products) return <div>Your cart is empty!</div>;
    else if (!this.state.showCheckout)
      return (
        <div>
          <ol>
            {currentCart.products.map((product) => (
              <li key={product.id}>
                <img src={product.image}></img>
                <hr />
                <button>+</button>
                {product.order_product.product_quantity}
                <button onClick={() => this.deleteProductFromCart()}>--</button>
                x {product.name} - $
                {product.price * product.order_product.product_quantity}
                <button>Delete</button>
              </li>
            ))}
          </ol>
          <hr />
          <h5>Subtotal: ${currentCart.total}</h5>
          <h5>Tax: ${currentCart.tax}</h5>
          <h3>Grand total: ${Number(currentCart.total) + currentCart.tax}</h3>
          <button onClick={this.showCheckoutFunc}>Proceed to checkout</button>
        </div>
      );
    else
      return (
        <div>
          <ol>
            {currentCart.products.map((product) => (
              <li key={product.id}>
                <img src={product.image}></img>
                <hr />
                <button>+</button>
                {product.order_product.product_quantity}
                <button onClick={() => this.deleteProductFromCart()}>--</button>
                x {product.name} - $
                {product.price * product.order_product.product_quantity}
                <button>Delete</button>
              </li>
            ))}
          </ol>
          <hr />
          <h5>Subtotal: ${currentCart.total}</h5>
          <h5>Tax: ${currentCart.tax}</h5>
          <h3>Grand total: ${Number(currentCart.total) + currentCart.tax}</h3>
          <Checkout />
        </div>
      );
    // console.log(currentCart.products);
    // if (!currentCart) return null;
    // return null;
    // <div id="cart">
    //   {currentCart.products.map((product) => (
    //     <div>{product.name}</div>
    //   ))}
    // </div>
  }
}

const mapStateToProps = ({ orderReducer }) => ({ orderReducer });

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(fetchCart()),
  getOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
