class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: null,
      searchCount: null,
      pages: null,
      searchPage: 1,
      query: null,
      filter: null,
      user: null,
      selection: null,
      displayDetails: false,
      displayList: true
    }
    this.setUser = this.setUser.bind(this)
    this.getCookieData = this.getCookieData.bind(this)
    this.grabResults = this.grabResults.bind(this)
    this.toggleState = this.toggleState.bind(this)
    this.setSelection = this.setSelection.bind(this)
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
  grabResults(data, query, filter) {
    let pages = Math.ceil(data.number_of_total_results/50)
    this.setState({
      searchResults: data.results,
      searchCount: data.number_of_total_results,
      pages: pages,
      query: query,
      filter: filter
    })
  }
  /*=======================
  Toggles any of the booleans in state
  =======================*/
  toggleState(...st) {
    let toUpdate = {}
    for (let key of st) {
      toUpdate[key] = !this.state[key]
    }
    this.setState(toUpdate)
  }
  /*=======================
  Toggles any of the booleans in state
  =======================*/
  setSelection(selection) {
    this.setState({
      selection: selection
    });
  }
  render () {
    return (
      <div className='section'>
        <h1> ComicStack </h1>

        {
          (this.state.user == null)
          ? <User setUser={this.setUser}/>
          : <div>Logged in as {this.state.user.username}</div>
        }

        <SearchForm grabResults={this.grabResults}/>
        {
          (this.state.searchResults == null || this.state.displayList==false)
          ? ''
          : <Rollout
              results={this.state.searchResults}
              searchCount={this.state.searchCount}
              pages={this.state.pages}
              grabResults={this.grabResults}
              query={this.state.query}
              filter={this.state.filter}
              setSelection={this.setSelection}
              toggleState={this.toggleState}>
            </Rollout>
        }

        {
          (this.state.displayDetails)
          ? <ShowDetail
            toggleState={this.toggleState}
            selection={this.state.selection}
            />
          : null
        }

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
