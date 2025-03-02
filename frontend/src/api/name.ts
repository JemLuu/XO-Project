/**
 * 
 * // Get Name Route
// router.get('/name', (req, res) => {
//   console.log("email");
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }

//   db.get('SELECT firstName, lastName FROM users WHERE email = ?', [email], (err, user) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ error: 'Server error' });
//     }

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     return res.status(200).json({ firstName: user.firstName, lastName: user.lastName });
//   });
// });
 */

export const getName = async (email: string) => {
    try {
        const response = await fetch(`http://localhost:5000/api/auth/name?email=${encodeURIComponent(email)}`);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text(); // Log raw response
            throw new Error(`Unexpected response format: ${text}`);
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch name');
        }

        return { firstName: data.firstName, lastName: data.lastName };
    } catch (error) {
        console.error('Get name error:', error);
        throw error;
    }
};

