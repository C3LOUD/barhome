import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { getUser, updateUser } from '../../utils/api-list';
import InputForm from '../ui/InputForm';
import Loading from '../ui/Loading';
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
        <div className="absolute z-20 flex h-full w-full items-center justify-center bg-accent-dark-shade-700/80">
          <Loading />
        </div>
      )}
      <div className="item-center mt-12 flex w-full shrink flex-col text-white-100 dark:text-black-100">
        <p className="display-small font-primary font-bold text-white-100 dark:text-black-100">
          Profile
        </p>
        <div className="w-[20rem] self-center pb-12 xs:w-full xs:max-w-[20rem] 2xs:pt-12">
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
