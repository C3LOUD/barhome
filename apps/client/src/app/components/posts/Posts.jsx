import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import { useFetchAllPosts } from '../../utils/api-list';
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
        className="xs:mt-6 2xs:mt-2 relative mt-12 flex h-full w-full overflow-hidden"
        onClick={() => {
          setShowToggle((prev) => false);
        }}
      >
        <div className="scrollbar-none 2xs:gap-6 flex w-full flex-1 flex-col items-center gap-12 overflow-y-scroll pb-6">
          <div className="xs:static xs:flex xs:gap-6 xs:self-start absolute left-0 top-0">
            <p className="display-small font-primary text-white-100 dark:text-black-100 font-bold">
              Post
            </p>
            <div
              className="text-white-100 dark:text-black-100 xs:w-fit relative mt-6 flex w-[7.5rem] cursor-pointer"
              onClick={toggleHandler}
            >
              <p className="paragraph-small font-secondary xs:px-2 flex-1 font-semibold">
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
                <span className="flex text-2xl">
                  <ion-icon name="chevron-up-sharp" />
                </span>
              )}
            </div>
          </div>
          {currentPostList?.length === 0 && (
            <p className="heading-h2 font-primary text-white-100 my-12 font-bold">
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
