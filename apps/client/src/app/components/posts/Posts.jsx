import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';

import { useFetchAllPosts } from '../../utils/api-list';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import CardPost from './CardPost';
import TogglePosts from './TogglePosts';

export default function Posts() {
  const [showToggle, setShowToggle] = useState(false);
  const { data, isSuccess, refetch } = useFetchAllPosts();

  const { liked, posts: myposts } = useSelector((state) => state.admin);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleHandler = (e) => {
    e.stopPropagation();
    setShowToggle((prev) => !prev);
  };

  const setFilter = (filter) => {
    setSearchParams(filter);
  };

  const currentPostList = useMemo(() => {
    if (searchParams.get('filter') === 'liked') {
      return data?.posts.filter((post) =>
        liked?.some((likedPost) => likedPost === post._id),
      );
    }
    if (searchParams.get('filter') === 'myposts') {
      return data?.posts.filter((post) =>
        myposts?.some((myPost) => myPost === post._id),
      );
    }
    return data?.posts;
  }, [data, searchParams]);

  useEffect(() => {
    refetch();
  }, [location.search, searchParams, liked, myposts]);

  return (
    <>
      <Routes>
        <Route path={':id'} element={<Modal />} />
      </Routes>
      <div
        className="relative mt-12 flex h-full w-full overflow-hidden xs:mt-6 2xs:mt-2"
        onClick={() => {
          setShowToggle((prev) => false);
        }}
      >
        <div className="flex w-full flex-1 flex-col items-center gap-12 overflow-y-scroll pb-6 scrollbar-none 2xs:gap-6">
          <div className="absolute left-0 top-0 xs:static xs:flex xs:gap-6 xs:self-start">
            <p className="display-small font-primary font-bold text-white-100 dark:text-black-100">
              Post
            </p>
            <div
              className="relative mt-6 flex w-[7.5rem] cursor-pointer text-white-100 dark:text-black-100 xs:w-fit"
              onClick={toggleHandler}
            >
              <p className="paragraph-small flex-1 font-secondary font-semibold xs:px-2">
                {searchParams.get('filter') === 'myposts'
                  ? 'My Posts'
                  : searchParams.get('filter') === 'liked'
                  ? 'Liked Posts'
                  : 'All Posts'}
              </p>
              {showToggle ? (
                <TogglePosts
                  onClick={setFilter}
                  filter={searchParams.get('filter')}
                />
              ) : (
                <Icon name="chevron-up-sharp" className="text-2xl" />
              )}
            </div>
          </div>
          {currentPostList?.length === 0 && (
            <p className="heading-h2 my-12 font-primary font-bold text-white-100">
              No Posts
            </p>
          )}
          {isSuccess &&
            currentPostList.length !== 0 &&
            currentPostList.map((post) => (
              <CardPost posts={post} key={post._id} />
            ))}
        </div>
      </div>
    </>
  );
}
