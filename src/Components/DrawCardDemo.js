import React, { Component } from 'react';
import { Grid, Paper, Typography, Button, List, ListItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { getDeck } from "../api"

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee'
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
    color: theme.palette.secondary.main
  },

  // Text
  title: {
    fontSize: 20,
    color: theme.palette.primary.main
  },

  error:{
    padding: theme.spacing.unit * 2,
    fontSize: 20,
    color: theme.palette.error.main
  },

  subtitle: {
    fontSize: 15,
    color: theme.palette.secondary.main
  }
});

class DrawCardDemo extends Component {

  state = {
    isReady: false,
    deck: null,
    p1Cards: [],
    p2Cards: []
  }

  componentDidMount = () => {

    getDeck({ shuffled: true }).then(
      deck => {
        this.setState({
          isReady: true,
          deck: deck
        })
      }
    )
  }

  render() {
    const { classes } = this.props

    return (

      <Grid container justify="center" spacing={8} className={classes.root}>

        <Grid item xs={12}>
          <Paper className={classes.header}>
            <Typography className={classes.title}>
              Card Game: Using deck  {this.state.isReady && this.state.deck.id }
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.section}>
            <Button variant="contained" onClick={() => {this.onAddCardClicked(1)}}>Draw Card to P1</Button>
            <Button variant="contained" onClick={() => {this.onAddCardClicked(2)}}>Draw Card to P2</Button>
            {this.state.isReady && this.state.deck.remaining === 0 && <Typography className={classes.error}>No more cards!</Typography>}
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.section}>
            <Typography className={classes.title}>Player 1 Cards</Typography>
            <List>
              {this.p1CardViews}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.section}>
            <Typography className={classes.title}>Player 2 Cards</Typography>
            <List>
              {this.p2CardViews}
            </List>
          </Paper>
        </Grid>

      </Grid>

    );
  }

  get p1CardViews() {
    var result = []
    this.state.p1Cards.forEach(card => {
      result.push(<ListItem key={card.code}>{card.value} of {card.suit}</ListItem>)
    })
    return result
  }

  get p2CardViews() {
    var result = []
    this.state.p2Cards.forEach(card => {
      result.push(<ListItem key={card.code}>{card.value} of {card.suit}</ListItem>)
    })
    return result
  }
  
  onAddCardClicked(player)
  {
    if(this.state.isReady && this.state.deck.remaining > 0)
    {
      this.state.deck.drawCards(1).then(
        cards => {
          switch (player) {
            case 1:
              this.setState({
                p1Cards: [...this.state.p1Cards, ...cards]
              })
              break;
            case 2:
              this.setState({
                p2Cards: [...this.state.p2Cards, ...cards]
              })
              break;
            default:
              break;
          }
        }
      )
    }
  }
}

export default withStyles(styles)(DrawCardDemo);