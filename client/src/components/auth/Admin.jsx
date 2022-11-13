import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { getUser, updateUser } from '../../utils/api-list';
import InputForm from '../ui/InputForm';
import Modal from '../ui/Modal';

const Admin = () => {
  const { data } = getUser();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = updateUser();

  const submitHandler = async (userData) => {
    mutate(userData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
      },
    });
  };

  return (
    <>
      <Routes>
        <Route path={':id'} element={<Modal />} />
        <Route path={':id/*'} element={<Navigate to="/dashboard/admin" />} />
      </Routes>
      {isLoading && (
        <div className="absolute z-20 w-full h-full bg-accent-dark-shade-700/80">
          Loading
        </div>
      )}
      <div className="mt-12 w-full h-full flex flex-col item-center gap-12 text-white-100">
        <p className="font-primary text-white-100 display-small font-bold">
          Profile
        </p>
        <div className="w-[20rem] self-center relative">
          {isError && (
            <div className="absolute -top-12 left-0 text-error">
              {error.message}
            </div>
          )}
          <InputForm onSubmit={submitHandler} admin={data} />
        </div>
      </div>
    </>
  );
};

export default Admin;
