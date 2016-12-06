import { mentionDecorator, setMentionConfig } from './Mention';
import { suggestionDecorator, setSuggestionConfig } from './Suggestion';

let config = {
  separator: ' ',
  trigger: '@',
  suggestions: undefined,
  onChange: undefined,
  getEditorState: undefined,
  getWrapperRef: undefined,
  mentionClassName: undefined,
  dropdownClassName: undefined,
  optionClassName: undefined,
};

function setConfig(conf) {
  config = { ...config, ...conf };
  setMentionConfig({
    separator: config.separator,
    trigger: config.trigger,
    suggestions: config.suggestions,
    mentionClassName: config.mentionClassName,
  });
  setSuggestionConfig({
    separator: config.separator,
    trigger: config.trigger,
    suggestions: config.suggestions,
    onChange: config.onChange,
    getEditorState: config.getEditorState,
    getWrapperRef: config.getWrapperRef,
    dropdownClassName: config.dropdownClassName,
    optionClassName: config.optionClassName,
  });
}

export default {
  decorators: [mentionDecorator, suggestionDecorator],
  setConfig,
};
