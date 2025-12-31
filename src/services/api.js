// src/services/api.js
// --- SMART MOCK API (Saves data to LocalStorage) ---

const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultUser = {
  name: 'Demo Traveler',
  email: 'demo@tour.com',
  phone: '0300-1234567',
  joined: new Date().toISOString(),
  budget: null,
  route: null,
  bookings: []
};

// Helper to get current data or default
const getDb = () => {
  if (typeof window === 'undefined') return defaultUser;
  const stored = localStorage.getItem('dashboardData');
  return stored ? JSON.parse(stored) : defaultUser;
};

// Helper to save data
const saveDb = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }
};

const api = {
  // Simulate GET requests
  get: async (url) => {
    await mockDelay(400); // Small delay
    console.log(`[MockAPI] GET: ${url}`);

    if (url === '/dashboard') {
      return { data: { data: getDb() } };
    }
    return { data: {} };
  },

  // Simulate POST requests (Now actually saves data!)
  post: async (url, body) => {
    await mockDelay(600);
    console.log(`[MockAPI] POST: ${url}`, body);

    const db = getDb(); // Get current data

    // --- LOGIN ---
    if (url === '/login') {
      const user = { ...db, email: body.email };
      saveDb(user);
      return {
        data: {
          token: 'mock-jwt-token-123456',
          data: user
        }
      };
    }

    // --- REGISTER ---
    if (url === '/register') {
      const newUser = { ...defaultUser, name: body.name, email: body.email };
      saveDb(newUser);
      return { data: { message: 'Registered successfully' } };
    }

    // --- ADD BOOKING ---
    if (url === '/bookings') {
      const newBooking = { 
        _id: Date.now().toString(), 
        ts: Date.now(), 
        ...body 
      };
      db.bookings.push(newBooking); // Add to array
      saveDb(db); // Save to LocalStorage
      return { data: { message: 'Added to plans' } };
    }

    // --- SAVE BUDGET ---
    if (url === '/budget') {
      db.budget = body;
      saveDb(db);
      return { data: { message: 'Budget saved' } };
    }

    // --- SAVE ROUTE ---
    if (url === '/route') {
      db.route = body;
      saveDb(db);
      return { data: { message: 'Route saved' } };
    }

    // --- LOCATION/GPS (Ignore for now) ---
    if (url === '/location') {
      return { data: { status: 'ok' } };
    }

    return { data: { message: 'Saved successfully' } };
  },

  // Mock Interceptors
  interceptors: {
    request: { use: (fn) => fn({}) },
    response: { use: (fn) => fn({}) }
  }
};

export default api;