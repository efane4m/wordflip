import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './LearnPage.module.css';

function LearnPage() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8081/cards/${id}`)
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.log(err));
  }, [id]);

  const handleCardClick = () => setIsFlipped(!isFlipped);

  const handleLearned = () => {
    setLearnedCount(learnedCount + 1);
    setCurrentIndex(currentIndex + 1);
    setIsFlipped(false);
  };

  const handleNotLearned = () => {
    setCurrentIndex(currentIndex + 1);
    setIsFlipped(false);
  };

  if (currentIndex >= cards.length) {
    return (
      <div className={styles.container}>
        <h1>Изучение завершено!</h1>
        <p>Выучено {learnedCount} карточек из {cards.length}.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Изучение модуля {id}</h1>
      <p>Выучено: {learnedCount} / {cards.length}</p>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleCardClick}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <p>{cards[currentIndex].word_original}</p>
          </div>
          <div className={styles.cardBack}>
            <p>{cards[currentIndex].word_translation}</p>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.learnedButton} onClick={handleLearned}>Выучил</button>
        <button className={styles.notLearnedButton} onClick={handleNotLearned}>Не выучил</button>
      </div>
      <p>Кликните на карточку, чтобы перевернуть. Нажмите кнопку для перехода к следующему слову.</p>
    </div>
  );
}

export default LearnPage;