import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchRecent } from "../../store/thunks/orderThunk";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { recentOrder } = this.props.orderReducer;
    return (
      <div>
        <h1>
          thank you for your order,{" "}
          {`${this.props.userReducer.selectedUser.fullName}`}
        </h1>
        <h3>order id: {`${recentOrder.id}`}</h3>
        <h3>order total: ${`${+recentOrder.total + recentOrder.tax}`}</h3>
        <h3>order status: {`${recentOrder.status}`}</h3>
        <h4>order date: {`${recentOrder.ordered_date}`}</h4>
        <div>
          you bought:
          <ol>
            {recentOrder.products.map((product) => (
              <li key={product}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ol>
        </div>
        <div>your items will arrive in 5-7 business days</div>
        <div>
          the package tracking number is: {`${recentOrder.tracking_number}`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ orderReducer, userReducer }) => ({
  orderReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getRecent: (id) => dispatch(fetchRecent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
