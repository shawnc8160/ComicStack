class Main extends React.Component {
  render() {
    return(
      <div class="main-wrapper">

        <div id="cf">
          <h1 class="maintitle">---cS OMIC STACK---</h1>
          <MainSearchForm grabResults={this.props.grabResults} parseResults={this.props.parseResults}
          toggleState={this.props.toggleState}
          displayList={this.props.displayList}/>

        </div>

      </div>
    )
  }
}
