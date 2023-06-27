/*
Further actions: 
- buttons can be pulled into their own components
- will need to pass in props 
*/

"use client"
import useLLM, { OpenAIMessage } from "usellm";
import { useState } from "react";

type SubjectGeneratorProps = {
  subjectName: string;
  level: string;
  specification: string;
};

export default function SubjectGenerator({ subjectName, level, specification }: SubjectGeneratorProps) {
  const llm = useLLM();
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [answer, setAnswers] = useState("");
  
  const [reset, setShowReset] = useState(false);
  const [isResultReturned, setIsResultReturned] = useState(false);
  const [isAnswerReturned, setIsAnswerReturned] = useState(false);

  const [history, setHistory] = useState<OpenAIMessage[]>([{
    role: "system",
    content: `You're a teacher planner bot. Given a Subject, Level, Exam Board, Topic. 
    Check the Subject, Exam Board and Level to see if the topic provided matches one of the specification points. 
    If it does, then provide 3 suitable questions that have come from a past examination series for that exam board. Do not pick questions that had images. 
    Do not make up questions
    Do not get questions from other exam boards unless they are on the same topic. 
    Pick a question that is less than 7 marks
    If the topic provided does not appear to relate then please say "This topic is not one that appears to relate to this subject or specification, please try again"
    Provide the output in the following format for each question
    
    Question 1. 
    Question: <the question>
    
    Question 2. 
    Question: <the question>
    
    Question 3 
    Question: <the question>`,
  },
  {
    role: "user",
    content: `<Subject: ${subjectName}>, <Level: ${level}>, <Exam Board: ${specification}>, <Topic: ${topic}>`
  }]);

  async function handleClick() {
    if (!topic) {
      return;
    }

    console.log(history)
    // update the history so it includes the topic 
    const newHistory = [...history, { role: "user", content: topic }];
    setHistory(newHistory);
    setTopic("");
    console.log(history)

    try {
      await llm.chat({
        messages: newHistory,
        stream: true,
        onStream: ({ message }) => {
          setHistory([...newHistory, message]),
          setResult(message.content);
          setIsResultReturned(true);
          setShowReset(true);
        }
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }

  // ANSWER BUTTON IS CLICKED AND AN ANSWER RETURNED
  async function handleAnswer() {
    const newHistory = [...history, { role: "user", content: `send me the the answer for each question. Make each answer concise and at the level identified previously.` }];
    setHistory(newHistory);
    try {
      await llm.chat({
        messages: newHistory,
        stream: true,
        onStream: ({ message }) => {
          setAnswers(message.content);
          setIsAnswerReturned(true);
          setShowReset(true);

        }
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }


  async function handleReset() {
    setHistory(
      [{
        role: "system",
        content: `You're a teacher planner bot. Given a Subject, Level, Exam Board, Topic. 
          Check the Subject, Exam Board and Level to see if the topic provided matches one of the specification points. 
          If it does, then provide 3 suitable questions that have come from a past examination series for that exam board. Do not pick questions that had images. 
          Do not make up questions
          Do not get questions from other exam boards unless they are on the same topic. 
          Pick a question that is less than 7 marks
          If the topic provided does not appear to relate then please say "This topic is not one that appears to relate to this subject or specification, please try again"
          Provide the output in the following format for each question
          
          Question 1. 
          Question: <the question>
          
          Question 2. 
          Question: <the question>
          
          Question 3 
          Question: <the question>`,
      },
      {
        role: "user",
        content: `<Subject: ${subjectName}>, <Level: ${level}>, <Exam Board: ${specification}>, <Topic: ${topic}>`
      }]
    );
    setIsResultReturned(false);
    setIsAnswerReturned(false);
    setShowReset(false);
  }

  return (
    <div className="min-h-screen mx-auto my-8 max-w-4xl px-4 sm:px-0">
      <ul className="m-5">
        <li className="p-1"><span className="font-bold">Subject</span>: {subjectName}</li>
        <li className="p-1"><span className="font-bold">Level</span>: {level}</li>
        <li className="p-1"><span className="font-bold">Specification</span>: {specification}</li>
      </ul>
      {/* show reset button if result or answer has been returned */}
    {reset && (
        <button
          className="rounded border border-yellow-700 text-yellow-400 hover:bg-yellow-500 hover:text-black p-2 m-4 transition-colors duration-200"
          onClick={handleReset}
        >
          Start Over
        </button>
      )}
      <div className="flex flex-col space-y-2">
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a Topic"
          className=" h-28 p-4 text-lg text-black rounded border overflow-auto"
        />
        {/* only show submit button if no result returned */}
        {!isResultReturned && (
          <button
            className="rounded border border-green-700 text-green-400 hover:bg-green-500 hover:text-black p-2 mt-4 transition-colors duration-200"
            onClick={handleClick}
          >
            Submit
          </button>
        )}
      </div>
      {/* show result if returned */}
      {isResultReturned && (
        <div className="mt-4 whitespace-pre-wrap border p-4">{result}</div>
      )}
      {/* show answer if returned */}
      {isAnswerReturned && (
        <div className="mt-4 whitespace-pre-wrap border p-4">{answer}</div>
      )}
      {/* show answer button if returned */}
      {isResultReturned && (
        <button
        className="rounded border border-green-700 text-green-400 hover:bg-green-500 hover:text-black p-2 m-4 transition-colors duration-200"
        onClick={handleAnswer}
        >
          Click me for answers!
        </button>
      )}

{/* show reset button if result or answer has been returned */}
    {reset && (
        <button
          className="rounded border border-yellow-700 text-yellow-400 hover:bg-yellow-500 hover:text-black p-2 m-4 transition-colors duration-200"
          onClick={handleReset}
        >
          Start Over
        </button>
      )}
    </div>

  );
}
