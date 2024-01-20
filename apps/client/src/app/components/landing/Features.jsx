import React from 'react';

import app1 from '../../../assets/app/app-1.png';
import app2 from '../../../assets/app/app-2.png';
import app3 from '../../../assets/app/app-3.png';
import FeatureCard from '../ui/FeatureCard';

export default function Features() {
  const innerText = [
    {
      num: '01',
      heading: 'Find any cocktail recipe you like',
      description: `In our all in one platform you can find any cocktial recipe with
    ingredients proportion and instruction detail. You can also add it to
    you save list as you like.`,
    },
    {
      num: '02',
      heading: 'Mix your own with instruction',
      description:
        'We offer the recipes in detial, you can do it your own with the instruction and chill at home. No need to go out and pay expensive outside.',
    },
    {
      num: '03',
      heading: 'Share your masterpiece with your friends',
      description:
        'Take a nice picture and share to all your friends, Invite them to your party and show the mixing skill.',
    },
  ];

  return (
    <div
      className="mx-auto max-w-[75rem] px-8 py-24 lg:py-16 md:py-12 xs:py-8"
      id="features"
    >
      <p className="text-primary paragraph-large 2xs:paragraph-small mb-6 font-bold text-primary-main">
        Features
      </p>
      <p className="display-small mb-24 font-primary font-bold text-black-100 lg:mb-16 md:mb-12">
        All you need to mix a prefect cocktail
      </p>
      <div className="grid grid-cols-2 items-center gap-x-16 gap-y-24 lg:gap-y-16 md:gap-y-12 xs:gap-x-12 2xs:grid-cols-1 2xs:gap-y-12">
        <FeatureCard text={innerText[0]} />
        <img src={app1} alt="recipe feature" className="rounded" />
        <img
          src={app3}
          alt="recipe feature"
          className="rounded 2xs:row-start-4"
        />
        <FeatureCard text={innerText[1]} />
        <FeatureCard text={innerText[2]} />
        <img src={app2} alt="recipe feature" className="rounded " />
      </div>
    </div>
  );
}
