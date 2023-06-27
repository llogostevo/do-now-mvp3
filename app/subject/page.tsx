"use client"
import SubjectGenerator from "../components/subjectGenerator";
import { useState } from "react";
type Level = 'GCSE' | 'A level';
type Subject = 'Art' | 'Geography' | 'History' | 'Computer Science' | 'Drama' | 'Maths' | 'English' | 'Physics' | 'Biology' | 'Chemistry';
type ExamBoard = 'OCR' | 'Edexcel' | 'WJEC' | 'AQA';


export default function Subject() {
  const [level, setLevel] = useState<Level>('GCSE');
  const [subject, setSubject] = useState<Subject>('Art');
  const [examBoard, setExamBoard] = useState<ExamBoard>('OCR');

  return (
    <>
      <h1 className="text-center mt-4 mb-4 text-2xl sm:text-3xl">Do Now Generator</h1>
      <div className="flex justify-center">
        <form className="border-2 p-6 mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <fieldset className="border-2 p-4 ">
            <legend>Level</legend>
            <label className="flex items-center m-2 space-x-2">
              <input type="radio" value="GCSE" checked={level === 'GCSE'} onChange={() => setLevel('GCSE')} />
              <span>GCSE</span>
            </label>
            <label className="flex items-center m-2 space-x-2">
              <input type="radio" value="A level" checked={level === 'A level'} onChange={() => setLevel('A level')} />
              <span>A level</span>
            </label>
          </fieldset>

          <fieldset className="border-2 p-4 grid grid-cols-2 gap-4">
            <legend>Subject</legend>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Art" checked={subject === 'Art'} onChange={() => setSubject('Art')} />
              <span>Art</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Biology" checked={subject === 'Biology'} onChange={() => setSubject('Biology')} />
              <span>Biology</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Chemistry" checked={subject === 'Chemistry'} onChange={() => setSubject('Chemistry')} />
              <span>Chemistry</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Computer Science" checked={subject === 'Computer Science'} onChange={() => setSubject('Computer Science')} />
              <span>Computer Science</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Drama" checked={subject === 'Drama'} onChange={() => setSubject('Drama')} />
              <span>Drama</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="English" checked={subject === 'English'} onChange={() => setSubject('English')} />
              <span>English</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Geography" checked={subject === 'Geography'} onChange={() => setSubject('Geography')} />
              <span>Geography</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="History" checked={subject === 'History'} onChange={() => setSubject('History')} />
              <span>History</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Maths" checked={subject === 'Maths'} onChange={() => setSubject('Maths')} />
              <span>Maths</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Physics" checked={subject === 'Physics'} onChange={() => setSubject('Physics')} />
              <span>Physics</span>
            </label>
          </fieldset>


          <fieldset className="border-2 p-4 grid gap-4">
            <legend>Exam Board</legend>
            <label className="flex items-center space-x-2">
              <input type="radio" value="OCR" checked={examBoard === 'OCR'} onChange={() => setExamBoard('OCR')} />
              <span>OCR</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Edexcel" checked={examBoard === 'Edexcel'} onChange={() => setExamBoard('Edexcel')} />
              <span>Edexcel</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="WJEC" checked={examBoard === 'WJEC'} onChange={() => setExamBoard('WJEC')} />
              <span>WJEC</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="AQA" checked={examBoard === 'AQA'} onChange={() => setExamBoard('AQA')} />
              <span>AQA</span>
            </label>
          </fieldset>
        </form>
      </div>
      <SubjectGenerator subjectName={subject} level={level} specification={examBoard} />

    </>
  );
}