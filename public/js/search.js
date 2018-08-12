class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.getResults = this.getResults.bind(this)
  }
  getResults () {
    event.preventDefault();
    console.log();
    fetch('/queries/' + this.refs.query.value + '/' + this.refs.filter.value)
      .then(response => response.json())
      .then(data => {
        this.props.grabResults(data)
      }).catch(error => console.log(error))
  }
  render(){
    return (<div>
    <form onSubmit={this.getResults}>
      <div id="searchDiv">
        <select ref="filter">
          <option value="any" selected>All</option>
          <option value="issue">Issues</option>
          <option value="volume">Comic Volumes</option>
          <option value="character">Characters</option>
        </select>
        <input
          ref="query" type="text" placeholder="Search for comic or character" />
        <input type="submit" value="Search" />
      </div>
    </form>
    </div>
    )
  }
}
