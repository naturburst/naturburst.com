// src/utils/constants.tsx
import React from 'react';
import { FaLeaf, FaRegSun, FaUtensils } from 'react-icons/fa';
import { GiFruitBowl } from 'react-icons/gi';
import { RiHealthBookLine } from 'react-icons/ri';
import { MdAccessTime } from 'react-icons/md';

export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'shop',
    url: '/products',
  },
  {
    id: 3,
    text: 'how to use',
    url: '/how-to-use',
  },
  {
    id: 4,
    text: 'contact',
    url: '/contact',
  },
];

export const services = [
  {
    id: 1,
    icon: <FaLeaf />,
    title: '100% natural',
    text: 'Our freeze-dried fruits contain absolutely no additives, preservatives, or added sugars. Just pure fruit, exactly as nature intended.',
  },
  {
    id: 2,
    icon: <GiFruitBowl />,
    title: 'nutrient-rich',
    text: 'Our gentle freeze-drying process preserves up to 97% of the nutrients found in fresh fruit, ensuring you get all the vitamins and antioxidants.',
  },
  {
    id: 3,
    icon: <RiHealthBookLine />,
    title: 'lifestyle friendly',
    text: 'Whether you follow a vegan, paleo, keto, or gluten-free diet, our products fit perfectly into your healthy lifestyle choices.',
  },
  {
    id: 4,
    icon: <FaRegSun />,
    title: 'sustainably sourced',
    text: 'We partner with sustainable farms to source the highest quality fruits while supporting responsible agricultural practices.',
  },
  {
    id: 5,
    icon: <MdAccessTime />,
    title: 'extended shelf life',
    text: 'Enjoy your favorite fruits any time of year. Our freeze-dried products stay fresh without refrigeration while retaining their natural flavor and nutrients.',
  },
  {
    id: 6,
    icon: <FaUtensils />,
    title: 'versatile usage',
    text: 'Perfect for snacking, baking, smoothies, or as toppings. Our freeze-dried fruits maintain their shape and color while adding intense flavor to any recipe.',
  },
];

// Use a dummy local URL to avoid CORS issues during development
// When you have a proper Sanity project, replace this with your real endpoint
export const API_ENDPOINT = 'http://localhost:3001/api/dummy'; // This will intentionally fail and use sample data

export const QUERY = `
{
  allProduct {
    _id
    name
    slug {
      current
    }
    brand
    categories {
      categories
    }
    price
    stock
    weight
    ingredients
    nutritionalInfo {
      calories
      fat
      carbs
      protein
    }
    itemDescription
    tastingNotes
    storageInstructions
    featured
    images {
      asset {
        url
      }
    }
  }
}
`;