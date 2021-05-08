import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateOrder, fetchOrder } from '../../store/thunks/orderThunk';

import axios from 'axios';

import { motion } from 'framer-motion';

class SingleOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.orderReducer.order.id,
      total: this.props.orderReducer.order.total,
      ordered_date: this.props.orderReducer.order.ordered_date,
      delivered_date: this.props.orderReducer.order.ordered_date,
      status: this.props.orderReducer.order.status,
      isCreated: this.props.orderReducer.order.isCreated,
      tracking_number: this.props.orderReducer.order.tracking_number,
      shipping_address: this.props.orderReducer.order.shipping_address,
      loggedInUser: {
        fullName: '',
        id: 1,
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
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  async componentDidMount() {
    await this.props.getOrder(this.props.match.params.id);
    const { data: loggedInUser } = await axios.get('/api/auth', {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    });
    this.setState({
      id: this.props.orderReducer.order.id,
      total: this.props.orderReducer.order.total,
      ordered_date: this.props.orderReducer.order.ordered_date,
      delivered_date: this.props.orderReducer.order.ordered_date,
      status: this.props.orderReducer.order.status,
      isCreated: this.props.orderReducer.order.isCreated,
      tracking_number: this.props.orderReducer.order.tracking_number,
      shipping_address: this.props.orderReducer.order.shipping_address,
      loggedInUser: loggedInUser,
    });
    console.log(this.state, 'jdfksdafkjshdn');
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  async onSave(ev) {
    ev.preventDefault();
    await this.props.editOrder(this.state);
    await this.props.getOrder(this.props.match.params.id);
  }
  render() {
    const order = this.props.orderReducer.order;
    if (this.state.loggedInUser.isAdmin) {
      return (
        <motion.div>
          <motion.div
            transition={{ ease: 'easeOut', duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ x: [100, 0], opacity: 1 }}
          >
            <form onSubmit={this.onSave}>
              <h2>tracking number: {order.tracking_number}</h2>
              <h2 style={{ fontWeight: 700 }}>status: {order.status}</h2>
              <select
                name="status"
                onChange={this.onChange}
                value={this.state.status}
              >
                <option>-----</option>
                <option>created</option>
                <option>processing</option>
                <option>cancelled</option>
                <option>completed</option>
              </select>
              <button>update</button>
            </form>
          </motion.div>
          <motion.div
            transition={{ ease: 'easeOut', duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ x: [-100, 0], opacity: 1 }}
          >
            <h3>order placed: {order.ordered_date}</h3>
            <h3>order delivered: {order.delivered_date}</h3>
            <div>
              <h3>shipping address: {order.shipping_address}</h3>
            </div>
            <div style={{ fontWeight: 700 }}>order total: {order.total}</div>
          </motion.div>
        </motion.div>
      );
    } else {
      return (
        <div>
          <motion.div
            transition={{ ease: 'easeOut', duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ x: [100, 0], opacity: 1 }}
          >
            <h2>tracking number: {order.tracking_number}</h2>
            <h2 style={{ fontWeight: 700 }}>status: {order.status}</h2>
          </motion.div>
          <motion.div
            transition={{ ease: 'easeOut', duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ x: [-100, 0], opacity: 1 }}
          >
            <h3>order placed: {order.ordered_date}</h3>
            <h3>order delivered: {order.delivered_date}</h3>
            <div>
              <h3>shipping address: {order.shipping_address}</h3>
            </div>
            <div style={{ fontWeight: 700 }}>order total: {order.total}</div>
          </motion.div>
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
  getOrder: (id) => dispatch(fetchOrder(id)),
  editOrder: (data) => dispatch(updateOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
