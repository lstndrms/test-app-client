<template>
<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="w-full max-w-xs">
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="login">
			<div class="mb-4">
				<input v-model="email" id="email" type="email" placeholder="Email"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
			</div>
			<div class="mb-4">
				<input v-model="password" id="password" type="password" placeholder="Password"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
			</div>
			<div class="mb-4 text-center text-[12px]">
				<a href="/sign-up">Нет аккаунта? Зарегистрируйтесь</a>
			</div>
			<div v-if="store.errorMessage" class="mb-4 text-red-500 text-xs italic">{{ store.errorMessage }}</div>
			<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				:disabled="store.isLoading">
				Войти
				<span v-if="store.isLoading" class="loader"></span>
			</button>
		</form>
	</div>
</div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
	name: "SignInView",
	setup() {
		const email = ref('');
		const password = ref('');
		const router = useRouter();
		const store = useAuthStore();

		const login = async () => {
		const res = await store.signIn(email.value, password.value);
		
		if (!store.$state.errorMessage && res)
			router.push(`/profile/${store.userId}`);
		};

		return { email, password, login, store };
	}
}
</script>

<style scoped>
.loader {
	border: 2px solid #f3f3f3;
	border-radius: 50%;
	border-top: 2px solid #3498db;
	width: 12px;
	height: 12px;
	-webkit-animation: spin 1s linear infinite;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>
