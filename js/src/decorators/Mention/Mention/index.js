import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

let config = {
  mentionClassName: undefined,
  separator: undefined,
  trigger: undefined,
  suggestions: undefined,
};

function configDefined() {
  return config.suggestions && config.suggestions.length > 0;
}

function findMentionEntities(contentBlock, callback) {
  if (configDefined()) {
    let text = contentBlock.getText();
    let startIndex = 0;
    let counter = 0;

    for (;text.length > 0 && startIndex >= 0;) {
      if (text[0] === config.trigger) {
        startIndex = 0;
        counter = 0;
        text = text.substr(config.trigger.length);
      } else {
        startIndex = text.indexOf(config.separator + config.trigger);
        if (startIndex >= 0) {
          text = text.substr(startIndex + (config.separator + config.trigger).length);
          counter += startIndex + config.separator.length;
        }
      }
      if (startIndex >= 0) {
        const endIndex =
          text.indexOf(config.separator) >= 0 ? text.indexOf(config.separator) : text.length;
        const mentionText = text.substr(0, endIndex);
        const suggestionPresent =
          config.suggestions.some(suggestion => suggestion.value === mentionText);
        if (suggestionPresent) {
          callback(counter, counter + mentionText.length + config.trigger.length);
        }
        counter += config.trigger.length;
      }
    }
  }
}

const Mention = ({ children }) => <span className={classNames('rdw-mention', config.mentionClassName)}>{children}</span>;

Mention.propTypes = {
  children: PropTypes.array,
};

function setConfig(conf) {
  config = { ...config, ...conf };
}

module.exports = {
  mentionDecorator: {
    strategy: findMentionEntities,
    component: Mention,
  },
  setMentionConfig: setConfig,
};
