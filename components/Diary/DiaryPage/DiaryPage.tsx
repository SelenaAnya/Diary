// components/Diary/DiaryPage/DiaryPage.tsx

import React, { useState, useEffect } from "react";
import { DiaryEntry, Note } from "../Diary.types";
import { mockEntries, mockNotes } from "../Diary.mock";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import NotesList from "../NotesList/NotesList";
import GreetingBlock from "../GreetingBlock/GreetingBlock";

const DiaryPage: React.FC = () => {
  const [entries] = useState<DiaryEntry[]>(mockEntries);
  const [notes] = useState<Note[]>(mockNotes);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(entries[0] || null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleEntryClick = (entry: DiaryEntry) => {
    if (isMobile) {
      // On mobile devices, go to a separate page
      console.log(`Navigate to /diary/${entry.id}`);
      // router.push(`/diary/${entry.id}`);
    } else {
      // On the desktop, show the details in the right pane
      setSelectedEntry(entry);
      setSelectedNote(null);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setSelectedEntry(null);
  };

  const handleAddEntry = () => {
    console.log('Open AddDiaryEntryModal');
    // Тут буде логіка відкриття модального вікна**********
  };

  const handleAddNote = () => {
    console.log('Open AddNoteModal');
    // Тут буде логіка відкриття модального вікна***************
  };

  const handleEditEntry = () => {
    console.log('Open AddDiaryEntryModal for editing', selectedEntry);
    // Тут буде логіка відкриття модального вікна для редагування**************
  };

  const handleDeleteEntry = () => {
    console.log('Open ConfirmationModal for deletion', selectedEntry);
    // Тут буде логіка відкриття модального вікна підтвердження*********
  };

  // Mobile v.
  if (isMobile) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "var(--pastel-pink-lighter)", 
        padding: "16px" 
      }}>
        <GreetingBlock />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <DiaryList 
            entries={entries}
            onEntryClick={handleEntryClick}
            onAddEntry={handleAddEntry}
          />
          <NotesList
            notes={notes}
            onNoteClick={handleNoteClick}
            onAddNote={handleAddNote}
          />
        </div>
      </div>
    );
  }

  // Desktop v.
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "var(--pastel-pink-lighter)", 
      padding: "24px" 
    }}>
      <GreetingBlock />
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr 1fr", 
        gap: "24px",
        height: "450px" // Фіксована висота для десктопу
      }}>
        <DiaryList 
          entries={entries}
          onEntryClick={handleEntryClick}
          selectedEntryId={selectedEntry?.id}
          onAddEntry={handleAddEntry}
        />
        
        <DiaryEntryDetails 
          entry={selectedEntry}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
        />
        
        <NotesList
          notes={notes}
          onNoteClick={handleNoteClick}
          selectedNoteId={selectedNote?.id}
          onAddNote={handleAddNote}
        />
      </div>
    </div>
  );
};

export default DiaryPage;