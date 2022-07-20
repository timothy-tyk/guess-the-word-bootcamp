import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      guessesLeft: 10,
      // Insert form input state here
      currGuess: "",
      correctGuesses: 0,
      win: false,
      gamesWon: 0,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
        // this.setState({correctGuesses:this.state.correctGuesses+1})
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (e) => {
    let guess = e.target.value[0];
    this.setState({ currGuess: guess });
    console.log("handlechange: ", this.state.currGuess);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit-start: ", this.state.currGuess);

    if (this.state.currGuess === "") {
      this.setState({ currGuess: "" });
    } else if (
      this.state.guessesLeft > 0 &&
      !this.state.guessedLetters.includes(this.state.currGuess)
    ) {
      this.setState({
        guessedLetters: [...this.state.guessedLetters, this.state.currGuess],
        guessesLeft: this.state.guessesLeft - 1,
        currGuess: "",
      });
      console.log("running CGC");
      this.correctGuessCount();
    } else if (
      this.state.guessesLeft > 0 &&
      this.state.guessedLetters.includes(this.state.currGuess)
    ) {
      this.setState({ currGuess: "" });
    }
    console.log("handlesubmit-end: ", this.state.currGuess);
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.guessedLetters !== prevState.guessedLetters) {
      console.log("componentdidupdate: ", this.state.currGuess);

      console.log("have we won yet? ", this.state.win);
      console.log("correct guesses ", this.state.correctGuesses);
      this.winCheck();
    }
  }

  correctGuessCount = () => {
    console.log("cgc func currword: ", this.state.currWord);
    console.log("cgc func currguess: ", this.state.currGuess);
    if (this.state.currWord.includes(this.state.currGuess)) {
      for (let i = 0; i < this.state.currWord.length; i++) {
        if (this.state.currWord[i] === this.state.currGuess) {
          console.log("checking letter");
          this.setState({ correctGuesses: this.state.correctGuesses + 1 });
          console.log("correctguesses:", this.state.correctGuesses);
          // this.winCheck();
        }
      }
    }
  };

  winCheck = () => {
    console.log(this.state.correctGuesses);
    console.log(this.state.currWord.length);
    console.log(this.state.correctGuesses === this.state.currWord.length);
    if (this.state.correctGuesses === this.state.currWord.length) {
      console.log("win check");
      this.setState({ win: true });
      this.setState({ gamesWon: this.state.gamesWon + 1 });
    }
  };
  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      guessesLeft: 10,
      currGuess: "",
      correctGuesses: 0,
      win: false,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}

          {this.state.win ? (
            <div>
              <h3>Congratulations. Hit reset to load the next word</h3>
              <input
                type="submit"
                onClick={this.resetGame}
                value="Reset Game"
              />
            </div>
          ) : (
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  value={this.state.currGuess}
                  placeholder="Guess a letter"
                  onChange={this.handleChange}
                />
                <input
                  type="submit"
                  disabled={this.state.guessesLeft === 0 || this.state.win}
                  value="Submit"
                />
              </form>

              {this.state.guessesLeft <= 0 ? (
                <h4>
                  The word is <i>{this.state.currWord}</i>, try again?{" "}
                  <input
                    type="submit"
                    onClick={this.resetGame}
                    value="Reset Game"
                  />
                </h4>
              ) : (
                <h4>Guesses Left : {this.state.guessesLeft} </h4>
              )}
            </div>
          )}
          <h5>Words Guessed Correctly : {this.state.gamesWon}</h5>
        </header>
      </div>
    );
  }
}

export default App;
