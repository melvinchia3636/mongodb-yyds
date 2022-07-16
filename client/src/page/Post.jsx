/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import ConfirmDelete from './ConfirmDelete';

export default function Post({
  data, index, setData, postList,
}) {
  const [wantDelete, setWantDelete] = useState(false);

  return (
    <motion.div
      layoutId={index}
      initial={{
        y: 0,
        x: 600,
        opacity: 0,
      }}
      animate={{
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          delay: 0.1 * index,
          duration: 0.3,
        },
      }}
      exit={{
        y: 0,
        x: 600,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      }}
      className="flex items-center rounded-md justify-between w-full h-min p-6 bg-slate-100 shadow-md"
    >
      <div className="flex-1">
        <span className="text-slate-400">{moment(data.time).format('MMM DD, YYYY')}</span>
        <h1 className="text-2xl">{data.name}</h1>
        <p className="text-slate-400 mt-2 abstract w-full">
          {(() => {
            const parser = new DOMParser();
            return parser.parseFromString(data.content, 'text/html').body
              .textContent;
          })()}
        </p>
        <Link
          to={`/article/${data._id}`}
          className="font-semibold mt-4 flex items-center gap-1"
        >
          Read article
          <Icon icon="uil:arrow-right" className="mt-[1px] w-6 h-6" />
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        <label
          tabIndex="0"
          className="btn bg-transparent border-none hover:bg-slate-200 m-1"
        >
          <Icon
            icon="uil:ellipsis-v"
            className="text-slate-400 w-5 h-5 mt-[1px]"
          />
        </label>
        <ul className="dropdown-content menu p-2 shadow-md bg-slate-100 rounded-box w-52 flex flex-col">
          <li>
            <Link
              to={`/edit/${data._id}`}
              className="btn bg-slate-100 border-none hover:bg-slate-800 hover:text-slate-100 justify-start"
            >
              <Icon icon="uil:pen" className="w-5 h-5 mt-[1px]" />
              Edit
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setWantDelete(true)}
              className="btn bg-slate-100 text-rose-500 hover:bg-rose-500 border-none hover:text-slate-100 justify-start"
            >
              <Icon icon="uil:trash" className="w-5 h-5 mt-[1px]" />
              Delete
            </button>
          </li>
        </ul>
      </div>
      <ConfirmDelete
        id={data._id}
        wantDelete={wantDelete}
        setWantDelete={setWantDelete}
        setData={setData}
        postList={postList}
      />
    </motion.div>
  );
}
