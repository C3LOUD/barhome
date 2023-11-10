import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from '../ui/Icon';
import fileValidator from '../../utils/file-validator';

export default function Dropzone({ onSrc, onStatus }) {
  const [dataInappropriate, setDataInappropriate] = useState(null);
  const [activated, setActivated] = useState(false);
  const fileUpload = useRef();

  const fileUploadHandler = (e) => {
    e.preventDefault();
    fileUpload.current.click();
  };

  const dataReceivedHelper = (data) => {
    if (data.message) setDataInappropriate(data.message);
    else {
      setDataInappropriate(true);
      onSrc(data.imageSrc);
      onStatus(2);
    }
  };

  const dragAndDropHandler = (e) => {
    e.preventDefault();
    if (e.type === 'dragover' || e.type === 'dragenter') {
      setActivated(true);
    }
    if (e.type === 'dragleave') {
      setActivated(false);
    }
    if (e.type === 'drop') {
      setActivated(false);
      const recived = fileValidator(e.dataTransfer.files);
      dataReceivedHelper(recived);
    }
  };

  const loadFileHandler = (e) => {
    if (e.target.files.length === 0) return;
    const recived = fileValidator(e.target.files);
    dataReceivedHelper(recived);
  };

  return (
    <div className="inline-block h-full w-full flex-1 px-6">
      <div
        className={twMerge(
          'flex h-full flex-col items-center justify-center gap-2 rounded border-2 border-dashed transition-all',
          activated
            ? 'border-primary-main bg-black-100/20'
            : 'border-black-100',
        )}
        onDragEnter={dragAndDropHandler}
        onDragOver={dragAndDropHandler}
        onDragLeave={dragAndDropHandler}
        onDrop={dragAndDropHandler}
      >
        <Icon name="images-sharp" style="text-[6rem] text-black-100" />
        <p className="heading-h3 font-primary font-bold text-black-100">
          Drop an Image Here
        </p>
        <div>
          <input
            type="file"
            id="image-upload"
            name="image-upload"
            className="hidden"
            ref={fileUpload}
            onChange={loadFileHandler}
          />
          <a
            className="paragraph-medium self-center rounded bg-primary-main px-4 py-2 font-primary font-semibold text-white-100 hover:cursor-pointer hover:bg-primary-tint-200"
            onClick={fileUploadHandler}
          >
            Select an Image
          </a>
        </div>
        <p
          className={twMerge(
            'paragraph-small mt-6 inline-block font-secondary font-bold',
            dataInappropriate ? 'text-error' : 'text-accent-dark-main',
          )}
        >
          {dataInappropriate || 'Maximum upload image size: 2 MB'}
        </p>
      </div>
    </div>
  );
}
