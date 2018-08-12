class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: null
    }
    this.sendResults = this.sendResults.bind(this)
  }
  sendResults(data) {
    this.state.searchResults
  }

  render () {
    return (
      <div className='section'>
        <h1> ComicStack </h1>
        <SearchForm sendResults={this.sendResults}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
