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
        {this.props.results.map((result, index) => {
       return ( <div>
                  {(result.resource_type == 'volume') ?
                      <div>
                        <h4>Comic Volume: {result.name}</h4>
                        <img src={result.image.icon_url} />
                        <p>Publisher: {result.publisher.name}</p>
                        <p>Number of Issues: {result.count_of_issues}</p>
                      </div>
                : ''}
               {(result.resource_type == 'character') ?
                      <div>
                        <h4>Character: {result.name}</h4>
                        <img src={result.image.icon_url} />
                      </div>
                : ''}
                {(result.resource_type == 'issue') ?
                      <div>
                         <h4>Issue: {result.volume.name} # {result.issue_number}: {result.name}</h4>
                         <img src={result.image.icon_url} />
                      </div>
                 : ''}
             </div>)//result div return
           })}

      </div>
    )
  }
}
