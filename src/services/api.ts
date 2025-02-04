const API_URL = import.meta.env.VITE_API_URL;

export const createTeam = async (teamData: any) => {
  try {
    console.log('Attempting to connect to:', `${API_URL}/teams`);
    
    const response = await fetch(`${API_URL}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData)
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create team');
    }

    return data;
  } catch (error) {
    console.error('Detailed API Error:', error);
    throw error;
  }
};