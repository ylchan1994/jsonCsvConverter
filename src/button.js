import React from 'react';

export default function Button({ description, handleFunction }) {
  return (
    <>
    <button className='place-self-center text-center border border-neutral-800 rounded-lg py-1 px-5 m-3 min-w-32 disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-100'
      onClick={handleFunction}>
    {description}</button>
    </>
  )
}

export function DownloadButton({ description, isDisabled, downloadlink }) {
  return (
    <>
    {isDisabled ? 
    '' :
    (<a className='place-self-center text-center border border-neutral-800 rounded-lg py-1 px-5 m-3 min-w-32 disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-100'
      href={downloadlink}
      download={true}>
    {description}</a>) }
    </>
  )
}