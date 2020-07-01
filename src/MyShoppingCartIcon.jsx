import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: '6px'
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Badge);

export default function MyShoppingCartIcon(props) {
  const classes = useStyles();

  const [cartBadgeContent] = useState(props.cart.length);

  return (
    <Box className={classes.root}>
      <Icon aria-label="cart">
        <StyledBadge badgeContent={cartBadgeContent} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </Icon>
    </Box>
  );
}