import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

function Post({ data }) {
  return (
    <div className="flex items-center rounded-md justify-between w-full h-min p-6 bg-slate-100 shadow-md">
      <div>
        <h1 className="text-2xl">{data.name}</h1>
        <p className="text-slate-400">{data.content}</p>
        <a className="font-semibold mt-4 flex items-center gap-1">
          Read article
          <Icon icon="uil:arrow-right" className="mt-[1px] w-6 h-6" />
        </a>
      </div>
      <div className="dropdown dropdown-end">
        <label
          tabindex="0"
          className="btn bg-transparent border-none hover:bg-slate-200 m-1"
        >
          <Icon
            icon="uil:ellipsis-v"
            className="text-slate-400 w-5 h-5 mt-[1px]"
          />
        </label>
        <ul
          tabindex="0"
          className="dropdown-content menu p-2 shadow-md bg-slate-100 rounded-box w-52 flex flex-col"
        >
          <li>
            <a className="btn bg-slate-100 border-none hover:bg-slate-800 hover:text-slate-100 justify-start">
              <Icon icon="uil:pen" className="w-5 h-5 mt-[1px]" />
              Edit
            </a>
          </li>
          <li>
            <a className="btn bg-slate-100 text-rose-500 hover:bg-rose-500 border-none hover:text-slate-100 justify-start">
              <Icon icon="uil:trash" className="w-5 h-5 mt-[1px]" />
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3636/list")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="w-full bg-slate-200 text-slate-800 flex flex-col gap-16 p-32 font-['Manrope'] tracking-wider">
      <div className="flex items-center justify-between w-full h-min">
        <div>
          <h1 className="text-4xl">My Personal Blog</h1>
          <p className="text-slate-400 mt-2">Fuck my life forever</p>
        </div>
        <button className="bg-slate-800 text-slate-200 tracking-wider rounded-md pr-7 px-6 py-4 shadow-md flex items-center gap-2">
          <Icon
            icon="uil:plus"
            className="stroke-1 stroke-slate-200 mt-[1px]"
          />
          Compose
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <Post data={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
