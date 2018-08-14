class ShowDetail extends React.Component {
  constructor(props) {
    super(props);
    this.addCollection = this.addCollection.bind(this)
    this.characterSubmit = this.characterSubmit.bind(this)
    this.favoriteSubmit = this.favoriteSubmit.bind(this)
  }
  /*=======================
  submit favorite linking table to characters in the database
  =======================*/
  favoriteSubmit (newFave) {
    fetch('/favorites', {
      body: JSON.stringify(newFave),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdFave => {
        return createdFave.json()
      })
      .then(jsonedFave => {
        console.log('favorite entry completed');
      })
      .catch(error => console.log(error))
  }
  /*=======================
  submit hero object to be added to database(returns exiting object back if already in database)
  =======================*/
  characterSubmit (character) {
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
        return createdHero.json()
      })
      .then(jsonedChar => {
        this.props.favoriteUpdate(jsonedChar)
        let newFave = {
          user_id: this.props.user.id,
          character_id: jsonedChar.id
        }
        this.favoriteSubmit(newFave)
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
      // parse the selection's deck for single quotes
      if (this.props.selection.deck != null) {
        let thisDeck = this.props.selection.deck
        let cleanString = thisDeck.replace(/'/g,'');
        let character = {
          id: this.props.selection.id,
          name: this.props.selection.name,
          deck: cleanString,
          publisher: this.props.selection.publisher.name,
          gender: this.props.selection.gender,
          icon_url: this.props.selection.image.icon_url,
          real_name: this.props.selection.real_name,
          resource_type: this.props.selection.resource_type
        }
        this.characterSubmit(character)
      }
      else {
        let character = {
          id: this.props.selection.id,
          name: this.props.selection.name,
          publisher: this.props.selection.publisher.name,
          gender: this.props.selection.gender,
          icon_url: this.props.selection.image.icon_url,
          real_name: this.props.selection.real_name,
          resource_type: this.props.selection.resource_type
        }
        this.characterSubmit(character)
      }
    }//if character
  }//end of addCollection method
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
