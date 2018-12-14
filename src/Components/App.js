import React, { Component } from 'react';
import styles from './App.css';
import $ from 'jquery';
import 'foundation-sites';


// This is what it could look like with less rubbish colours and designs: https://whip-waiter.glitch.me
class App extends Component { 
  
  componentDidMount() {
    $(document).foundation();
  }
  
  render() {
    return (
      <div className="grid-x">
        <header className="cell">
        
          <section id="hero" className={styles['hero']}>
            <div className="grid-container">
              <div className="grid-x grid-padding-x align-center">
                <div className="small-12">
                  <h1>Card game</h1>
                </div>
              </div>
            </div>
          </section>

          <section id="deck">
            <div className="grid-container">
              <div className="grid-x grid-padding-x align-center">
                <div className="small-12">
                  <h2>This is the deck</h2>
                </div>
              </div>
            </div>
          </section>

        </header>
      
        <main className="cell">

          <section id="players">
            <div className="grid-container">
              <div className="grid-x grid-padding-x align-center">
                <div className="small-12">
                  <h2>These are the players</h2>
                  <div className="grid-x grid-padding-x">  

                      <div id="player"className="cell small-6">
                        <h3>Player 1</h3>
                      </div>

                      <div id="ai" className="cell small-6">
                        <h3>Player 2</h3>
                      </div>

                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    );
  }
}

export default App;
