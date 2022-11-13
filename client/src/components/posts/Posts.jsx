import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';

import { fetchAllPosts } from '../../utils/api-list';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import CardPost from './CardPost';

const Posts = () => {
  const [showToggle, setShowToggle] = useState(false);
  const { data, isSuccess, refetch } = fetchAllPosts();

  const { liked, posts: myposts } = useSelector((state) => state.admin);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleHandler = (e) => {
    e.stopPropagation();
    setShowToggle((prev) => !prev);
  };

  const currentPostList = useMemo(() => {
    if (searchParams.get('filter') === 'liked')
      return data?.posts.filter((post) =>
        liked.some((likedPost) => likedPost === post._id)
      );

    if (searchParams.get('filter') === 'myposts')
      return data?.posts.filter((post) =>
        myposts.some((myPost) => myPost === post._id)
      );

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
        className="relative mt-12 w-full flex overflow-hidden h-full"
        onClick={() => {
          setShowToggle((prev) => false);
        }}
      >
        <div className="absolute top-0 left-0">
          <p className="font-primary text-white-100 display-small font-bold">
            Post
          </p>
          <div
            className="flex mt-6 w-[7.5rem] text-white-100 relative cursor-pointer"
            onClick={toggleHandler}
          >
            <p className="flex-1 font-secondary paragraph-small font-semibold">
              {searchParams.get('filter') === 'myposts'
                ? 'My Posts'
                : searchParams.get('filter') === 'liked'
                ? 'Liked Posts'
                : 'All Posts'}
            </p>
            {showToggle ? (
              <>
                <Icon name="chevron-down-sharp" style="text-2xl" />
                <ul className="animate-dropdown transition-all absolute top-5 left-0 w-full py-2 flex flex-col gap-2">
                  <a
                    className={`transition-all font-secondary paragraph-small font-semibold hover:bg-primary-tint-200 ${
                      (searchParams.get('filter') === 'all' ||
                        !searchParams.get('filter')) &&
                      'bg-primary-main'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchParams({ filter: 'all' });
                    }}
                  >
                    All Posts
                  </a>
                  <a
                    className={`transition-all font-secondary paragraph-small font-semibold hover:bg-primary-tint-200 ${
                      searchParams.get('filter') === 'liked' &&
                      'bg-primary-main'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchParams({ filter: 'liked' });
                    }}
                  >
                    Liked Posts
                  </a>
                  <a
                    className={`transition-all font-secondary paragraph-small font-semibold hover:bg-primary-tint-200 ${
                      searchParams.get('filter') === 'myposts' &&
                      'bg-primary-main'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchParams({ filter: 'myposts' });
                    }}
                  >
                    My Posts
                  </a>
                </ul>
              </>
            ) : (
              <Icon name="chevron-up-sharp" style="text-2xl" />
            )}
          </div>
        </div>
        <div className="overflow-y-scroll scrollbar-none flex flex-col gap-12 flex-1 pb-6 w-full items-center">
          {currentPostList?.length === 0 && (
            <p className="my-12 heading-h2 text-white-100 font-primary font-bold">
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
};

export default Posts;
