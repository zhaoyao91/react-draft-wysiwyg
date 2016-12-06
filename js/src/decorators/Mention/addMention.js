import {
  EditorState,
  Modifier,
} from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';

export default function addMention(
  editorState: EditorState,
  onChange: Function,
  separator: string,
  trigger: string,
  suggestion: Object,
): void {
  const { value } = suggestion;
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  const mentionIndex = (selectedBlockText.lastIndexOf(separator + trigger) || 0) + 1;

  // insert mention
  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex,
    focusOffset: selectedBlockText.length,
  });
  let newEditorState = EditorState.acceptSelection(editorState, updatedSelection);
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    `${trigger}${value}`,
    newEditorState.getCurrentInlineStyle(),
  );
  newEditorState = EditorState.push(newEditorState, contentState, 'insert-characters');

  // insert a blank space after mention
  updatedSelection = newEditorState.getSelection().merge({
    anchorOffset: mentionIndex + value.length + trigger.length,
    focusOffset: mentionIndex + value.length + trigger.length,
  });
  newEditorState = EditorState.acceptSelection(newEditorState, updatedSelection);
  contentState = Modifier.insertText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    ' ',
    newEditorState.getCurrentInlineStyle(),
    undefined
  );
  onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
}
