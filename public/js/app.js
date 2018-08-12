class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: null
    }
    this.grabResults = this.grabResults.bind(this)
  }

  grabResults(data) {
    this.setState({
      searchResults: data
    })
  }

  render () {
    return (
      <div className='section'>
        <h1> ComicStack </h1>
        <SearchForm grabResults={this.grabResults}/>
        {(this.state.searchResults == null)?
          '' :
          <Rollout results={this.state.searchResults}></Rollout>
      }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
