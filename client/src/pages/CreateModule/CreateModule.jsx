import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './CreateModule.module.css';

function CreateModule() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name.trim()) {
      alert('Введите название модуля');
      return;
    }

    fetch('http://localhost:8081/modules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, user_id: 2 }), // Убрать 2 по умолчанию, как добавлю login/password page
    })
      .then(() => navigate('/MyModules'));
  };

  return (
    <div className={styles.createModule}>
      <h1>Создать новый модуль</h1>
      <form>
        <label>
          Название модуля:
          <input
            type="text"
            placeholder="Введите название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleCreate}>Создать</button>
      </form>
    </div>
  );
}

export default CreateModule;