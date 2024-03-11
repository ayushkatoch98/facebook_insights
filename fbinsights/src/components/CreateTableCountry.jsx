// src/components/Table.js
import React from 'react';
import { extractDateFromISOString } from "../utility.js";

function processData(data){

  const finalData = {}

  // get list of all the countries 

  for(const key in data[data.length - 1].value){
      finalData[key] = []
  }
  
  for(let i = data.length - 1; i >= 0; i--){

    const record = data[i];
    let lastEndTime = "";
    for(const key in finalData){
      
      if (key in record.value) {
        finalData[key].push({end_time: record.end_time, val: record.value[key]});
        lastEndTime = record.end_time
      }
      else{
        finalData[key].push({end_time: lastEndTime, val: 0});
      }

    }


  }

  return finalData;

}

export function CreateTableCountry({content, title}) {
    if (content == null || content.length == 0) return <> </>
    
    const processedData = processData(content);

  console.log("prcessedData", processedData);
    const renderTableHeader = () => {
        const header = Object.keys(processedData);
        return (
            <>
            
            <tr>
          <th colSpan={`${header.length+1}`} className="py-2 px-4 border-b"> <b>Demographic Data</b> </th>
            
            </tr>
            <tr>
                <th className="py-2 px-4 border-b">End Time</th>
                    {header.map((key) => (
                    <th className="py-2 px-4 border-b" key={key}>{key}</th>
                ))}
            </tr>
            </>
        );
      };
    
      const renderTableRows = () => {
        const allKeys = Object.keys(processedData);
        let output = [];
      
        for (let i = 0; i < processedData[allKeys[0]].length; i++) {
          // output.push(<tr key={i}>);
          let runOnce = true;
          let temp = []
          for (const key of allKeys) {
            if (runOnce)
            {
              const d = extractDateFromISOString(processedData[key][i].end_time);    
              temp.push(<td key={key + i + "1"} className="py-2 px-4 border-b">{extractDateFromISOString(processedData[key][i].end_time)}</td>);
              runOnce = false;
            }
            temp.push(<td key={key + i + "2"} className="py-2 px-4 border-b">{processedData[key][i].val}</td>);
          }

          output.push(<tr className="py-2 px-4 border-b">{temp}</tr>)
      
      {/* output.push(</tr>); */}
        }
      
        return output;
      };
    
    
    return (
        <>
        <table className="min-w-full border border-gray-500 text-center">
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
        </>
    );
}
