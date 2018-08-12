class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: null,
      user: null
    }
    this.sendResults = this.sendResults.bind(this)
    this.setUser = this.setUser.bind(this)
    this.getCookieData = this.getCookieData.bind(this)
  }
  /*=======================
  Things to check for when page first loads
  =======================*/
  componentDidMount () {
    // Check to see if user is logged in
    if (this.state.user == null) {
      // Check for cookie information if they aren't logged in
      this.getCookieData()
    }
  }
  /*=======================
  Gets user data from cookies
  =======================*/
  getCookieData() {
    console.log('Checking for cookies');
    if(Cookies.get('token') && Cookies.get('id') && Cookies.get('username')) {
      console.log('token exists');
      // Format user data
      let userData = {
        username: Cookies.get('username'),
        id: Cookies.get('id'),
        token: Cookies.get('token')
      }
      // load user data into state
      this.setState({
        user: userData
      })
    } else {
      console.log('token does not exist');
    }
  }
  sendResults(data) {
    this.state.searchResults
  }
  /*=======================
  Sets user data in state and cookies after log in
  =======================*/
  setUser(userdata, token) {
    userdata['token'] = token;
    console.log('data for user is: ', userdata);
    // Sets userdata into cookie
    Cookies.set('token', token);
    Cookies.set('username', userdata['username']);
    Cookies.set('id', userdata['id']);
    console.log('Cookie is set', Cookies.get('token'));
    this.setState({
      user: userdata
    });
  }
  render () {
    return (
      <div className='section'>
        <h1> ComicStack </h1>
        {(this.state.user == null) ? <LoginForm setUser={this.setUser}/> : <div>Logged in as {this.state.user.username}</div>}
        <SearchForm sendResults={this.sendResults}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
