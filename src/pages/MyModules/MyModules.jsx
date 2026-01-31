import { useNavigate } from 'react-router-dom';
import styles from './MyModules.module.css';

function MyModules() {
  const navigate = useNavigate();

  return (
    <div className={styles.MyModules}>
      <h1>Мои модули</h1>
      <div className={styles.plus} onClick={() => navigate('/CreateModule')}>
        <button>+</button>
      </div>
    </div>
  );
}

export default MyModules;