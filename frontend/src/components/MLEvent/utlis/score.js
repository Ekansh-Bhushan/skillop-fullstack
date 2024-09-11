// utils/score.js
export const addPoints = async (points) => {
    const response = await fetch('/api/points/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    const data = await response.json();
    return data.points;
  };
  
  export const deductPoints = async () => {
    const response = await fetch('/api/points/deduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    const data = await response.json();
    return data.points;
  };
  
  export const getScore = async () => {
    const response = await fetch('/api/points');
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    return data.points;
  };
  