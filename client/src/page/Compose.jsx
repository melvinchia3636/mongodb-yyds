/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Icon } from '@iconify/react';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Context } from '../App';

function Compose() {
  const notify = useContext(Context);
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  function insertToquill(url) {
    // push image url to rich quill.
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', url);
  }

  function saveToServer(file) {
    const fd = new FormData();
    fd.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3636/upload/image', true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const url = JSON.parse(xhr.responseText).data;
        insertToquill(url);
      }
    };
    xhr.send(fd);
  }

  function selectLocalImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        console.warn('You could only upload images.');
      }
    };
  }

  function publish() {
    const data = {
      name: title,
      content: quill.root.innerHTML,
      time: new Date().toISOString(),
    };

    fetch('http://localhost:3636/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          localStorage.clear();
          notify('Post created successfully!');
          navigate('/');
        }
      });
  }

  useEffect(() => {
    setTitle(localStorage.getItem('autosave__title') || '');
    if (quill) {
      quill.getModule('toolbar').addHandler('image', () => {
        selectLocalImage();
      });
      quill.clipboard.dangerouslyPasteHTML(
        localStorage.getItem('autosave__content') || '',
      );
      quill.on('text-change', () => {
        localStorage.setItem('autosave__content', quill.root.innerHTML); // Get delta contents
      });
    }
  }, [quill]);

  return (
    <div className="w-full flex-1">
      <div className="flex items-center justify-between w-full h-min">
        <h1 className="text-3xl flex items-center gap-2">
          <Icon icon="uil:plus" className="w-8 h-8" />
          Create new post
        </h1>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="font-medium flex items-center justify-center w-32 hover:bg-slate-300 hover:bg-opacity-80 hover:shadow-md py-4 rounded-md transition-all"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={publish}
            className="bg-slate-800 text-slate-200 tracking-wider rounded-md font-medium py-4 shadow-md flex items-center justify-center gap-2 w-40"
          >
            Publish
            <Icon icon="uil:arrow-right" className="w-6 h-6" />
          </button>
        </div>
      </div>
      <label className="mt-8 mb-2 block ml-1 font-medium">Article Title</label>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          localStorage.setItem('autosave__title', e.target.value);
        }}
        type="text"
        placeholder="Enter your artitle title here"
        className="w-full px-6 py-4 rounded-md bg-slate-100 border-2 border-slate-300 tracking-wider focus:outline-none"
      />
      <label className="mt-6 mb-2 block ml-1 font-medium">
        Article Content
      </label>
      <div className="h-[28rem] w-full">
        <div ref={quillRef} />
      </div>
    </div>
  );
}

export default Compose;
