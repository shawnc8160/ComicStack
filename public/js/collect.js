class Collect extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="CollectDiv">
        {(this.props.isOwned == false)? <button id="collectBtn" class="button is-primary is-hovered" onClick={this.props.addCollection}>
          ADD TO COLLECTION
        </button> : <p>this issue is owned</p> }
      </div>
    )
  }
}
