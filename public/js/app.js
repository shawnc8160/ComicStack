class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: null,
      user: null
    }
    this.sendResults = this.sendResults.bind(this)
    this.setUser = this.setUser.bind(this)
  }
  sendResults(data) {
    this.state.searchResults
  }
  setUser(userdata, token) {
    userdata['tokenString'] = token
    console.log('data for user is: ', userdata);
    this.setState({
      user: userdata
    })
  }
  render () {
    return (
      <div className='section'>
        <h1> ComicStack </h1>
        <SignUpForm/>
        <LoginForm setUser={this.setUser}/>
        <SearchForm sendResults={this.sendResults}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
