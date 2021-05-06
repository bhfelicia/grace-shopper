import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../store/thunks/orderThunk";
import { fetchUser } from "../../store/thunks/userThunk";

import axios from "axios";

class AllOrders extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadUser(Number(window.localStorage.userId));
    this.renderOrders = this.renderOrders.bind(this);
    this.state = {
      orders: [],
      loggedInUser: {
        fullName: "",
        id: 0,
        isAdmin: false,
        role: "",
        first: "",
        last: "",
        password: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      },
    };
  }
  async componentDidMount() {
    const { data: loggedInUser } = await axios.get("/api/auth", {
      headers: { authorization: window.localStorage.getItem("token") },
    });
    await this.props.loadUser(loggedInUser.id);
    await this.props.getOrders();
    this.setState({ loggedInUser, orders: this.props.orderReducer.orders });
  }
  renderOrders(orderType) {
    const filteredOrders = this.props.orderReducer.orders.filter(
      (order) => order.status === orderType
    );
    this.setState({ orders: filteredOrders });
  }
  render() {
    if (this.state.loggedInUser.isAdmin) {
      return (
        <div>
          <div>
            <button onClick={() => this.renderOrders("in progress")}>
              in progress
            </button>
            <button onClick={() => this.renderOrders("created")}>
              created
            </button>
            <button onClick={() => this.renderOrders("processing")}>
              processing
            </button>
            <button onClick={() => this.renderOrders("cancelled")}>
              cancelled
            </button>
            <button onClick={() => this.renderOrders("completed")}>
              completed
            </button>
          </div>
          <div>
            {this.state.orders.map((order) => {
              return (
                <Link key={order.id} to={`/orders/${order.id}`}>
                  <div>
                    <div>
                      {order.tracking_number}: {order.status}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      );
    } else if (
      this.state.loggedInUser.isAdmin === false &&
      this.state.loggedInUser.role === "AUTHENTICATED"
    ) {
      return (
        <div>
          {this.props.orderReducer.orders
            .filter((order) => order.userId === this.state.loggedInUser.id)
            .filter((order) => order.status !== "in progress")
            .map((filteredOrder) => {
              return (
                <Link key={filteredOrder.id} to={`/orders/${filteredOrder.id}`}>
                  <div key={filteredOrder.id}>
                    {filteredOrder.tracking_number}
                  </div>
                </Link>
              );
            })}
        </div>
      );
    } else {
      return <div>Log in to view your orders!</div>;
    }
  }
}
const mapStateToProps = ({ orderReducer, userReducer }) => ({
  orderReducer,
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: () => dispatch(fetchOrders()),
  loadUser: (id) => dispatch(fetchUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
