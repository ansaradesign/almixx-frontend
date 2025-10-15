import Image from 'next/image';
import { PiFileBold, PiTrashBold } from 'react-icons/pi';
import { Button } from '@nextui-org/button';
import { FileLoader } from '../../(inputs)/file-loader';
import { TFileLoader } from '../../(inputs)/file-loader/ui';

type Props = {} & TFileLoader;

export const FileLoaderList = ({
  fileList,
  setFileList,
  accept,
  multiple,
  buttonTitle,
}: Props) => {
  return (
    <div className='w-full flex flex-col gap-8'>
      <FileLoader
        fileList={fileList}
        setFileList={setFileList}
        accept={accept}
        multiple={multiple}
        buttonTitle={buttonTitle}
      />
      <div className='w-full flex flex-col gap-4'>
        {fileList.map((file, index) => {
          const fileType = file.type.split('/')[0];
          const isImage = fileType === 'image';

          const handleDeleteFile = () => {
            const fileListCopy = [...fileList];
            fileListCopy.splice(index, 1);
            setFileList(fileListCopy);
          };

          return (
            <div
              key={`${file.name}_${Math.random()}`}
              className='w-full flex gap-4 items-center'
            >
              <div className='w-[calc(100%-64px)] flex gap-4 items-center justify-start text-start flex-shrink'>
                <div className='w-16 h-16 rounded-xl bg-default overflow-clip relative flex items-center justify-center flex-shrink-0 shadow-base'>
                  {isImage ? (
                    <Image
                      alt={file.name}
                      unoptimized
                      src={URL.createObjectURL(file)}
                      fill
                      className='snap-start flex-shrink-0 object-cover h-full z-10'
                    />
                  ) : (
                    <PiFileBold size={30} className='opacity-50' />
                  )}
                </div>
                <p className='w-full font-medium opacity-50 flex-shrink break-words line-clamp-2'>
                  {file.name}
                </p>
              </div>
              <Button
                isIconOnly
                color='danger'
                variant='faded'
                className='flex-shrink-0'
                onPress={handleDeleteFile}
              >
                <PiTrashBold size={18} />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
