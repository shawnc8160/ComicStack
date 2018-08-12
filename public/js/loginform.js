class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getUser = this.getUser.bind(this);
  }
  /*=======================
  This method handles the login
  =======================*/
  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }
  /*=======================
  Handles submit action from login form
  =======================*/
  handleSubmit(event) {
    event.preventDefault();
    // Format the login information
    let login = {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    }
    // Try to login
    this.handleLogin(login);
  }
  /*=======================
  Handles the login
  Need to perform the following for login:
  1. Send the login information to backend
  2. Get a token back
  3. Use the token to make another call in the backend to get user info
  4. Set that user info in state/cookie
  =======================*/
  handleLogin(login) {
    console.log('login information is: ', JSON.stringify(login));
    fetch('/user_token', {
      body: JSON.stringify(login),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(myToken => {
        return myToken.json()
      })
      .then(myTokenJson => {
        console.log('Got token back', myTokenJson);
        this.getUser(myTokenJson)
      })
      .catch(error => console.log(error))
  }
  /*=======================
  Gets the user information
  =======================*/
  getUser(token) {
    let tokenString = 'Bearer ' + token['jwt']
    console.log('Authorization is:', tokenString);
    // Need to put token in header, the auth route returns user information
    fetch('/auth', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenString
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('Retrieved user info: ', JSONdata);
      this.props.setUser(JSONdata, tokenString)
    }).catch(error => console.log(error))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" placeholder="email" onChange={this.handleChange} value={this.state.email} id='email'/>
        <input type="password" placeholder="password" onChange={this.handleChange} value={this.state.password} id='password'/>
        <input type="submit"/>
      </form>
    )
  }
}
