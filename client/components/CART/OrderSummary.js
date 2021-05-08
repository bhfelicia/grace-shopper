import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecent } from '../../store/thunks/orderThunk';
import { fetchUser } from '../../store/thunks/userThunk';

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {
        fullName: '',
        id: 0,
        isAdmin: false,
        role: '',
        first: '',
        last: '',
        password: '',
        email: '',
        createdAt: '',
        updatedAt: '',
      },
    };
  }
  async componentDidMount() {
    const { data: loggedInUser } = await axios.get('/api/auth', {
      headers: { authorization: window.localStorage.getItem('token') },
    });
    this.setState({ loggedInUser });
    await this.props.getUser(Number(this.state.loggedInUser.id));
  }

  render() {
    const { recentOrder } = this.props.orderReducer;
    return (
      <div>
        <h1>
          thank you for your order,
          {` ${this.props.userReducer.selectedUser.fullName}` || 'guest'}
        </h1>
        <h3>order id: {`${recentOrder.id}`}</h3>
        <h3>order total: ${`${+recentOrder.total + recentOrder.tax}`}</h3>
        <h3>order status: created</h3>
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
  getUser: (id) => dispatch(fetchUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
