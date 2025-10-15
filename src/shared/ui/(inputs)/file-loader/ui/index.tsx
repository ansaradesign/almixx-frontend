import { Button } from '@nextui-org/button';
import { ChangeEventHandler, useRef } from 'react';
import { PiPlusBold } from 'react-icons/pi';

export type TFileLoader = {
  fileList: File[];
  setFileList: (fileList: File[]) => void;
  accept?: string;
  multiple?: boolean;
  buttonTitle?: string;
};

export const FileLoader = ({
  fileList,
  setFileList,
  accept,
  multiple = false,
  buttonTitle = 'Добавить',
}: TFileLoader) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;

    if (files) {
      const newFilesArray = Object.values(files);
      setFileList([...fileList, ...newFilesArray]);
    }
  };

  return (
    <>
      <Button
        size='lg'
        className='font-medium w-full'
        onPress={handleOpenInput}
      >
        <PiPlusBold size={18} />
        {buttonTitle}
      </Button>

      <input
        type='file'
        accept={accept}
        className='hidden'
        onChange={handleInputChange}
        ref={fileInputRef}
        multiple={multiple}
      />
    </>
  );
};
