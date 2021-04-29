import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      auth: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
    this.attemptTokenLogin = this.attemptTokenLogin.bind(this);
  }
  componentDidMount() {
    this.attemptTokenLogin();
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    this.signIn({
      email,
      password,
    });
  }
  async signIn(credentials) {
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    this.attemptTokenLogin();
  }
  logout() {
    window.localStorage.removeItem('token');
    this.setState({ auth: {} });
  }
  async attemptTokenLogin() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      this.setState({ auth: response.data });
    }
  }
  render() {
    const { onChange, onSubmit, logout } = this;
    const { email, password, auth } = this.state;
    if (!auth.id) {
      return (
        <form onSubmit={onSubmit}>
          <input value={email} onChange={onChange} name="email" />
          <input value={password} onChange={onChange} name="password" />
          <button>Sign In</button>
        </form>
      );
    } else {
      return (
        <div>
          Welcome {auth.username}
          <button onClick={logout}>Logout</button>
        </div>
      );
    }
  }
}

export default connect()(Login);

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       auth: {},
//     };
//     this.signIn = this.signIn.bind(this);
//     this.logout = this.logout.bind(this);
//   }

//   componentDidMount() {
//     this.attemptTokenLogin();
//   }
//   render() {
//     const { auth } = this.state;
//     const { signIn, logout } = this;
//     if (!auth.id) {
//       return <SignIn signIn={signIn} />;
//     } else {
//       return (
//         <div>
//           Welcome {auth.username}
//           <button onClick={logout}>Logout</button>
//         </div>
//       );
//     }
//   }
// }

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//   }
// }
