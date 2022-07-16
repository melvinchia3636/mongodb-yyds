/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { Context } from '../App';

export default function ConfirmDelete({
  id,
  wantDelete,
  setWantDelete,
  setData,
  postList,
}) {
  const notify = useContext(Context);

  function deletePost() {
    fetch(`http://localhost:3636/article/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWantDelete(false);
          setTimeout(() => {
            setData(postList.filter((e) => e._id !== id));
            notify('Post deleted successfully');
          }, 300);
        }
      });
  }

  return (
    <div
      className={`fixed top-0 left-0 ${
        wantDelete ? 'z-[9999]' : 'z-[-1] transition-[z-index] delay-200'
      } w-full h-screen`}
    >
      <div
        className={`w-full h-full fixed top-0 left-0 ${
          wantDelete ? 'bg-black' : 'bg-transparent'
        } transition-all duration-500 bg-opacity-20`}
      />
      <div
        className={`p-4 bg-slate-100 shadow-2xl rounded-md absolute w-[32rem] top-1/2 left-1/2 -translate-x-1/2 ${
          wantDelete
            ? '-translate-y-1/2 opacity-1'
            : 'translate-y-full opacity-0'
        } transition-all duration-500 flex gap-4`}
      >
        <div className="w-12 h-12 flex-shrink-0 bg-rose-200 rounded-md flex items-center justify-center">
          <Icon icon="uil:trash" className="text-rose-400 w-6 h-6 mt-[1px]" />
        </div>
        <div className="-mt-1">
          <h1 className="text-xl font-medium">Are you sure?</h1>
          <p className="text-slate-400 mt-1">
            You are about to delete this article. This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end mt-8">
            <button
              type="button"
              onClick={() => {
                setWantDelete(false);
              }}
              className="btn bg-transparent hover:bg-slate-200 text-slate-500 border-none capitalize w-28 tracking-wider font-medium "
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                deletePost();
              }}
              className="btn bg-rose-200 text-rose-500 hover:bg-rose-300 border-none capitalize w-28 tracking-wider font-medium "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
