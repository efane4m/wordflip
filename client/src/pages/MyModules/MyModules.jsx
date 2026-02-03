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
      <table>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.plus} onClick={() => navigate('/CreateModule')}>
        <button>+</button>
      </div>
    </div>
  );
}

export default MyModules;