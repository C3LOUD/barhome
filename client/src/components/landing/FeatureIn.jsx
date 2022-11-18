import React from 'react';

import techcrunch from '../../assets/logos/techcrunch.png';
import BusinessInsider from '../../assets/logos/business-insider.png';
import theNewYorkTimes from '../../assets/logos/the-new-york-times.png';
import forbes from '../../assets/logos/forbes.png';
import usaToday from '../../assets/logos/usa-today.png';

const FeatureIn = () => {
  return (
    <div className="mx-auto mt-12 mb-8 max-w-[75rem] px-8">
      <p className="text-primary paragraph-small mb-6 text-center font-bold text-primary-main/60">
        As featured in
      </p>
      <div className="flex justify-around 2xs:grid 2xs:grid-cols-6 2xs:justify-items-center 2xs:gap-x-2 2xs:gap-y-4">
        <img
          className="h-8 opacity-50 brightness-0 md:h-6 xs:h-4 2xs:col-span-2"
          src={techcrunch}
          alt="Techcrunch logo"
        />
        <img
          className="h-8 opacity-50 brightness-0 md:h-6 xs:h-4 2xs:col-span-2"
          src={BusinessInsider}
          alt="Business Insider logo"
        />
        <img
          className="h-8 opacity-50 brightness-0 md:h-6 xs:h-4 2xs:col-span-2"
          src={theNewYorkTimes}
          alt="The New York Times logo"
        />
        <img
          className="h-8 opacity-50 brightness-0 md:h-6 2xs:col-span-3"
          src={forbes}
          alt="Forbes logo"
        />
        <img
          className="h-8 opacity-50 brightness-0 md:h-6 xs:h-4 2xs:col-span-3"
          src={usaToday}
          alt="USA Today logo"
        />
      </div>
    </div>
  );
};

export default FeatureIn;
