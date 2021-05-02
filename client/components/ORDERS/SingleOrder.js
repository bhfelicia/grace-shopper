import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateOrder, fetchOrder } from '../../store/thunks/orderThunk';

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
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  async componentDidMount() {
    await this.props.getOrder(this.props.match.params.id);
    this.setState({
      id: this.props.orderReducer.order.id,
      total: this.props.orderReducer.order.total,
      ordered_date: this.props.orderReducer.order.ordered_date,
      delivered_date: this.props.orderReducer.order.ordered_date,
      status: this.props.orderReducer.order.status,
      isCreated: this.props.orderReducer.order.isCreated,
      tracking_number: this.props.orderReducer.order.tracking_number,
      shipping_address: this.props.orderReducer.order.shipping_address,
    });
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
    if (window.localStorage.isAdmin === 'true') {
      return (
        <div>
          <div>
            <form onSubmit={this.onSave}>
              {order.tracking_number}: {order.status}
              <select name="status" onChange={this.onChange}>
                <option>-----</option>
                <option>created</option>
                <option>processing</option>
                <option>cancelled</option>
                <option>completed</option>
              </select>
              <button>Update</button>
            </form>
          </div>
          <div>
            {order.ordered_date} - {order.delivered_date}
          </div>
          <div>Shipping Address: {order.shipping_address}</div>
          <div>Total: {order.total}</div>
        </div>
      );
    } else {
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
