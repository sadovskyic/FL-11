import React from 'react';
import classes from './emoji.module.scss';
import { EmojiPreview } from './emoji-preview';
import { API } from '../../constants/api.constants.js';

export class Emoji extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emoji: []
    };
  }

  componentDidMount() {
    fetch(`${API}/emoji-shop`)
      .then(response => response.json())
      .then(responseEmoji => this.setState({ emoji: responseEmoji.emoji }));
  }

  render() {
    if (!this.state.emoji.length) {
      return (
        <div className={classes.lds_ring}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
    console.log(this.state.emoji);
    return (
      <>
        <div className={classes.packs}>
          {this.state.emoji.map(emoji => {
            return (
              <EmojiPreview
                key={
                  emoji.emoji[0].codes +
                  emoji.emoji[1].codes +
                  emoji.emoji[2].codes
                }
                emoji1={emoji.emoji[0].char}
                emoji2={emoji.emoji[1].char}
                emoji3={emoji.emoji[2].char}
                title={emoji.title}
                rate={emoji.stars}
                price={emoji.price}
              />
            );
          })}
        </div>
      </>
    );
  }
}
