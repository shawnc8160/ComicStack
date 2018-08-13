class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.getResults = this.getResults.bind(this)
  }
  getResults () {
    event.preventDefault();
    let query = this.refs.query.value
    let filter = this.refs.filter.value
    fetch('/queries/' + query + '/' + filter + '/1')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.grabResults(data, query, filter)
      }).catch(error => console.log(error))
  }
  render(){
    return (<div id="searchFormDiv">
    <form onSubmit={this.getResults}>
      <div id="searchBar" className="field has-addons">
        <span class="select">
          <select ref="filter">
            <option value="any" selected>All</option>
            <option value="issue">Issues</option>
            <option value="volume">Comic Volumes</option>
            <option value="character">Characters</option>
          </select>
        </span>
        <input className="input"
          ref="query" type="text" placeholder="Search for comic or character" />
        <input className="button" type="submit" value="Search" />
      </div>
    </form>
    </div>
    )
  }
}
