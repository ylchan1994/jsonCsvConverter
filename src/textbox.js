import React, { useRef, useState } from 'react';
import Button, { DownloadButton } from './button';

export default function Textbox({ placeholder, handleChangeEvent, value, downloadButtonState, downloadFile }) {
  const jsonFileRef = useRef(null);
  const [ file ] = useState('')

  function handleUploadFile(event) {
    event.preventDefault();
    jsonFileRef.current.click();
  }

  return (
    <>
    <div className="flex flex-col col-span-5">
      <input ref={jsonFileRef} 
        type="file" 
        name='jsonUpload' 
        className='h hidden'
        onChange={handleChangeEvent}
        value={file}></input>
      <Button description={'Open'} handleFunction={handleUploadFile}/>
      <textarea className='border border-black h-96 rounded-xl justify-self-start align-text-top p-2'
        placeholder={placeholder} onChange={handleChangeEvent} value={value}></textarea>
      <DownloadButton description={'Save'} 
        isDisabled={downloadButtonState} 
        downloadlink={downloadFile}/>
    </div>
    </>
  )
}