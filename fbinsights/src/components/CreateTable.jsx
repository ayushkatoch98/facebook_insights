// src/components/Table.js
import React from 'react';
import { extractDateFromISOString } from "../utility.js";

export function CreateTable({content, title}) {
    if (content == null || content.length == 0) return <> </>
  return (
    <>
    <table className="min-w-full border  border-gray-500  text-center">
        
      <thead>
        <tr className="text-center">
          <th colSpan="2" className="py-2 px-4 border-b">{title}</th>
        </tr>
        <tr>
          <th className="py-2 px-4 border-b">Value</th>
          <th className="py-2 px-4 border-b">Date</th>
        </tr>
      </thead>
      <tbody>
        {content.map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">{item.value + " "}</td>
            <td className="py-2 px-4 border-b">{extractDateFromISOString(item.end_time)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
