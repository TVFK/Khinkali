<template>
  <NavBar />
  <div class="container w-2/5 p-6 mx-auto mt-20 mb-10 rounded-lg shadow-sm bg-whit shadow-gray-600">
    <h1 class="mb-6 text-3xl text-center text-orange-500">Регистрация</h1>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Имя:</label>
        <MyInput v-model="registrationCredentials.name" type="text" id="username" name="username" required
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <MyInput v-model="registrationCredentials.email" type="email" id="email" name="email" required
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700">Номер телефона:</label>
        <MyInput v-model="registrationCredentials.phone" type="tel" id="phone" name="phone" required
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Пароль:</label>
        <MyInput v-model="registrationCredentials.password" type="password" id="password" name="password" required
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
      </div>

      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Подтвердите пароль:</label>
        <MyInput v-model="registrationCredentials.confirmPassword" type="password" id="confirmPassword"
          name="confirmPassword" required
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Пол:</label>
        <div class="flex items-center space-x-4">
          <label class="">
            <MyInput v-model="registrationCredentials.gender" type="radio" name="gender" value="male" required
              class="mr-2" />
            Мужской
          </label>
          <label class="flex items-center">
            <MyInput v-model="registrationCredentials.gender" type="radio" name="gender" value="female" class="mr-2" />
            Женский
          </label>
        </div>
      </div>

      <div class="mb-4">
        <label for="avatar" class="block text-sm font-medium text-gray-700">Загрузите аватар:</label>
        <MyInput v-model="registrationCredentials.avatar" type="file" id="avatar" name="avatar" accept="image/*"
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
      </div>

      <div class="mb-4">
        <label for="source" class="block text-sm font-medium text-gray-700">Откуда вы узнали о нас:</label>
        <select v-model="registrationCredentials.source" id="source" name="source" required
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500">
          <option value="">Выберите вариант</option>
          <option value="friends">Друзья</option>
          <option value="social">Социальные сети</option>
          <option value="ads">Реклама</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="flex items-center">
          <input v-model="registrationCredentials.termsAccepted" type="checkbox" id="terms" class="mr-2" /> Согласен с
          условиями
        </label>
      </div>

      <div class="flex space-x-4">
        <MyButton type="submit" id="registerMyButton"
          class="px-6 py-2 text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600">Регистрация</MyButton>
        <MyButton type="reset" id="resetMyButton"
          class="px-6 py-2 text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600">Очистить</MyButton>
      </div>
    </form>
  </div>
  <HinkalFooter />
</template>

<script setup lang="ts">
import HinkalFooter from '../components/HinkalFooter.vue';
import NavBar from '../components/NavBar.vue';
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const registrationCredentials = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  gender: '',
  avatar: null as File | null,
  source: '',
  termsAccepted: false,
});


async function register() {
  try {
    const response = await axios.post("http://localhost:8080/api/register", registrationCredentials, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      console.log('Регистрация прошла успешно!', response.data);
      router.push('/login');
    } else {
      alert('Что-то пошло не так');
      console.error("Что-то пошло не так", response);
    }
  } catch (error) {
    console.error(`Ошибка HTTP: ${(error as any).response?.status || (error as Error).message}`);
  }
}

</script>
