import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function Article() {
  const { id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {
    fetch(`http://localhost:3636/article/${id}`)
      .then((res) => res.json())
      .then((json) => setContent(json));
  }, []);

  return (
    <div className="flex flex-col">
      {content && (
        <>
          <h1 className="text-4xl mb-6">{content.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </>
      )}
    </div>
  );
}

export default Article;
