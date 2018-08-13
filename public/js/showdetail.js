class ShowDetail extends React.Component {
  constructor(props) {
    super(props);
    this.addCollection = this.addCollection.bind(this)
    this.favoriteSubmit = this.favoriteSubmit.bind(this)
  }
  /*=======================
  submit hero object to be added to database(returns exiting object back if already in database)
  =======================*/
  favoriteSubmit (character) {
    //send hero object to heroes database
    fetch('/characters', {
      body: JSON.stringify(character),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdHero => {
        createdHero = createdHero.json()
      })
      .then(jsonedChar => {
        this.props.favoriteUpdate(jsonedChar)
        //call the linkfavorite
      })
      .catch(error => console.log(error))
  }
  /*=======================
  Add to collection
    -- checks for character/volume
    -- adds to the appropriate collection
  =======================*/
  addCollection() {
    if (this.props.selection.resource_type === 'character') {
      let character = {
        id: this.props.selection.id,
        name: this.props.selection.name,
        deck: this.props.selection.deck,
        publisher: this.props.selection.publisher.name,
        gender: this.props.selection.gender,
        icon_url: this.props.selection.image.icon_url,
        real_name: this.props.selection.real_name,
        resource_type: this.props.selection.resource_type
      }
      this.favoriteSubmit(character)
    }
  }
  render() {
    return (
      <div class="show-container">
        <button onClick={() => {this.props.toggleState('displayDetails', 'displayList');}}>Back To Results</button>
        <Favorite addCollection={this.addCollection}></Favorite>
        <h1>
          {
            (this.props.selection.resource_type=="issue")
            ? "Issue: " + this.props.selection.volume.name + " " + this.props.selection.issue_number
            : (this.props.selection.resource_type=="character")
              ? "Character: " + this.props.selection.name
              : "Volume: " + this.props.selection.name
          }
        </h1>

        <img src={this.props.selection.image.medium_url} />
        <h2>
          {
            (this.props.selection.resource_type=="issue")
            ? "Cover Date: " + this.props.selection.cover_date
            : (this.props.selection.resource_type=="character")
              ? "Real Name: " + this.props.selection.real_name
              : "Start Year: " + this.props.selection.start_year
          }
        </h2>
        <h2>Description:</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.selection.description }} />
      </div>
    )
  }
}
