import React from 'react';

import techcrunch from '../../assets/logos/techcrunch.png';
import BusinessInsider from '../../assets/logos/business-insider.png';
import theNewYorkTimes from '../../assets/logos/the-new-york-times.png';
import forbes from '../../assets/logos/forbes.png';
import usaToday from '../../assets/logos/usa-today.png';

const FeatureIn = () => {
  return (
    <div className="max-w-[75rem] px-8 mx-auto mt-12 mb-8">
      <p className="text-primary text-primary-main/60 paragraph-small font-bold text-center mb-6">
        As featured in
      </p>
      <div className="flex justify-around">
        <img
          className="h-8 brightness-0 opacity-50"
          src={techcrunch}
          alt="Techcrunch logo"
        />
        <img
          className="h-8 brightness-0 opacity-50 "
          src={BusinessInsider}
          alt="Business Insider logo"
        />
        <img
          className="h-8 brightness-0 opacity-50 "
          src={theNewYorkTimes}
          alt="The New York Times logo"
        />
        <img
          className="h-8 brightness-0 opacity-50 "
          src={forbes}
          alt="Forbes logo"
        />
        <img
          className="h-8 brightness-0 opacity-50 "
          src={usaToday}
          alt="USA Today logo"
        />
      </div>
    </div>
  );
};

export default FeatureIn;
