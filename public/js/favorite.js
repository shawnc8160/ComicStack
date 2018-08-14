class Favorite extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="favoriteDiv">
        <button class="button is-primary is-hovered" onClick={this.props.addCollection}>
          ADD TO FAVORITES
        </button>
      </div>
    )
  }
}
