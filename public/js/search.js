class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.query = this.query.bind(this)
    this.getResults = this.getResults.bind(this)
  }
  query(event){
        event.preventDefault();
        console.log(this.refs.query.value);
        fetch('https://comicvine.gamespot.com/api/search/?api_key=4b0e3b0f6a9224f1f5a13f757d9514dc3f387840&format=json&sort=name:asc&query=sandman', {mode: 'no-cors'}).then((response)=>{
        response.json().then((data)=>{
            console.log(data);
        });
        });
    }
  getResults () {
    fetch('/queries/sandman')
      .then(response => response.json())
      .then(data => {
        this.setState({
          people: data
        })
      }).catch(error => console.log(error))
  }
  render(){
    return (<div>
    <form onSubmit={this.query}>
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
