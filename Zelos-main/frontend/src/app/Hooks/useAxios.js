// hooks/useAxios.js
'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAxios = () => {
  const router = useRouter();

  // Cria instância Axios
  const api = axios.create({
    baseURL: 'http://localhost:8080', // URL base da API
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // se precisar enviar cookies
  });

  // Adiciona interceptor de request para adicionar token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de response para tratar erros globais
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Se 401 (não autorizado), limpa storage e redireciona para login
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }

      // Mensagem padrão de erro
      return Promise.reject(error);
    }
  );

  return api;
};

export default useAxios;
