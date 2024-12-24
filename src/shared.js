export function validateJson( json ) {
  try {
    const jsonObject = JSON.parse(json);

    if (!Object.values(jsonObject).every( e => typeof e !== 'object')) {
      throw new Error('Nested JSON');
    }
  }
  catch(err) {
    return err.message;
  }

  return JSON.parse(json);
}

export function json2csv(jsonObject) {
  let output = ''
  output += Object.keys(jsonObject).join(',');
  output += '\n';
  output += Object.values(jsonObject).join(',');
  return output;
}

export function csv2json(csv) {
  const csvArray = csv.split('\n');
  let output = {};
  csvArray[0].split(',').forEach((header, index) => {
    output = {...output, [header]: csvArray[1].split(',')[index]};
  })
  return output;
}

export function createDownloadFile (type, data) {
  const fileType = type === 'json' ? 'application/json' : 'text/csv'
  const fileData = new Blob([data], { type: fileType });

  const url = URL.createObjectURL(fileData);
  console.log(url)
  return url;
}