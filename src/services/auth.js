
import { api } from './api.js';
import { toast } from '../utils/toast.js';

export const authState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  listeners: [],

  subscribe(fn) { this.listeners.push(fn); },
  notify() { this.listeners.forEach(fn => fn(this.user)); },

  async login(email, password) {
    try {
      // For JSON Server, we simulate login by fetching users
      const users = await api.get(`/users?email=${email}`);
      const user = users.find(u => u.password === password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.notify();
      toast.show(`Welcome back, ${user.firstName}!`, 'success');
      return true;
    } catch (err) {
      toast.show('Login failed: Invalid email or password');
      return false;
    }
  },

  async signup(data) {
    try {
      // Check if user exists
      const existing = await api.get(`/users?email=${data.email}`);
      if (existing.length > 0) throw new Error('Email already registered');

      const newUser = {
        ...data,
        avatar: `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=4f46e5&color=fff`
      };

      await api.post('/users', newUser);
      toast.show('Account created! Please login.', 'success');
      return true;
    } catch (err) {
      toast.show(err.message);
      return false;
    }
  },

  // Edit profile method
  async updateProfile(updatedData) {
    try {
      if (!this.user) throw new Error('No user logged in');

      const updatedUser = { ...this.user, ...updatedData };
      await api.put(`/users/${this.user.id}`, updatedUser);

      this.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.notify();
      toast.show('Profile updated successfully', 'success');
      return true;
    } catch (err) {
      toast.show('Profile update failed: ' + err.message);
      return false;
    }
  },

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.notify();
    toast.show('Logged out successfully', 'success');
    window.location.href = '/';
  }
};
