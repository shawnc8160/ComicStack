class Rollout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      tab: 1
    }
  }
  render () {
    return (
      <div>
        <h1>Results</h1>
        <p>{this.props.results.results[0].aliases}</p>

      </div>
    )
  }
}
