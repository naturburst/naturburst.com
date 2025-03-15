# NatureBurst Website

This is the official website for NatureBurst, a company specializing in premium freeze-dried fruit products under the Tropi Treats brand.

## Features

- Responsive design optimized for all devices
- SEO-friendly Next.js structure
- TypeScript for improved code quality and developer experience
- Interactive UI with Framer Motion animations
- Easy content management (product and blog data can be updated in data files)
- E-commerce ready product listings and detail pages
- Blog with article listings and detailed content pages

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: CSS Modules
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/natureburst-website.git
cd natureburst-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
natureburst-website/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # Layout components (Header, Footer)
│   │   ├── ui/         # UI components (Button, Card, etc.)
│   │   └── shop/       # Shop-specific components
│   ├── data/           # Data files for products and blog posts
│   ├── pages/          # Next.js pages
│   │   ├── shop/       # Shop pages
│   │   └── blog/       # Blog pages
│   └── styles/         # CSS styles
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

## Deployment

The site is configured for seamless deployment with Vercel. Connect your Vercel account to your GitHub repository for automatic deployments on commits to the main branch.

### Manual Deployment

```bash
npm run build
# or
yarn build
```

## Customization

### Adding New Products

To add new products, edit the `src/data/products.ts` file and add a new product object to the `products` array.

### Adding Blog Posts

To add new blog posts, edit the `src/data/blog.ts` file and add a new blog post object to the `blogPosts` array.

### Modifying Styles

Global styles are defined in `src/styles/globals.css`. Component-specific styles are in their respective CSS Module files in the `src/styles` directory.

## Future Enhancements

- Full e-commerce functionality (cart, checkout)
- User accounts and authentication
- Admin dashboard for content management
- Product filtering and sorting
- Newsletter signup functionality
- Internationalization for multiple languages

## License

[MIT](LICENSE)

## Contact

For any questions or feedback, please reach out to [contact@natureburst.com](mailto:contact@natureburst.com).