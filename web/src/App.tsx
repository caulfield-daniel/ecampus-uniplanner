import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import { type Lesson } from '@/shared/kmp';

function App() {
  const [count, setCount] = useState(0);

  const lesson: Lesson = {
    id: 1,
    group: '1',
    date: '2023-01-01',
    weekday: 'Вс',
    discipline: 'Физика',
    type: 'Лекция',
    timeStart: '10:00',
    timeEnd: '11:00',
    teacher: 'Леонид Чернышов',
    room: '101',
    subgroup: '1',
  };

  return (
    <>
      <div>
        <a
          href="https://react.dev"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
