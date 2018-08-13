class ShowDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="show-container">
        <button onClick={() => {this.props.toggleState('displayDetails', 'displayList'); console.log('Clicked');}}>Back To Results</button>
        <h1> Details Page </h1>
      </div>
    )
  }
}
