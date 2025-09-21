import React from 'react';
import css from './DiaryEntryDetails.module.css';
import Button from '@/components/ui/Button';

interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  emotions: string[];
  content: string;
}

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  onEdit: (entryId: string) => void;
  onDelete: (entryId: string) => void;
  onBack?: () => void; // Для мобільної версії
}

const DiaryEntryDetails: React.FC<DiaryEntryDetailsProps> = ({ 
  entry, 
  onEdit, 
  onDelete,
  onBack 
}) => {
  if (!entry) {
    return (
      <div className={css.container}>
        <div className={css.placeholder}>
          <p className="text-primary">Наразі записи у щоденнику відсутні</p>
        </div>
      </div>
    );
  }

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
    <div className={css.container}>
      {/* Back button for mobile */}
      {onBack && (
        <button className={css.backButton} onClick={onBack}>
          ← Назад
        </button>
      )}
      
      <div className={css.header}>
        <div className={css.headerInfo}>
          <h2 className={`header-third ${css.title}`}>{entry.title}</h2>
          <span className={`text-primary ${css.date}`}>
            {formatDate(entry.date)}
          </span>
        </div>
        
        <div className={css.emotions}>
          {entry.emotions.map((emotion, index) => (
            <span key={index} className={css.emotionIcon}>
              {getEmotionIcon(emotion)}
            </span>
          ))}
        </div>
      </div>
      
      <div className={css.content}>
        <p className="text-primary">{entry.content}</p>
      </div>
      
      <div className={css.actions}>
        <div onClick={() => onEdit(entry.id)}>
          <Button 
            label="Редагувати" 
            style="secondary"
          />
        </div>
        <div onClick={() => onDelete(entry.id)}>
          <Button 
            label="Видалити" 
            style="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryDetails;