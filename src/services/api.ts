const API_URL = import.meta.env.VITE_API_URL;

export const createTeam = async (teamData: any) => {
  try {
    
    const response = await fetch(`${API_URL}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create team');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const createUserProfile = async (userId: string, username: string) => {
  try {
    
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, username })
    });

    const data = await response.json();
    console.log('Response data:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create user profile');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};