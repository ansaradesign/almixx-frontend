'use client';

import {
  ContentState,
  Editor,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';
import { Toolbar } from './toolbar';

export const RichTextEditor = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  useEffect(() => {
    if (value) {
      try {
        const contentState = convertFromRaw(JSON.parse(value));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        const contentState = ContentState.createFromText(value);
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, []);

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const contentJSON = JSON.stringify(rawContentState);
    onChange(contentJSON);
  }, [editorState]);

  return (
    <>
      <Toolbar
        className='w-full flex gap-3'
        setEditorState={setEditorState}
        editorState={editorState}
      />
      <div className='w-full tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-12 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background py-3'>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder='Введите описание'
        />
      </div>
      <style>{`div.DraftEditor-root h1{
        font-size: 25px;
      }
      div.DraftEditor-root {
  min-height: 80px}`}</style>
    </>
  );
};
