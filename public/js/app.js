class App extends React.Component {
  render () {
    return (
      <header>
        <h1 className='title'> Labor Department 2.0 </h1>
        <form>
          <h2> Sign Up</h2>
          <input type="text" placeholder="username"/>
          <input type="text" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <input type="submit"/>
        </form>
        <form>
          <h2>Login</h2>
          <input type="text" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <input type="submit"/>
        </form>
      </header>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
