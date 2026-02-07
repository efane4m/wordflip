import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import styles from './Module.module.css'

function Module() {
  const { id } = useParams();
  const navigate = useNavigate();
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
          <form className={styles.wordForm} key={i}>
            <legend>Карточка слова</legend>
            <label>Оригинал:</label>
            <input type="text" value={d.word_original} readOnly />
            <label>Перевод:</label>
            <input type="text" value={d.word_translation} readOnly />
          </form>
        ))
      }
      <button className="button" type="button" onClick={() => navigate(`/MyModules/${id}/learning`)}>Перейти к изучению модуля</button>
    </div>
  );
}

export default Module;