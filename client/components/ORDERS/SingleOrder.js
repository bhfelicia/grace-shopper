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
    return <div>{order.tracking_number}</div>;
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
