import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

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

export default withStyles(styles)(App);
