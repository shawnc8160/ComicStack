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
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">

              {
                (this.props.selection.resource_type=="issue")
                ? <div class="modal-card-title"><span class="icon is-small showdetail-header-issues"><i class="fas fa-book"></i></span><span class="showdetail-header-issues">Issue</span><h1 class="title"> {this.props.selection.name}</h1></div>
                : (this.props.selection.resource_type=="character")
                  ? <div class="modal-card-title"><span class="icon is-small showdetail-header-characters"><i class="far fa-user"></i></span><span class="showdetail-header-characters">Character</span><h1 class="title"> {this.props.selection.name}</h1></div>
                  : <div class="modal-card-title"><span class="icon is-small showdetail-header-volumesr"><i class="fas fa-book-reader"></i></span><span class="showdetail-header-volumes">Volume</span><h1 class="title"> {this.props.selection.name}</h1></div>
              }

            <button class="delete" aria-label="close" onClick={() => this.props.toggleState('displayDetails')}></button>
          </header>
          <section class="modal-card-body">
            <img class="showdetail-img" src={this.props.selection.image.medium_url} />
            <div class="show-detail-info">
              {
                (this.props.selection.resource_type=="issue")
                ? <div class="show-detail-section"><h2 class="show-detail-label">Cover Date</h2><span>{this.props.selection.cover_date}</span></div>
                : (this.props.selection.resource_type=="character")
                  ? <div class="show-detail-section"><h2 class="show-detail-label">Real Name</h2><span>{this.props.selection.real_name}</span></div>
                  : <div class="show-detail-section"><h2 class="show-detail-label">Start Year</h2><span>{this.props.selection.start_year}</span></div>
              }
              <div class="show-detail-section">
                <h2 class="show-detail-label">Description:</h2>
                <div dangerouslySetInnerHTML={{ __html: this.props.selection.description }} />
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <Favorite addCollection={this.addCollection}></Favorite>
          </footer>
        </div>
      </div>
    )
  }
}
