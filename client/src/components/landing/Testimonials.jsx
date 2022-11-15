import React from 'react';

import gallery1 from '../../assets/gallery/gallery-1.jpg';
import gallery10 from '../../assets/gallery/gallery-10.jpg';
import gallery11 from '../../assets/gallery/gallery-11.jpg';
import gallery12 from '../../assets/gallery/gallery-12.jpg';
import gallery2 from '../../assets/gallery/gallery-2.jpg';
import gallery3 from '../../assets/gallery/gallery-3.jpg';
import gallery4 from '../../assets/gallery/gallery-4.jpg';
import gallery5 from '../../assets/gallery/gallery-5.jpg';
import gallery6 from '../../assets/gallery/gallery-6.jpg';
import gallery7 from '../../assets/gallery/gallery-7.jpg';
import gallery8 from '../../assets/gallery/gallery-8.jpg';
import gallery9 from '../../assets/gallery/gallery-9.jpg';
import customer9 from '../../assets/customers/customer-9.jpg';
import customer3 from '../../assets/customers/customer-3.jpg';
import customer11 from '../../assets/customers/customer-11.jpg';
import customer8 from '../../assets/customers/customer-8.jpg';
import GalleryImage from '../ui/GalleryImage';
import TestimonialCard from '../ui/TestimonialCard';

const Testimonials = () => {
  const testimonialData = [
    {
      imgSrc: customer9,
      text: `You won't regret it. Barhome is worth much more than I paid. It's just amazing.`,
      name: 'Joe Johnson',
    },
    {
      imgSrc: customer3,
      text: `I like barhome more and more each day because it makes my life a lot easier. I have gotten at least 50 times the value from barhome.`,
      name: 'Jazmine Winkler',
    },
    {
      imgSrc: customer8,
      text: `I am completely blown away. Needless to say we are extremely satisfied with the results. It's really wonderful.`,
      name: 'Karen Harder',
    },
    {
      imgSrc: customer11,
      text: `No matter where you go, barhome is the coolest, most happening thing around! I could probably go into sales for you. I will refer everyone I know. Very easy to use.`,
      name: 'Albert Watson',
    },
  ];

  return (
    <div className="grid grid-cols-2 items-center" id="testimonials">
      <div className="px-24 py-24">
        <p className="text-primary text-accent-dark-tint-700 paragraph-large font-bold mb-6">
          Testimonials
        </p>
        <p className="display-small font-primary font-bold text-white-100 mb-24">
          You can easily do it on your own
        </p>
        <div className="grid grid-cols-2 gap-x-12 gap-y-20">
          {testimonialData.map((el, i) => (
            <TestimonialCard data={el} key={i} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 px-4 py-4 gap-4">
        <GalleryImage imgSrc={gallery1} />
        <GalleryImage imgSrc={gallery2} />
        <GalleryImage imgSrc={gallery3} />
        <GalleryImage imgSrc={gallery4} />
        <GalleryImage imgSrc={gallery5} />
        <GalleryImage imgSrc={gallery6} />
        <GalleryImage imgSrc={gallery7} />
        <GalleryImage imgSrc={gallery8} />
        <GalleryImage imgSrc={gallery9} />
        <GalleryImage imgSrc={gallery10} />
        <GalleryImage imgSrc={gallery11} />
        <GalleryImage imgSrc={gallery12} />
      </div>
    </div>
  );
};

export default Testimonials;
