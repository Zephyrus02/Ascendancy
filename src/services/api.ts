const API_URL = import.meta.env.VITE_DEV_URL;

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
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create user profile');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (userId: string, username: string) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, username })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async (orderId: string, paymentId: string) => {
  try {
    const response = await fetch(`${API_URL}/orders/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderId, paymentId })
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteTeam = async (teamId: string) => {
  try {
    const response = await fetch(`${API_URL}/teams/${teamId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete team');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const checkAdminStatus = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to check admin status');
    }

    return data.role === 'admin';
  } catch (error) {
    throw error;
  }
};

export const createGameRoom = async (matchData: {
  matchId: string;
  team1Captain: {
    userId: string;
    username: string;
    teamName: string;
  };
  team2Captain: {
    userId: string;
    username: string;
    teamName: string;
  };
}) => {
  try {
    const response = await fetch(`${API_URL}/rooms/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create room');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const joinGameRoom = async (roomKey: string, userId: string) => {
  try {
    const response = await fetch(`${API_URL}/rooms/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomKey, userId })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to join room');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getRoomStatus = async (roomKey: string) => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomKey}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get room status');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const response = await fetch(`${API_URL}/rooms`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch rooms');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getVerifiedTeams = async () => {
  try {
    const response = await fetch(`${API_URL}/teams/verified`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch teams');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

interface MatchData {
  team1: {
    id: string;
    name: string;
    captain: {
      id: string;
      username: string;
    };
  };
  team2: {
    id: string;
    name: string;
    captain: {
      id: string;
      username: string;
    };
  };
  date: string;
  time: string;
  round: number;
  status: 'yet to start' | 'ongoing' | 'completed';
}

export const createMatch = async (matchData: MatchData) => {
  try {
    const response = await fetch(`${API_URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create match');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};