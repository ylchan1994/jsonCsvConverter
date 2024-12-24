import React, { useEffect, useState } from 'react';
import Textbox from './textbox';
import Button from './button';
import { createDownloadFile, csv2json, json2csv, validateJson } from './shared'; 

export default function App() {
  const [ json, setJson ] = useState("");
  const [ csv, setCsv ] = useState('');
  const [ isJsonDownloadDisabled, setIsJsonDownloadDisabled ] = useState(true);
  const [ isCsvDownloadDisabled, setIsCsvDownloadDisabled ] = useState(true);
  const [ url, setUrl ]  = useState('');

  const handleJson2Csv = (event) => {
    event.preventDefault();
    const jsonObject = validateJson(json);
  
    if(!json || json === '' || typeof jsonObject !== 'object') {
      window.alert(jsonObject);
      return;
    };  
    
    setCsv(json2csv(jsonObject));
    setIsCsvDownloadDisabled(false);
  }

  const handleCsv2Json = (event) => {
    event.preventDefault();
  
    if(!csv || csv === '' ) {
      window.alert('Empty CSV input');
      return;
    };  
    
    setJson(JSON.stringify(csv2json(csv), null, 2));
    setIsJsonDownloadDisabled(false);
  }

  function handleClear(event) {
    event.preventDefault();
    setJson('');
    setCsv('');
    setIsJsonDownloadDisabled(true);
    setIsCsvDownloadDisabled(true);
  }

  function handleJsonChange(event) {
    let value = undefined;

    if (event.target.files) {

      const reader = new FileReader();
      reader.onload = function(event) {
        setJson(event.target.result);
        return;
      };
      reader.readAsText(event.target.files[0]);

    } else {
        value  = event.target.value;
    }
    
    setJson(value);
  }

  function handleCsvChange(event) {
    let value = undefined;

    if (event.target.files) {

      const reader = new FileReader();
      reader.onload = function(event) {
        setCsv(event.target.result);
        return;
      };
      reader.readAsText(event.target.files[0]);

    } else {
        value  = event.target.value;
    }
    
    setCsv(value);
  }

  useEffect(() => {
    setUrl(createDownloadFile('csv', csv));
  }, [isCsvDownloadDisabled])

  useEffect(() => {
    setUrl(createDownloadFile('json', json));
  }, [isJsonDownloadDisabled])

  return (
    <>
    <h1 className='text-3xl font-semibold mt-5 text-center mb-5'>JSON and CSV converter</h1>
    <div className='grid grid-cols-12 mx-5 gap-2'>
      <Textbox placeholder={`JSON`} /* JSON input and download field */
        handleChangeEvent={handleJsonChange} 
        value={json} 
        downloadButtonState={isJsonDownloadDisabled}
        downloadFile={url}/>
      <div className='justify-items-center col-span-2 flex flex-col h-96 justify-center w-1/2 justify-self-center'>
        <Button description={`Convert->`} handleFunction={handleJson2Csv}/>
        <Button description={`Convert<-`} handleFunction={handleCsv2Json}/>
        <Button description={'Clear'} handleFunction={handleClear}/>
      </div>
      <Textbox placeholder={'CSV'} /* CSV input and download field */
        value={csv} 
        handleChangeEvent={handleCsvChange}
        downloadButtonState={isCsvDownloadDisabled}
        downloadFile={url}/>
    </div>
    </>
  );
};