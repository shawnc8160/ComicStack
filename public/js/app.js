class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: null,
      searchCount: null,
      searchPage: 1
    }
    this.grabResults = this.grabResults.bind(this)
  }
  grabResults(data) {
    this.setState({
      searchResults: data.results,
      searchCount: data.number_of_total_results
    })
  }
  render () {
    return (
      <div className='section'>
        <h1> ComicStack </h1>
        <SearchForm grabResults={this.grabResults}/>
        {(this.state.searchResults == null)?
          '' :
          <Rollout results={this.state.searchResults} searchCount={this.state.searchCount}></Rollout>
      }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
