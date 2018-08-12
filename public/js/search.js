class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.getResults = this.getResults.bind(this)
  }
  getResults () {
    event.preventDefault();
    fetch('/queries/sandman')
      .then(response => response.json())
      .then(data => {
        this.props.grabResults(data)
      }).catch(error => console.log(error))
  }
  render(){
    return (<div>
    <form onSubmit={this.getResults}>
      <div id="searchDiv">
        <input
          ref="query" type="text" placeholder="Search for comic or character" />
        <input type="submit" value="Search" />
      </div>
      <div id="searchFilter">
        <input ref="comics" type="radio" name="type" value="comic"/>Issue(s)
        <input ref="volumes" type="radio" name="type" value="character"/> Comic Volume(s)
        <input ref="characters" type="radio" name="type" value="character"/> Characters
      </div>
    </form>
    </div>
    )
  }
}
