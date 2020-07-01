import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(3),
  }
}));

export default function BikePage(props) {
  const classes = useStyles();

  function handleAddToCart() {
    props.onClose();
    props.onAddToCart(props.bikeInfo);
  }

  const rows = [
    {spec: "Dicipline", details: props.bikeInfo.dicipline},
    {spec: "Brand", details: props.bikeInfo.brand},
    {spec: "Gender", details: props.bikeInfo.gender},
    {spec: "Color", details: props.bikeInfo.color},
    {spec: "Wheel Size", details: props.bikeInfo.wheelSize},
    {spec: "Material", details: props.bikeInfo.material},
    {spec: "Electric", details: props.bikeInfo.electric ? "Yes" : "No"}
  ];

  return (
    <Container component="main">
      <div className={classes.page}>
        <img 
          src={`data:image/jpeg;base64,${props.bikeInfo.image}`} 
          alt="bike-img"
          width="90%" 
          height="40%"
          />
        <Typography variant="h5" gutterBottom className={classes.title}>
          {props.bikeInfo.name}
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.price}>
          {"$" + props.bikeInfo.price}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {props.bikeInfo.description}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Specification</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.spec}>
                  <TableCell component="th" scope="row">{row.spec}</TableCell>
                  <TableCell align="right">{row.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>        
        <Button variant="contained" onClick={handleAddToCart} color="secondary" className={classes.button}>
          ADD TO CART
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}