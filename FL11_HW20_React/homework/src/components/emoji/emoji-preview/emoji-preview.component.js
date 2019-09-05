import React from 'react';
import classes from './emoji-preview.module.scss';
import PropTypes from 'prop-types';

export function EmojiPreview(props) {
  return (
    <div className={classes.card}>
      <div className={classes.pack}>
        <div>{props.emoji1}</div>
        <div>{props.emoji2}</div>
        <div>{props.emoji3}</div>
      </div>
      <div>{props.title}</div>
      <div>{props.rate}</div>
      <div>{props.price}</div>
    </div>
  );
}

EmojiPreview.propTypes = {
  emoji1: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
};
