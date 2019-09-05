import React from 'react';
import classes from './emoji-preview.module.scss';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

function rate(n) {
  let stars = [];
  for (let i = 1; i <= n; i++) {
    stars.push(
      React.createElement(StarIcon, {
        className: classes.star,
        fontSize: 'small'
      })
    );
  }
  if ((n ^ 0) !== n) {
    stars.push(
      React.createElement(StarHalfIcon, {
        className: classes.star,
        fontSize: 'small'
      })
    );
  }
  return stars;
}

export function EmojiPreview(props) {
  return (
    <div className={classes.card}>
      <div className={classes.pack}>
        <div>{props.emoji1}</div>
        <div>{props.emoji2}</div>
        <div>{props.emoji3}</div>
      </div>
      <div className={classes.title}>{props.title}</div>
      <div>
        {rate(props.rate)}
      </div>
      <button className={classes.buy}>Get ({props.price}$)</button>
    </div>
  );
}

EmojiPreview.propTypes = {
  emoji1: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
};
