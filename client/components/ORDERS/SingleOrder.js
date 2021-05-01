import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrder } from '../../store/thunks/orderThunk';

class SingleOrder extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getOrder(this.props.match.params.id);
  }
  render() {
    const order = this.props.orderReducer.order;
    return (
      <div>
        <div>
          {order.tracking_number}: {order.status}
        </div>
        <div>
          {order.ordered_date} - {order.delivered_date}
        </div>
        <div>Shipping Address: {order.shipping_address}</div>
        <div>Total: {order.total}</div>
        <Link to={`/orders/${order.id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ orderReducer, userReducer }) => ({
  orderReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getOrder: (id) => dispatch(fetchOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
