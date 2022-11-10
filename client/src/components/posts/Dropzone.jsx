import React, { useRef, useState } from 'react';

import Icon from '../ui/Icon';
import fileValidator from '../../utils/file-validator';

const Dropzone = (props) => {
  const [dataInappropriate, setDataInappropriate] = useState(null);
  const [activated, setActivated] = useState(false);
  const fileUpload = useRef();

  const fileUploadHandler = (e) => {
    e.preventDefault();
    fileUpload.current.click();
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
      dataRecievedHelper(recived);
    }
  };

  const loadFileHandler = (e) => {
    if (e.target.files.length === 0) return;
    const recived = fileValidator(e.target.files);
    dataRecievedHelper(recived);
  };

  const dataRecievedHelper = (data) => {
    if (data.message) return setDataInappropriate(data.message);
    setDataInappropriate(true);
    props.onSrc(data.imageSrc);
    props.onStatus(2);
  };

  return (
    <div className="h-full w-full inline-block px-6 flex-1">
      <div
        className={`transition-all h-full flex flex-col justify-center gap-2 border-2 border-dashed items-center rounded ${
          activated ? 'border-primary-main bg-black-100/20' : 'border-black-100'
        }`}
        onDragEnter={dragAndDropHandler}
        onDragOver={dragAndDropHandler}
        onDragLeave={dragAndDropHandler}
        onDrop={dragAndDropHandler}
      >
        <Icon name="images-sharp" style="text-[6rem]" />
        <p className="font-primary heading-h3 text-black-100 font-bold">
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
            className="px-4 py-2 bg-primary-main font-primary paragraph-medium font-semibold text-white-100 self-center rounded hover:cursor-pointer hover:bg-primary-tint-200"
            onClick={fileUploadHandler}
          >
            Select an Image
          </a>
        </div>
        <p
          className={`paragraph-small font-secondary font-bold inline-block mt-6 ${
            dataInappropriate ? 'text-error' : 'text-accent-dark-main'
          }`}
        >
          {dataInappropriate || 'Maximum upload image size: 2 MB'}
        </p>
      </div>
    </div>
  );
};

export default Dropzone;
