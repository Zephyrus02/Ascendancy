const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = import.meta.env.VITE_DEV_URL;

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

export const createUserProfile = async (userId: string, username: string, email: string) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, username, email })
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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete team');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateTeam = async (teamId: string, teamData: any) => {
  try {
    const response = await fetch(`${API_URL}/teams/${teamId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update team');
    }

    return await response.json();
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

interface CreateRoomData {
  matchId: string;
  adminId: string;
  adminUsername: string; // Add this field
  team1: {
    id: string;
    name: string;
    captainId: string;
    captainUsername: string;
  };
  team2: {
    id: string;
    name: string;
    captainId: string;
    captainUsername: string;
  };
}

export const createGameRoom = async (data: CreateRoomData) => {
  try {
    const response = await fetch(`${API_URL}/rooms/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create room');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

interface JoinRoomData {
  roomCode: string;
  roomPasskey: string;
  userId: string;
  isAdmin?: boolean;
}

export const joinGameRoom = async (data: JoinRoomData) => {
  try {
    const response = await fetch(`${API_URL}/rooms/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to join room');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getRoomStatus = async (roomCode: string) => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomCode}/status`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get room status');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    const response = await fetch(`${API_URL}/rooms`);
    if (!response.ok) {
      throw new Error('Failed to fetch rooms');
    }
    return await response.json();
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

export const getVerifiedTeamById = async (teamId: string) => {
  try {
    const response = await fetch(`${API_URL}/teams/verified/${teamId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch team');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

interface CreateMatchData {
  team1: {
    id: string;
    name: string;
    logo: string;
    captain: {
      userId: string;
      username: string;
    }
  };
  team2: {
    id: string;
    name: string;
    logo: string;
    captain: {
      userId: string;
      username: string;
    }
  };
  date: string;
  time: string;
  round: number;
  status: string;
}

export const createMatch = async (matchData: CreateMatchData) => {
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

export const getMatches = async () => {
  try {
    const response = await fetch(`${API_URL}/matches`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPendingMatches = async () => {
  try {
    const response = await fetch(`${API_URL}/matches/pending`);
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const startPickBan = async (roomCode: string) => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomCode}/start-pickban`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to start pick/ban');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const banMap = async (roomCode: string, mapId: string) => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomCode}/ban-map`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mapId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to ban map');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (roomCode: string) => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomCode}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete room');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};