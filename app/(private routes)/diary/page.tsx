'use client';
import React, { useState, useEffect } from 'react';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/Diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/Diary/DiaryEntryDetails/DiaryEntryDetails';
import css from './page.module.css';

interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  emotions: string[];
  content: string;
}

const DiaryPage = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mock data - replace with API call
  useEffect(() => {
    const mockEntries: DiaryEntry[] = [
      {
        id: '1',
        title: 'Дивне бажання',
        date: '2025-07-09',
        emotions: ['натхнення', 'дивні бажання'],
        content: 'Це сталося! Сьогодні вперше, коли я спокійно дивилася фільм, я ще відчула. Спочатку подумала, що здалося. Такий ледь вловимий поштовх зсередини, ніби хтось легенько постукав. Я завмерла, поклала руку на живіт і стала чекати. І за хвилину — знову! Я розплакалася від щастя. Це перше справжнє "привіт" від мого малюка. Покликала чоловіка, він довго тримав руку на животі, і йому теж пощастило відчути один поштовх. Його очі теж момент — я ніколи не забуду. Тепер я точно знаю, що не сама. Там справді хтось є, росте і спілкується зі мною. Неймовірне відчуття.'
      },
      {
        id: '2',
        title: 'Дивне бажання',
        date: '2025-07-09',
        emotions: ['любов', 'дивні бажання'],
        content: 'Сьогодні весь день хотілося чогось незвичайного...'
      },
      {
        id: '3',
        title: 'Дивне бажання',
        date: '2025-07-09',
        emotions: ['енергія', 'дивні бажання'],
        content: 'Відчуваю прилив енергії та бажання щось нове спробувати...'
      }
    ];
    setEntries(mockEntries);
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleAddEntry = () => {
    console.log('Add new diary entry');
    // Open AddDiaryEntryModal
  };

  const handleSelectEntry = (entryId: string) => {
    const entry = entries.find(e => e.id === entryId);
    setSelectedEntry(entry || null);
  };

  const handleEditEntry = (entryId: string) => {
    console.log('Edit entry:', entryId);
    // Open AddDiaryEntryModal with entry data
  };

  const handleDeleteEntry = (entryId: string) => {
    console.log('Delete entry:', entryId);
    // Open ConfirmationModal
  };

  if (isMobile && selectedEntry) {
    // Mobile: show only entry details
    return (
      <section className={css.page}>
        <GreetingBlock />
        <DiaryEntryDetails
          entry={selectedEntry}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
          onBack={() => setSelectedEntry(null)}
        />
      </section>
    );
  }

  return (
    <section className={css.page}>
      <GreetingBlock />
      <div className={css.diaryContainer}>
        <div className={css.diaryList}>
          <DiaryList
            entries={entries}
            onAddEntry={handleAddEntry}
            onSelectEntry={handleSelectEntry}
          />
        </div>
        
        {!isMobile && (
          <div className={css.diaryDetails}>
            <DiaryEntryDetails
              entry={selectedEntry}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DiaryPage;
