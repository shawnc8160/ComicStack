class Rollout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      totalPages: this.props.searchCount/50
    }
  }
  render () {
    return (
      <div id="rollout">
        <h1>Results: {this.props.searchCount}</h1>
        {this.props.results.map((result, index) => {
       return ( <div id="rolloutItem">
                  {(result.resource_type == 'volume') ?
                      <div>
                        <h4>Comic Volume: {result.name}</h4>
                        <img className="thumbnail" src={result.image.icon_url} />
                        <p>Publisher: {result.publisher.name}</p>
                        <p>Number of Issues: {result.count_of_issues}</p>
                      </div>
                : ''}
               {(result.resource_type == 'character') ?
                      <div>
                        <h4>Character: {result.name} ({result.publisher.name})</h4>
                        <p>Gender: {(result.gender == 1)? <span>Male</span> : '' }{(result.gender == 2)? <span>Female</span>
                        : '' }{(result.gender == 0)? <span>Other/Both</span>
                        : '' }</p>
                        <img src={result.image.icon_url} />
                        <p>Total issue appearances: {result.count_of_issue_appearances}</p>
                      </div>
                : ''}
                {(result.resource_type == 'issue') ?
                      <div>
                         <h4>Issue: {result.volume.name} # {result.issue_number}: {result.name}</h4>
                         <img src={result.image.icon_url} />
                      </div>
                 : ''}
                 <hr></hr>

             </div>)//result div return
           })}
           <div id="pageCount">
            Page: {this.state.page} of {this.state.totalPages}
           </div>
      </div>
    )
  }
}
