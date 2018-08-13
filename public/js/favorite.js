class Favorite extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="favoriteDiv">
        <button onClick={this.props.addCollection}>
          ADD TO FAVORITES
        </button>
      </div>
    )
  }
}
