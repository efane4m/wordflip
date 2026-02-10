import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import styles from './Module.module.css'

function Module() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [newOriginal, setNewOriginal] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [editingCard, setEditingCard] = useState(null);
  const [tempOriginal, setTempOriginal] = useState('');
  const [tempTranslation, setTempTranslation] = useState('');

  const fetchCards = () => {
    fetch(`http://localhost:8081/cards/${id}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCards();
  }, []);

    const handleAddCard = (e) => {
    e.preventDefault();
    if (!newOriginal || !newTranslation) return;
    fetch('http://localhost:8081/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module_id: id,
        word_original: newOriginal,
        word_translation: newTranslation
      })
    })
      .then(res => res.json())
      .then(() => {
        setNewOriginal('');
        setNewTranslation('');
        fetchCards();
      })
      .catch(err => console.log(err));
  };

  const startEditing = (card) => {
    setEditingCard(card.id);
    setTempOriginal(card.word_original);
    setTempTranslation(card.word_translation);
  };

  const saveEdit = (cardId) => {
    fetch(`http://localhost:8081/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word_original: tempOriginal,
        word_translation: tempTranslation
      })
    })
      .then(res => res.json())
      .then(() => {
        setEditingCard(null);
        fetchCards();
      })
      .catch(err => console.log(err));
  };

  // Отмена редактирования
  const cancelEdit = () => {
    setEditingCard(null);
    setTempOriginal('');
    setTempTranslation('');
  };

  // Удаление карты
  const deleteCard = (cardId) => {
    fetch(`http://localhost:8081/cards/${cardId}`, {
      method: 'DELETE'
    })
      .then(() => {
        fetchCards(); // Перезагрузка списка
      })
      .catch(err => console.log(err));
  };

return (
  <div>
    <h1>Карты модуля {id}</h1>
    <form className={styles.wordForm} onSubmit={handleAddCard}>
      <legend>Добавить новую карточку</legend>
      <label>Оригинал:</label>
      <input type="text" value={newOriginal} onChange={(e) => setNewOriginal(e.target.value)} required />
      <label>Перевод:</label>
      <input type="text" value={newTranslation} onChange={(e) => setNewTranslation(e.target.value)} required />
      <button className={styles.button} type="submit">Добавить</button>
    </form>
    {data.map((d, i) => (
      <form className={styles.wordForm} key={i}>
        <legend>Карточка слова</legend>
        <label>Оригинал:</label>
        <input type="text" value={editingCard === d.id ? tempOriginal : d.word_original} onChange={(e) => setTempOriginal(e.target.value)} readOnly={editingCard !== d.id} />
        <label>Перевод:</label>
        <input type="text" value={editingCard === d.id ? tempTranslation : d.word_translation} onChange={(e) => setTempTranslation(e.target.value)} readOnly={editingCard !== d.id} />
        {editingCard === d.id ? (
          <>
            <button className={styles.button} type="button" onClick={() => saveEdit(d.id)}>Сохранить</button>
            <button className={styles.button} type="button" onClick={cancelEdit}>Отмена</button>
          </>
        ) : (
          <>
            <button className={styles.button} type="button" onClick={() => startEditing(d)}>Редактировать</button>
            <button className={styles.button} type="button" onClick={() => deleteCard(d.id)}>Удалить</button>
          </>
        )}
      </form>
    ))}
    <button className={styles.button} type="button" onClick={() => navigate(`/MyModules/${id}/learning`)}>Перейти к изучению модуля</button>
  </div>
  );
}

export default Module;