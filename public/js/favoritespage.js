class FavoritesPage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1> Favorites </h1>

      {this.props.favorites.map((favorite, index) => {
        return (
          <h1> {favorite.name} </h1>
        )
      })}
      </div>
    )
  }
}
