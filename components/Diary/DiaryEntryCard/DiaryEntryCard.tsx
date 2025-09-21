import React from 'react';
import css from './DiaryEntryCard.module.css';

interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  emotions: string[];
  content: string;
}

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onClick: () => void;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEmotionIcon = (emotion: string) => {
    const emotionIcons: { [key: string]: string } = {
      'радість': '😊',
      'сум': '😢',
      'злість': '😠',
      'страх': '😨',
      'здивування': '😲',
      'любов': '❤️',
      'надія': '🌟',
      'втома': '😴',
      'спокій': '😌',
      'хвилювання': '😰'
    };
    return emotionIcons[emotion] || '😊';
  };

  return (
    <div className={css.card} onClick={onClick}>
      <div className={css.cardHeader}>
        <h3 className={`header-fourth ${css.cardTitle}`}>{entry.title}</h3>
        <span className={`text-primary ${css.cardDate}`}>
          {formatDate(entry.date)}
        </span>
      </div>
      
      <div className={css.emotions}>
        {entry.emotions.slice(0, 5).map((emotion, index) => (
          <span key={index} className={css.emotionIcon}>
            {getEmotionIcon(emotion)}
          </span>
        ))}
        {entry.emotions.length > 5 && (
          <span className={css.moreEmotions}>+{entry.emotions.length - 5}</span>
        )}
      </div>
    </div>
  );
};

export default DiaryEntryCard;