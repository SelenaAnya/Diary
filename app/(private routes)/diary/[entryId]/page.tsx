"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DiaryEntryDetails from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";
import GreetingBlock from "@/components/Diary/GreetingBlock/GreetingBlock";
import { mockEntries } from "@/components/Diary/Diary.mock";

interface PageProps {
  params: {
    entryId: string;
  };
}

const DiaryEntryPage = ({ params }: PageProps) => {
  const router = useRouter();
  const entry = mockEntries.find(e => e.id === params.entryId);

  const handleBack = () => {
    router.push('/diary');
  };

  const handleEdit = () => {
    console.log('Open AddDiaryEntryModal for editing', entry);
    // Тут буде логіка відкриття модального вікна для редагування
  };

  const handleDelete = () => {
    console.log('Open ConfirmationModal for deletion', entry);
    // Тут буде логіка відкриття модального вікна підтвердження
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "var(--pastel-pink-lighter)", 
      padding: "16px" 
    }}>
      <GreetingBlock />
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <DiaryEntryDetails 
          entry={entry || null}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default DiaryEntryPage;