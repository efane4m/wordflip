import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function Module() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/cards/${id}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Карты модуля {id}</h1>
        {data.map((d, i) => (
          <div key={i}>
            <h3>{d.word_original} - {d.word_translation}</h3>
          </div>
        ))
      }
    </div>
  );
}

export default Module;