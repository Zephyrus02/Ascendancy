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