class Collections extends React.Component {
  constructor(props) {
    super(props)
    this.getIssue = this.getIssue.bind(this);
    this.showIssue = this.showIssue.bind(this);
  }
  getIssue(issue) {
    console.log('getIssue starting', issue);
    fetch('/queries/pull/issues/'+issue.issue_id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('Retrieved issue details: ', JSONdata);
      this.showIssue(JSONdata)
    }).catch(error => console.log(error))
  }
  showIssue(data) {
    console.log('Data in showIssue', data);
    if (data.results && data.results.length > 0) {
      data.results[0]['resource_type'] = 'issue'
      this.props.setSelection(data.results[0]);
      this.props.toggleState('displayDetails');
    }
  }
  render() {
    return (
      <div>

        <h1 class="title">My Favorites</h1>
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Publisher</th>
            <th>Remove</th>
          </thead>
          <tbody>
            {this.props.issues.map((issue, index) => {
              return (
                <tr>
                  <td className="image-column"> <img onClick={()=>this.getIssue(issue)} className="image is-96x96" src={issue.icon_url}/> </td>
                  <td>
                    <span className="name_list" onClick={()=>this.getIssue(issue)}>
                      {(issue.volume_name && issue.volume_name.trim().length > 0) ? issue.volume_name : "Unnamed"}
                    </span>
                  </td>
                  <td className="collections_description_column">
                    <span className="deck_list">
                      {(issue.description && issue.description.trim().length > 0) ? <div dangerouslySetInnerHTML={{ __html: issue.description }} /> : "No description available"}
                    </span>
                  </td>
                  <td>{(issue.publisher && issue.publisher.trim().length > 0) ? issue.publisher : "No publisher available"}</td>
                  <td><i onClick={() => this.props.deleteFavorite(issue, index)} class="fas fa-trash"></i></td>
                </tr>
              )
            })}
        </tbody>
        </table>
      </div>
    )
  }
}
