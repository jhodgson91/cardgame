import React, { Component } from 'react';
import { Grid, Paper, Typography, Button, List, ListItem } from '@material-ui/core'
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import './Main.scss'

import Deck from '../Objects/Deck'
import * as api from "../api"

const styles = ( theme : Theme) => createStyles({
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

  error: {
    padding: theme.spacing.unit * 2,
    fontSize: 20,
    color: theme.palette.error.main
  },

  subtitle: {
    fontSize: 15,
    color: theme.palette.secondary.main
  }
});

class DrawCardDemo extends React.Component<WithStyles<typeof styles>> {

  state = {
    isReady: false,
    deck: new Deck()
  }

  async componentDidMount() {
    let d = await api.getDeck()
    if (d) {
      await d.newPile('main')
      await d.drawIntoPile('p1', 26)
      await d.drawIntoPile('p2', 26)

      this.setState({
        isReady: true,
        deck: d
      })
    }
  }

  render() {
    let classes  = this.props.classes

    return (

      <Grid container justify="center" spacing={8} className={classes.root}>

        <Grid item xs={12}>
          <Paper className={classes.header}>
            <Typography className={classes.title}>
              Card Game: Using deck  {this.state.isReady && this.state.deck.id}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.section}>
            <Typography className={classes.title}>Main cards</Typography>
            <List>
              {this.cardViews('main')}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.section}>
            <Typography className={classes.title}>Player 1 Cards</Typography>
            <Button variant="contained" onClick={() => { this.playCard('p1') }}>Play card</Button>
            <List>
              {this.cardViews('p1')}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.section}>
            <Typography className={classes.title}>Player 2 Cards</Typography>
            <Button variant="contained" onClick={() => { this.playCard('p2') }}>Play card</Button>
            <List>
              {this.cardViews('p2')}
            </List>
          </Paper>
        </Grid>

      </Grid>

    );
  }

  async playCard(player: string) {
    if (this.state.isReady) {
      let card = await this.state.deck.piles[player].drawCardFrom('top')
      await this.state.deck.piles.main.add([card])
      this.forceUpdate()
    }
  }

  cardViews(pile: string) {
    var result = new Array<any>()
    if (this.state.isReady) {
      this.state.deck.piles[pile].cards.forEach(card => {
        result.push(<ListItem key={card.code}>{card.value} of {card.suit}</ListItem>)
      })
    }
    return result
  }
}

export default withStyles(styles)(DrawCardDemo);