import React from "react";
import { connect } from "react-redux";
import { updateOrder, fetchOrder } from "../../store/thunks/orderThunk";

class EditOrder extends React.Component {
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
  }
  componentDidMount() {
    this.props.getOrder(this.props.match.params.id);
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  onSave(ev) {
    ev.preventDefault();
    this.props.updateOrder(this.state);
  }
  render() {
    const { id, firstName, lastName, email, imageUrl, gpa } = this.state;
    if (this.props.match.params.id) {
      // return (
      //   <div>
      //     <div>
      //       <div>
      //         Order Number:
      //         <input
      //           name="id"
      //           value={firstName}
      //           onChange={this.onChange}
      //         ></input>
      //       </div>
      //       <div>{order.status}</div>
      //       <div>
      //         {order.ordered_date} - {order.delivered_date}
      //       </div>
      //       <div>Shipping Address: {order.shipping_address}</div>
      //       <div>Total: {order.total}</div>
      //     </div>
      //   </div>
      // );
    } else {
      return <div>nothing to edit!</div>;
    }
  }
}

const mapStateToProps = ({ userReducer, orderReducer }) => {
  return {
    userReducer,
    orderReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getOrder: (id) => dispatch(fetchOrder(id)),
  updateOrder: (data) => dispatch(updateOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
