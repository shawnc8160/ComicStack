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
      displayList: true,
      favorites: [],
      collection: [],
      displayLogin: false,
      displayRegister: false,
    }
    this.setUser = this.setUser.bind(this)
    this.getCookieData = this.getCookieData.bind(this)
    this.grabResults = this.grabResults.bind(this)
    this.logOut = this.logOut.bind(this)
    this.toggleState = this.toggleState.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.setPage = this.setPage.bind(this)
    this.favoriteUpdate = this.favoriteUpdate.bind(this)
    this.getFavorites = this.getFavorites.bind(this)
    this.collectionUpdate = this.collectionUpdate.bind(this)
    this.setFavorites = this.setFavorites.bind(this)
    this.getCollection = this.getCollection.bind(this)
    this.setCollection = this.setCollection.bind(this)
  }
  /*=======================
  Things to check for when page first loads
  =======================*/
  componentDidMount () {
    // Check to see if user is logged in
    if (this.state.user == null) {
      // Check for cookie information if they aren't logged in
      this.getCookieData()
    } else {
      this.getFavorites(this.state.user.id)
      this.getCollection(this.state.user.id)
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
      console.log('Got cookie data, state is', this.state);
      this.getFavorites(userData['id']);
      this.getCollection(userData['id']);
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
    this.getFavorites(userdata['id']);
    this.getCollection(userdata['id']);
  }
  /*=======================
  grab the results from api calls and update app state
  =======================*/
  grabResults(data, query, filter, newSearch) {
    let numpages = Math.ceil(data.number_of_total_results/50)
    if(newSearch === true) {
      this.setState({
        searchResults: data.results,
        searchCount: data.number_of_total_results,
        pages: numpages,
        searchPage: 1,
        query: query,
        filter: filter
      })
    }
    else {
      this.setState({
        searchResults: data.results,
        searchCount: data.number_of_total_results,
        pages: numpages,
        query: query,
        filter: filter
      })
    }

  }
  /*=======================
  Logs the user out
  =======================*/
  logOut() {
    console.log('Logging Out');
    this.setState({
      user: null,
      favorites: null,
      collection: null
    });
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('id');
  }
  /*=======================
  set current page in search results
  =======================*/
  setPage (page) {
    console.log(page);
    this.setState({
      searchPage: page
    })
  }

  /*=======================
  Toggles any of the booleans in state
  =======================*/
  setSelection(selection) {
    this.setState({
      selection: selection
    });
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
  /*=======================
  Toggles any of the booleans in state
  =======================*/
  toggleState(...st) {
    console.log('Toggle State called');
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
  /*=======================
  Update user's favorite list
  =======================*/
  favoriteUpdate (character) {
    let tempFav = this.state.favorites;
    tempFav.push(character)
    this.setState({
      favorites: tempFav
    })
  }
  /*=======================
  Set users favorites
  =======================*/
  setFavorites(favorites) {
    if (favorites.results.length > 0) {
      this.setState({
        favorites: favorites.results
      })
    }
  }
  /*=======================
  Set users collection
  =======================*/
  setCollection(collection) {
    if (collection.results.length > 0) {
      this.setState({
        collection: collection.results
      })
    }
  }
  /*=======================
  Get users favorites
  =======================*/
  getFavorites(id) {
    console.log('Calling get favorites', id);
    fetch('/favorites/all/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('jsondata', JSONdata);
      this.setFavorites(JSONdata);
    }).catch(error => console.log(error))

  }
  /*=======================
  Get users collection
  =======================*/
  getCollection(id) {
    console.log('Calling get collection', id);
    fetch('/owns/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('jsondata', JSONdata);
      this.setCollection(JSONdata);
    }).catch(error => console.log(error))

  }
  /*=======================
  Update user's collection list
  =======================*/
  collectionUpdate (issue) {
    let tempIss = this.state.collection;
    tempIss.push(issue)
    this.setState({
      collection: tempIss
    })
  }
  render () {
    return (
      <div>

        <NavBar
          grabResults={this.grabResults}
          user={this.state.user}
          logOut={this.logOut}
          toggleState={this.toggleState}
        />
        <div class="container">
          {
            (this.state.displayLogin || this.state.displayRegister)
            ? <User setUser={this.setUser} displayLogin={this.state.displayLogin} displayRegister={this.state.displayRegister} toggleState={this.toggleState}/>
            : null
          }
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
                toggleState={this.toggleState}
                searchPage={this.state.searchPage}
                setPage={this.setPage}>
              </Rollout>
          }

          {
            (this.state.displayDetails)
            ? <ShowDetail
              toggleState={this.toggleState}
              selection={this.state.selection} favorites={this.state.favorites}
              favoriteUpdate={this.favoriteUpdate} user={this.state.user}
              collection={this.state.collection}
              collectionUpdate={this.collectionUpdate}
              />
            : null
          }
        </div>

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
