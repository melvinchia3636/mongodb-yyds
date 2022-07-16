/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import Post from './Post';

function Index() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3636/list')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="w-full flex flex-col gap-16">
      <div className="flex items-center justify-between w-full h-min">
        <div>
          <h1 className="text-4xl">My Personal Blog</h1>
          <p className="text-slate-400 mt-2">Fuck my life forever</p>
        </div>
        <Link
          to="/compose"
          className="bg-slate-800 text-slate-200 font-medium tracking-wider rounded-md pr-7 px-6 py-4 shadow-md flex items-center gap-2"
        >
          <Icon
            icon="uil:plus"
            className="stroke-1 stroke-slate-200 mt-[1px]"
          />
          Compose
        </Link>
      </div>
      {data !== null ? (
        data.length > 0 ? (
          <AnimateSharedLayout>
            <div layout className="flex flex-col gap-4">
              <AnimatePresence>
                {data.map((item, index) => (
                  <Post
                    data={item}
                    key={item._id}
                    index={index}
                    setData={setData}
                    postList={data}
                  />
                ))}
              </AnimatePresence>
            </div>
          </AnimateSharedLayout>
        ) : (
          <p className="text-center font-medium text-slate-400">
            Nothing here ;-;
          </p>
        )
      ) : (
        <p className="text-center font-medium text-slate-400">Loading...</p>
      )}
    </div>
  );
}

export default Index;
