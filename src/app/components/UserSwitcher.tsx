'use client';
import { useEffect, useState } from 'react';

const mockUsers = Array.from({ length: 10 }, (_, i) => ({
  id: `u${i + 1}`,
  name: `User ${i + 1}`,
}));

export default function UserSwitcher() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userId') || 'u1';
    setUserId(saved);
    localStorage.setItem('userId', saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('userId', e.target.value);
    setUserId(e.target.value);
    location.reload();
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Select User: </label>
      <select value={userId || ''} onChange={handleChange}>
        {mockUsers.map(u => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>
    </div>
  );
}
