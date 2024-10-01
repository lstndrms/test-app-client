<template>
	<div class="flex items-center justify-center min-h-screen bg-gray-100">
		<div class="w-full max-w-md">
			<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="register">
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
						Имя
					</label>
					<input v-model="firstName" id="firstName" type="text" placeholder="Your name"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
				</div>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
						Фамилия
					</label>
					<input v-model="lastName" id="lastName" type="text" placeholder="Your last name"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
				</div>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="profession">
						Профессия
					</label>
					<input v-model="profession" id="profession" type="text" placeholder="Web Developer"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
				</div>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="email">
						Email
					</label>
					<input v-model="email" id="email" type="email" placeholder="email@example.com"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
				</div>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
						Телефон
					</label>
					<input v-model="phone" id="phone" type="text" placeholder="+79996669966"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
				</div>
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
						Пароль
					</label>
					<input v-model="password" id="password" type="password" placeholder="Password"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
				</div>

				<div v-if="store.errorMessage" class="mb-4 text-red-500 text-xs italic">{{ store.errorMessage }}</div>
				<div class="flex items-center justify-around">
					<button type="submit"
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						:disabled="store.isLoading">
						Зарегистрироваться
						<span v-if="store.isLoading" class="loader"></span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
	name: "SignUpView",
	setup() {
		const firstName = ref('');
		const lastName = ref('');
		const profession = ref('');
		const email = ref('');
		const phone = ref('');
		const password = ref('');
		const router = useRouter();
		const store = useAuthStore();

		const register = async () => {
			const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        profession: profession.value,
        email: email.value,
        phone: phone.value,
        password: password.value
      };
			try {
				const res = await store.signUp(userData);
				if (!store.$state.errorMessage && res)
					router.push('/sign-in');
			} catch (error) {
				console.error('Registration failed:', error);
			}
		};

		return { firstName, lastName, profession, email, password, phone, register, store };
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
