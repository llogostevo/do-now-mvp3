"use client"
import React, { useState, useEffect } from 'react';


const names = ['Hassan', 'Taz', 'Ahmed'];
const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const units = ['P', 'D', 'F', 'P', 'P'];
const classes = ['12a', '12b', '12c', '13a', '13b', '13c'];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const students = Array.from({ length: 34 }).map(() => ({
  Name: `${getRandomElement(names)} ${getRandomElement(surnames)}`,
  Class: getRandomElement(classes),
  'Unit 1': getRandomElement(units),
  'Unit 2': getRandomElement(units),
}));

// Mock data
const initialData = students

const getColorFromValue = (value:string):string => {
  switch(value.toUpperCase()) {
    case 'F': return 'bg-red-400';
    case 'P': return 'bg-orange-400';
    case 'M': return 'bg-yellow-400';
    case 'D': return 'bg-green-400';
    default: return 'bg-white';
  }
}

export default function Table() {
  const [data, setData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, rowIdx: number, cellIdx:number) => {
    // e.preventDefault();
    const newData = [...data];
    newData[rowIdx][cellIdx] = e.target.value;

    setData(newData);
  };

  return (
    <div className="container mx-auto px-4 text-slate-700 ">
      <table className="table-auto border-collapse w-full">
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td 
                  key={cellIdx}
                  className={`border  border-gray-200 p-2 ${getColorFromValue(cell)}`}
                >
                  <input 
                    className="bg-transparent w-full text-center"
                    value={cell} 
                    onChange={(e) => handleChange(e, rowIdx, cellIdx)} 
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

