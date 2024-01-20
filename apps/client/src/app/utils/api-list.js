import { useQuery, useMutation } from '@tanstack/react-query';

export const useFetchAllRecipes = (currentPage) =>
  useQuery({
    queryKey: ['recipes', currentPage],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NX_SERVER}/recipe/?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useFetchRecipe = (id) =>
  useQuery({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useFetchRecipeByIngredient = (ingredient) =>
  useQuery({
    queryKey: ['recipe', ingredient],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NX_SERVER}/recipe/ingredient/${ingredient}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useFetchRandomRecipe = () =>
  useQuery({
    queryKey: ['recipe', 'random'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NX_SERVER}/recipe/random`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useSearchKeywords = (keyword) =>
  useQuery({
    queryKey: ['search', keyword],
    queryFn: async () => {
      if (!keyword) return 'empty';
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(
        `${process.env.NX_SERVER}/recipe/search?q=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useFetchSavedRecipes = () =>
  useQuery({
    queryKey: ['saved'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/recipe/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useSavedRecipe = () =>
  useMutation({
    mutationFn: async (title) => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/recipe/saved`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(title),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useSignUp = () =>
  useMutation({
    mutationFn: async (userData) => {
      const res = await fetch(`${process.env.NX_SERVER}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useLogin = () =>
  useMutation({
    mutationFn: async (userData) => {
      const res = await fetch(`${process.env.NX_SERVER}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useGetUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: async (userData) => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useForgetPassword = () =>
  useMutation({
    mutationFn: async (email) => {
      const res = await fetch(`${process.env.NX_SERVER}/auth/forget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: async (newPassword) => {
      const res = await fetch(`${process.env.NX_SERVER}/auth/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPassword),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useFetchAllPosts = () =>
  useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NX_SERVER}/post/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useFetchPost = (postId) =>
  useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (!postId) return 'empty';
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useCreatePost = () =>
  useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/post/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useEditPost = () =>
  useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/post/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useDeletePost = () =>
  useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/post/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useLikedPost = () =>
  useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/post/liked`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useAddComment = () =>
  useMutation({
    mutationFn: async (commentData) => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/post/comment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });

export const useRemoveComment = () =>
  useMutation({
    mutationFn: async (commentData) => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`${process.env.NX_SERVER}/post/comment`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
  });
