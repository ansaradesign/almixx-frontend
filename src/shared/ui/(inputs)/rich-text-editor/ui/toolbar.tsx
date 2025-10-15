import { Button } from '@nextui-org/react';
import { RichUtils } from 'draft-js';
import {
  PiListBulletsBold,
  PiListNumbersBold,
  PiTextItalicBold,
} from 'react-icons/pi';
import { MdTitle } from 'react-icons/md';

export const Toolbar = ({
  setEditorState,
  editorState,
  className,
}: {
  setEditorState: (state: any) => void;
  editorState: any;
  className?: string;
}) => {
  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };
  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  const handleUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };
  const handleOlClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
  };
  const handleUlClick = () => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, 'unordered-list-item'),
    );
  };
  const handleHeaderClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
  };
  return (
    <div className={className}>
      <Button
        onPress={handleBoldClick}
        color={
          editorState.getCurrentInlineStyle().has('BOLD')
            ? 'primary'
            : 'default'
        }
        isIconOnly
      >
        <b>B</b>
      </Button>
      <Button
        onPress={handleItalicClick}
        isIconOnly
        color={
          editorState.getCurrentInlineStyle().has('ITALIC')
            ? 'primary'
            : 'default'
        }
      >
        <PiTextItalicBold />
      </Button>
      <Button
        onPress={handleUnderlineClick}
        isIconOnly
        color={
          editorState.getCurrentInlineStyle().has('UNDERLINE')
            ? 'primary'
            : 'default'
        }
      >
        <u>U</u>
      </Button>
      <Button onPress={handleHeaderClick} isIconOnly>
        <MdTitle />
      </Button>
      <Button onPress={handleOlClick} isIconOnly>
        <PiListNumbersBold />
      </Button>
      <Button onPress={handleUlClick} isIconOnly>
        <PiListBulletsBold />
      </Button>
    </div>
  );
};
