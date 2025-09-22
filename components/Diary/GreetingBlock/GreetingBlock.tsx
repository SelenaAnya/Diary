import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';

const GreetingBlock: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Помилка при отриманні імені:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="mb-8">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold text-gray-900">
        Доброго ранку, {userName ?? 'користувачу'}!
      </h1>
    </div>
  );
};

export default GreetingBlock;