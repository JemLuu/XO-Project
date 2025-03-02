export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        if (!response.ok) {
        throw new Error(data.error || 'Failed to log in');
        }

        return data;
    }   catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const signupUser = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }
  
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
};