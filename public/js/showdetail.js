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
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">

              {
                (this.props.selection.resource_type=="issue")
                ? <div class="modal-card-title"><span class="icon is-small showdetail-header"><i class="fas fa-book"></i></span><span class="showdetail-header">Issue</span><h1 class="title"> {this.props.selection.name}</h1></div>
                : (this.props.selection.resource_type=="character")
                  ? <div class="modal-card-title"><span class="icon is-small showdetail-header"><i class="far fa-user"></i></span><span class="showdetail-header">Character</span><h1 class="title"> {this.props.selection.name}</h1></div>
                  : <div class="modal-card-title"><span class="icon is-small showdetail-header"><i class="fas fa-book-reader"></i></span><span class="showdetail-header">Volume</span><h1 class="title"> {this.props.selection.name}</h1></div>
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
