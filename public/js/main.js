class Main extends React.Component {
  render() {
    return(
      <div class="main-wrapper">

        <div id="cf">
          <h1 class="maintitle">---cOMIC STACK---</h1>
          <MainSearchForm grabResults={this.props.grabResults} parseResults={this.props.parseResults}
          toggleState={this.props.toggleState}
          displayList={this.props.displayList}/>
          <img class="bottom" src="https://i.imgur.com/xIgbTsc.jpg" />
          <img class="top" src="https://i.imgur.com/S1VRqU4.jpg" />
        </div>

      </div>
    )
  }
}
