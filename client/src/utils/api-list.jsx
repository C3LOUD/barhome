import { useQuery, useMutation } from '@tanstack/react-query';

export const fetchAllRecipes = (currentPage) =>
  useQuery(['recipes', currentPage], async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `${process.env.SERVER}/recipe/?page=${currentPage}`,
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
  });

export const fetchRecipe = (id) =>
  useQuery(['recipe', id], async () => {
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
  });

export const fetchRecipeByIngredient = (ingredient) =>
  useQuery(['recipe', ingredient], async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `${process.env.SERVER}/recipe/ingredient/${ingredient}`,
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
  });

export const fetchRandomRecipe = () =>
  useQuery(['random'], async () => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/recipe/random`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return res.json();
  });

export const searchKeywords = (keyword) =>
  useQuery(['search', keyword], async () => {
    if (!keyword) return 'empty';
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(
      `${process.env.SERVER}/recipe/search?q=${keyword}`,
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
  });

export const fetchSavedRecipes = () =>
  useQuery(['saved'], async () => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/recipe/saved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return res.json();
  });

export const savedRecipe = () =>
  useMutation(['saved'], async (title) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/recipe/saved`, {
      method: 'PUT',
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
  });

export const signup = () =>
  useMutation(['signup'], async (userData) => {
    const res = await fetch(`${process.env.SERVER}/auth/signup`, {
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
  });

export const login = () =>
  useMutation(['login'], async (userData) => {
    const res = await fetch(`${process.env.SERVER}/auth/login`, {
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
  });

export const getUser = () =>
  useQuery(['user'], async () => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return res.json();
  });

export const updateUser = () =>
  useMutation(['updateUser'], async (userData) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/auth/update`, {
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
  });

export const forgetPassword = () =>
  useMutation(['forgetPassword'], async (email) => {
    const res = await fetch(`${process.env.SERVER}/auth/forget`, {
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
  });

export const resetPassword = () =>
  useMutation(['resetPassword'], async (newPassword) => {
    const res = await fetch(`${process.env.SERVER}/auth/reset`, {
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
  });

export const fetchAllPosts = () =>
  useQuery(
    ['posts'],
    async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.SERVER}/post/`, {
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
    { refetchOnWindowFocus: true },
  );

export const fetchPost = (postId) =>
  useQuery(['search', postId], async () => {
    if (!postId) return 'empty';
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return res.json();
  });

export const createPost = () =>
  useMutation(['createPost'], async (formData) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/post/create`, {
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
  });

export const editPost = () =>
  useMutation(['editPost'], async (formData) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/post/`, {
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
  });

export const deletePost = () =>
  useMutation(['editPost'], async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/post/`, {
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
  });

export const likedPost = () =>
  useMutation(['liked'], async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/post/liked`, {
      method: 'PUT',
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
  });

export const addComment = () =>
  useMutation(['addComment'], async (commentData) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/post/comment`, {
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
  });

export const removeComment = () =>
  useMutation(['removeComment'], async (commentData) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`${process.env.SERVER}/post/comment`, {
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
  });
