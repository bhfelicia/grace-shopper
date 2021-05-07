import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../store/thunks/orderThunk";
import { fetchUser } from "../../store/thunks/userThunk";

import axios from "axios";

import { motion } from "framer-motion";
import Emoji from "react-emoji-render";

class AllOrders extends React.Component {
  constructor(props) {
    super(props);
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
        <motion.div
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: [0.9, 1.05] }}
              onClick={() => this.renderOrders("in progress")}
            >
              in progress
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: [0.9, 1.05] }}
              onClick={() => this.renderOrders("created")}
            >
              created
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: [0.9, 1.05] }}
              onClick={() => this.renderOrders("processing")}
            >
              processing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: [0.9, 1.05] }}
              onClick={() => this.renderOrders("cancelled")}
            >
              cancelled
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: [0.9, 1.05] }}
              onClick={() => this.renderOrders("completed")}
            >
              completed
            </motion.button>
          </div>
          <div>
            {this.state.orders.map((order) => {
              return (
                <motion.div
                  key={order.id}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: [0.9, 1.05] }}
                >
                  <Link to={`/orders/${order.id}`}>
                    <div>
                      <div>
                        {order.tracking_number}: {order.status}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
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
