import { useNavigate } from 'react-router-dom';
import styles from './CreateModule.module.css';

function CreateModule() {
  const navigate = useNavigate();

  return (
    <div className={styles.createModule}>
      <h1>Создать новый модуль</h1>
      <form>
        <label>
          Название модуля:
          <input type="text" placeholder="Введите название" />
        </label>
        <button type="button" onClick={() => navigate('/MyModules')}>Создать</button>
      </form>
    </div>
  );
}

export default CreateModule;