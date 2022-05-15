import React from "react"
import "./App.css"

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      quotes : [],
      generatedQuote : {},
      bgColor : ""
    }
    this.loadQuotes = this.loadQuotes.bind(this)
    this.generateBgColor = this.generateBgColor.bind(this)
    this.generateQuote = this.generateQuote.bind(this)
  }

  loadQuotes = async function(){
    const URL = "http://localhost:8000"
    await fetch(URL)
    .catch(err => console.log(`Can't fetch data : ${err}`))
    .then( res => res.json() )
    .then( res => { 
      this.setState({
        quotes : res
      })
      return res
    }).then( () => {
      this.generateQuote()
    })

  }

  generateQuote(){
    this.setState( prevState => {
      const quotes = prevState.quotes
      const randomQuote = quotes[Math.floor( Math.random()*quotes.length-1 )]
      const bgColor = this.generateBgColor()
      return {
        quotes : quotes,
        generatedQuote : {
          text : randomQuote.quote,
          author : randomQuote.author,
          linkTweet : `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(`"${randomQuote.quote}"${randomQuote.author}`)}`
        },
        bgColor : bgColor
      }
    })
    console.log(this.state.generatedQuote)
  }

  generateBgColor(){
    const colors = [
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'
    ];
    return colors[ Math.floor( Math.random()*colors.length-1 ) ]
  }


  componentDidMount(){
    this.loadQuotes()
  }
  
  render(){
    return (
      <div id="wrapper">
        <div id="quote-box" className="d-flex flex-column">
          <span id="text">{this.state.generatedQuote.text}</span>
          <span id="author" className="align-self-end">{this.state.generatedQuote.author}</span>
          <div className="d-flex flex-row">
            <a href={this.state.generatedQuote.linkTweet} id="tweet-quote">Tweet this quote</a>
            <button id="new-quote" onClick={this.generateQuote}>New Quote</button>				
          </div>
        </div>
      </div>
    )
  }

}

export default App