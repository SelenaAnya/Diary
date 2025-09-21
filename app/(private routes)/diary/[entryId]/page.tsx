'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import DiaryEntryDetails from '@/components/Diary/DiaryEntryDetails/DiaryEntryDetails';

interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  emotions: string[];
  content: string;
}

const DiaryEntryPage = () => {
  const params = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockEntries: DiaryEntry[] = [
      {
        id: '1',
        title: 'Перший привіт',
        date: '2025-07-15',
        emotions: ['натхнення', 'радість'],
        content: 'Це сталося! Сьогодні вперше, коли я спокійно дивилася фільм, я ще відчула...'
      }
    ];

    const foundEntry = mockEntries.find(e => e.id === params.entryId);
    setEntry(foundEntry || null);
    setLoading(false);
  }, [params.entryId]);

  const handleEditEntry = (entryId: string) => {
    console.log('Edit entry:', entryId);
    // Open AddDiaryEntryModal with entry data
  };

  const handleDeleteEntry = (entryId: string) => {
    console.log('Delete entry:', entryId);
    // Open ConfirmationModal
  };

  const handleBack = () => {
    router.push('/diary');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <GreetingBlock />
      <DiaryEntryDetails
        entry={entry}
        onEdit={handleEditEntry}
        onDelete={handleDeleteEntry}
        onBack={handleBack}
      />
    </section>
  );
};

export default DiaryEntryPage;