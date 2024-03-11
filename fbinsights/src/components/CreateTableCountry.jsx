// src/components/Table.js
import React from 'react';
import { extractDateFromISOString } from "../utility.js";

export function CreateTableCountry({content, title}) {
    if (content == null || content.length == 0) return <> </>
    
    const arr = []


    const renderTableHeader = () => {
        const header = Object.keys(content[0].value);
        return (
            <>
            
            <tr>
          <th colSpan={`${header.length+1}`} className="py-2 px-4 border-b"> <b>Demographic Data</b> </th>
            
            </tr>
            <tr>
                <th className="py-2 px-4 border-b">End Time</th>
                    {header.map((region) => (
                    <th className="py-2 px-4 border-b" key={region}>{region}</th>
                ))}
            </tr>
            </>
        );
      };
    
      const renderTableRows = () => {
        return content.map((entry) => (
          <tr key={entry.end_time}>
            <td className="py-2 px-4 border-b">{extractDateFromISOString(entry.end_time)}</td>
            {Object.values(entry.value).map((value, index) => (
              <td className="py-2 px-4 border-b" key={index}>{value}</td>
            ))}
          </tr>
        ));
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
