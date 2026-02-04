import { useNavigate } from 'react-router-dom';
import styles from './MyModules.module.css';
import { useEffect, useState } from "react"

function MyModules() {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  useEffect(()=> {
    fetch('http://localhost:8081/modules')
    .then(res => res.json())
    .then(data => setData(data))
    .then(err => console.log(err));
  }, [])
  return (
    <div className={styles.MyModules}>
    <h1>Мои модули</h1>
      {data.map((d, i) => (
        <div className={styles.module} key={i}>
          <h3>{d.name}</h3>
          <p onClick={() => navigate(`/MyModules/${d.id}`)}>Перейти к изучению модуля</p>
        </div>
      ))}
      <div className={styles.plus} onClick={() => navigate('/CreateModule')}>
        <button>+</button>
      </div>
    </div>
  );
}

export default MyModules;