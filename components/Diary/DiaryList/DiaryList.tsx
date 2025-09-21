import React from 'react';
import css from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import Button from '@/components/ui/Button';

interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  emotions: string[];
  content: string;
}

interface DiaryListProps {
  entries: DiaryEntry[];
  onAddEntry: () => void;
  onSelectEntry: (entryId: string) => void;
}

const DiaryList: React.FC<DiaryListProps> = ({ 
  entries, 
  onAddEntry, 
  onSelectEntry 
}) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={`header-third ${css.title}`}>Щоденник</h2>
        <div className={css.addButton} onClick={onAddEntry}>
          <Button 
            label="Новий запис" 
            style="primary"
          />
        </div>
      </div>
      
      <div className={css.entriesList}>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <DiaryEntryCard
              key={entry.id}
              entry={entry}
              onClick={() => onSelectEntry(entry.id)}
            />
          ))
        ) : (
          <div className={css.placeholder}>
            <p className="text-primary">Наразі записи у щоденнику відсутні</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryList;