import React, { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: { email: string, name: string } | null;
  setUser: (user: { email: string, name: string } | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string, name: string } | null>(null);

  // Check for stored token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Replace with actual API call to fetch user data
      fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUser({ email: data.email, name: data.name });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUser(null);
      });
    }
  }, []);

  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};