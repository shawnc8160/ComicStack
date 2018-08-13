class NavBar extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div class="navbar-start">
            <a class="navbar-item" href="/">
              <h1> ComicStack </h1>
            </a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item ">
              <SearchForm grabResults={this.props.grabResults}/>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                {(this.props.user != null) ? this.props.user.username : "Not Logged In"}
                <span class="icon is-large">
                  <i class="fas fa-lg fa-user-circle">
                </i></span>
              </a>
                {
                  (this.props.user != null)
                  ? <div class="navbar-dropdown">
                      <a class="navbar-item">Edit Profile</a>
                      <a class="navbar-item" onClick={()=> this.props.logOut()}>Logout</a>
                    </div>
                  : <div class="navbar-dropdown">
                      <a class="navbar-item" onClick={()=> this.props.toggleState('displayLogin')}>Login</a>
                      <a class="navbar-item">Sign Up</a>
                    </div>
                }
          </div>
        </div>
      </nav>
    )
  }
}
