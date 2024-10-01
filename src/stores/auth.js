import { defineStore } from 'pinia';
import { signIn, signUp } from '../services/auth';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    errorMessage: null,
  }),
  actions: {
		async signIn(email, password) {
		this.isLoading = true;
      this.errorMessage = null;
      try {
				const response = await signIn({ email, password });
				this.errorMessage = null;
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('token', response.data.token);
        this.userId = response.data.id
        this.token = response.data.token
				return response.data
			} catch (error) {
				this.errorMessage = 'Failed to login. Please check your credentials.';
				console.error('Login failed:', error);
			} finally {
        this.isLoading = false;
      }
    },
		async signUp(userData) {
      console.log(userData)
			this.isLoading = true;
			this.errorMessage = null;
			try {
				const response = await signUp(userData);
				this.isLoading = false;
				return response.data;
			} catch (error) {
				this.errorMessage = 'Registration failed. Please try again.';
				this.isLoading = false;
				console.error('Error during registration:', error);
			}
		},
		

    logout() {
      this.userId = null;
      this.token = null;
      this.errorMessage = null
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
    }
  }
});
