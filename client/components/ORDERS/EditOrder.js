import React from 'react';
import { connect } from 'react-redux';

class EditOrder extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    {id} = this.props.match.params.id;
  }
  render() {
    return <div>edit this order!</div>;
  }
}

const mapStateToProps = ({userReducer, orderReducer}) => {
  return {
    userReducer,
    orderReducer
  }
};
const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
