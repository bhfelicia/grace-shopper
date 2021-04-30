import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../store/thunks/orderThunk';

class AllOrders extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    const activeUser = this.props.userReducer.selectedUser;
    if (activeUser.isAdmin) {
      return (
        <div>
          {this.props.orderReducer.orders.map((order) => {
            return (
              <Link key={order.id} to={`/orders/${order.id}`}>
                <div>
                  <div>{order.tracking_number}</div>
                  <div>{order.shipping_address}</div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          {this.props.orderReducer.orders
            .filter((order) => order.userId === activeUser.id)
            .map((filteredOrder) => {
              return (
                <Link to={`/orders/${order.id}`}>
                  <div key={filteredOrder.id}>
                    {filteredOrder.tracking_number}
                  </div>
                </Link>
              );
            })}
        </div>
      );
    }
  }
}
const mapStateToProps = ({ orderReducer, userReducer }) => ({
  orderReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
