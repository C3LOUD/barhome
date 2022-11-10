import { useQuery, useMutation } from '@tanstack/react-query';

export const fetchAllRecipes = (currentPage) =>
  useQuery(['recipes', currentPage], async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `http://localhost:8080/recipe/?page=${currentPage}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  });

export const fetchRecipe = (id) =>
  useQuery(['recipe', id], async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/recipe/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  });

export const fetchRecipeByIngredient = (ingredient) =>
  useQuery(['recipe', ingredient], async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `http://localhost:8080/recipe/ingredient/${ingredient}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  });

export const fetchRandomRecipe = () =>
  useQuery(
    ['random'],
    async () => {
      const token = localStorage.getItem('token');
      if (!token) return 'not autenticated.';
      const res = await fetch(`http://localhost:8080/recipe/random`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return await res.json();
    },
    { enabled: false }
  );

export const searchKeywords = (keyword) =>
  useQuery(['search', keyword], async () => {
    if (!keyword) return 'empty';
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(
      `http://localhost:8080/recipe/search?q=${keyword}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  });

export const fetchSavedRecipes = () =>
  useQuery(['saved'], async () => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`http://localhost:8080/recipe/saved`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  });

export const savedRecipe = () =>
  useMutation(['saved'], async (title) => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch(`http://localhost:8080/recipe/saved`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(title),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  });

export const signup = () =>
  useMutation(async (userData) => {
    const res = await fetch('http://localhost:8080/auth/signup', {
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
    return await res.json();
  });

export const login = () =>
  useMutation(async (userData) => {
    const res = await fetch('http://localhost:8080/auth/login', {
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
    return await res.json();
  });

export const getUser = () =>
  useQuery(['user'], async () => {
    const token = localStorage.getItem('token');
    if (!token) return 'not autenticated.';
    const res = await fetch('http://localhost:8080/auth/', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return await res.json();
  });
