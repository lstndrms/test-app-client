<template>
  <div class="min-h-screen bg-white-100">
    <div class="bg-white shadow-md">
      <div class="flex justify-between items-center px-6 py-4">
        <h1 class="text-lg font-semibold text-gray-900">Example</h1>
        <button @click="logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Выйти
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center pt-6">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-4xl mx-4">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Профиль</h3>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Имя</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ userData?.firstName }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Фамилия</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ userData?.lastName }}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ userData?.email }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Профессия</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ userData?.profession }}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Телефон</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ userData?.phone }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { getUser } from '../services/auth';
export default {
	name: "ProfileView",
  setup() {
    const store = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const userData = ref(null)

    const logout = () => {
      store.logout();
      router.push('/sign-in');
    };

    const  fetchUser = async (userId, token) => {
      store.isLoading = true;
      try {
        const response = await getUser(userId, token);
        userData.value = response.data.data;
      } catch (error) {
        store.errorMessage = 'Failed to fetch user data.';
        console.error('Error fetching user:', error);
      } finally {
        store.isLoading = false;
      }
    }

    onMounted(async () => {
      if (store.userId === null || store.token === null) {
        store.logout()
        route.replace('/sign-in')
      } else {
        await fetchUser(route.params.id, store.token);
      }
    });

    return {
      user: store.$state.user,
      isLoading: store.$state.isLoading,
      errorMessage: store.$state.errorMessage,
      store,
      logout,
      userData
    };
  }
}
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 32px;
  height: 32px;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  margin: auto;
}
</style>
