import React from 'react';

const Loading = () => {
  return (
    <div className="relative block h-20 w-20">
      <div className="delay45 absolute m-2 box-border block h-16 w-16 animate-loader rounded-[50%] border-8 border-white-100 border-t-white-100 border-l-transparent border-r-transparent border-b-transparent"></div>
      <div className="delay30 absolute m-2 box-border block h-16 w-16 animate-loader rounded-[50%] border-8 border-white-100 border-t-white-100 border-l-transparent border-r-transparent border-b-transparent"></div>
      <div className="delay15 absolute m-2 box-border block h-16 w-16 animate-loader rounded-[50%] border-8 border-white-100 border-t-white-100 border-l-transparent border-r-transparent border-b-transparent"></div>
      <div className="absolute m-2 box-border block h-16 w-16 animate-loader rounded-[50%] border-8 border-white-100 border-t-white-100 border-l-transparent border-r-transparent border-b-transparent"></div>
    </div>
  );
};

export default Loading;
