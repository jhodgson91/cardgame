import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import 'foundation-sites';
//import { Grid, Paper, Typography } from '@material-ui/core'
//import { withStyles } from '@material-ui/core/styles'

// This is what it could look like with less rubbish colours and designs: https://whip-waiter.glitch.me

class Game extends Component {
  
  
  componentDidMount() {
    $(document).foundation();
  }
  
  render() {
    return(
      <div className="grid-x">
        <header className="cell">

          <section id="hero" className="hero">
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
                  <div className="card"></div>
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
                  <div className="grid-x grid-padding-x text-center"> 

                      <div id="player" className="cell small-6">
                        <h3>Player 1</h3>
                        <div className="card"></div>
                        <p>Remaining:</p>
                      </div>

                      <div id="ai" className="cell small-6">
                        <h3>Player 2</h3>
                        <div className="card"></div>
                        <p>Remaining:</p>
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

export default Game;
/*

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    height: 800
  },
  header: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },

  section: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.secondary.main,
    height: 300
  },

  // Text
  title: {
    fontSize: 20,
    color: theme.palette.primary.main
  },
  subtitle: {
    fontSize: 15,
    color: theme.palette.secondary.main
  }
});

class App extends Component { 

  render() {
    const { classes } = this.props

    return (

          <Grid container justify="center" alignItems='flex-start' spacing={8} className={classes.root}>

            <Grid item xs={12}>
              <Paper className={classes.header}>
                <Typography className={classes.title}>Card Game</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} >
              <Paper className={classes.section}>
                <Typography className={classes.subtitle}>This would contain the main view</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={6}>
              <Paper className={classes.section}>
                <Typography className={classes.subtitle}>This would contain player 1 content</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={6}>
              <Paper className={classes.section}>
                <Typography className={classes.subtitle}>This would contain player 2 content</Typography>
              </Paper>
            </Grid>

          </Grid>

    );
  }
}

export default withStyles(styles)(App);*/
