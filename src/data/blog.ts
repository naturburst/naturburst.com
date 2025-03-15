export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  category: string;
  tags: string[];
  imageUrl: string;
  publishDate: string;
  readTime: number; // in minutes
}

// Sample blog post data
export const blogPosts: BlogPost[] = [
  {
    id: "benefits-freeze-dried",
    slug: "benefits-of-freeze-dried-fruits",
    title: "5 Amazing Benefits of Freeze-Dried Fruits",
    excerpt: "Discover why freeze-dried fruits are gaining popularity as a convenient and nutritious snack option.",
    content: `
      <p>In recent years, freeze-dried fruits have surged in popularity, and for good reason. This innovative preservation method offers numerous advantages over traditional dried or processed fruits. Here are five compelling benefits that make freeze-dried fruits an excellent addition to your diet:</p>

      <h2>1. Superior Nutrient Retention</h2>
      <p>Unlike conventional drying methods that use heat, freeze-drying preserves up to 97% of the nutrients found in fresh fruits. The process involves freezing the fruit and then removing the water through sublimation (converting ice directly to vapor without passing through the liquid phase). This gentle process preserves vitamins, minerals, antioxidants, and enzymes that would otherwise be degraded by heat.</p>

      <p>Studies have shown that freeze-dried fruits retain significantly higher levels of vitamin C, antioxidants, and phenolic compounds compared to fruits preserved through other methods. This means you're getting nearly all the nutritional benefits of fresh fruit in a convenient, shelf-stable format.</p>

      <h2>2. Pure, Clean Ingredients</h2>
      <p>One of the most significant advantages of high-quality freeze-dried fruits (like our NatureBurst products) is the absence of additives. There's no need for preservatives, added sugars, or artificial flavors. What you see is exactly what you get – 100% natural fruit and nothing else.</p>

      <p>This purity makes freeze-dried fruits an excellent option for those with dietary restrictions or anyone looking to avoid unnecessary additives in their diet. It's real food, simplified.</p>

      <h2>3. Enhanced Flavor Intensity</h2>
      <p>The freeze-drying process concentrates the natural flavors of fruit, resulting in remarkably vibrant taste. When water is removed, what remains is an intensified version of the fruit's natural flavor profile. Many people are surprised by how much more flavorful freeze-dried fruits can be compared to their fresh counterparts.</p>

      <p>This flavor concentration makes freeze-dried fruits perfect for adding a punch of natural sweetness to various foods like oatmeal, yogurt, or baked goods without needing additional sweeteners.</p>

      <h2>4. Lightweight and Convenient</h2>
      <p>Removing water from fruits reduces their weight by about 90% while maintaining their size and shape. This makes freeze-dried fruits incredibly lightweight and portable – ideal for hiking, traveling, or simply taking to work or school.</p>

      <p>They require no refrigeration and can be stored at room temperature for extended periods without spoiling. This convenience factor makes it easier to incorporate nutritious fruits into your diet, even when fresh options aren't available or practical.</p>

      <h2>5. Long Shelf Life</h2>
      <p>Properly packaged freeze-dried fruits can last up to two years without refrigeration. This extended shelf life helps reduce food waste and ensures you always have healthy snack options on hand.</p>

      <p>The long shelf life is particularly valuable for enjoying out-of-season fruits year-round or stocking up on favorites when they're at their peak ripeness and nutritional value.</p>

      <h2>Ways to Enjoy Freeze-Dried Fruits</h2>
      <p>There are countless ways to incorporate these nutritional powerhouses into your diet:</p>
      <ul>
        <li>Enjoy them straight from the package as a crunchy snack</li>
        <li>Add to morning cereal or overnight oats</li>
        <li>Blend into smoothies for intense fruit flavor</li>
        <li>Mix into trail mix with nuts and seeds</li>
        <li>Use as colorful, flavorful toppings for desserts</li>
        <li>Rehydrate in water for a few minutes to use in recipes</li>
      </ul>

      <p>By incorporating freeze-dried fruits into your diet, you can enjoy the nutritional benefits of fresh fruits in a convenient, long-lasting form. Their versatility, nutritional profile, and delicious taste make them an excellent choice for health-conscious consumers looking for wholesome snack alternatives.</p>
    `,
    author: {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      avatarUrl: "/images/team/founder.jpg"
    },
    category: "Nutrition",
    tags: ["Nutrition", "Health Benefits", "Healthy Snacking"],
    imageUrl: "/images/blog/benefits-freeze-dried.jpg",
    publishDate: "2023-05-15",
    readTime: 6
  },
  {
    id: "freeze-dried-smoothie",
    slug: "ultimate-freeze-dried-smoothie-guide",
    title: "The Ultimate Guide to Freeze-Dried Fruit Smoothies",
    excerpt: "Learn how to create delicious, nutrient-packed smoothies using freeze-dried fruits with these easy recipes and tips.",
    content: `
      <p>Smoothies are a fantastic way to pack nutrients into a delicious, convenient package. While fresh fruits are traditional smoothie ingredients, freeze-dried fruits offer unique advantages that can take your smoothie game to the next level. In this comprehensive guide, we'll explore how to create amazing smoothies using freeze-dried fruits, complete with recipes, tips, and nutritional insights.</p>

      <h2>Why Use Freeze-Dried Fruits in Smoothies?</h2>
      <p>Using freeze-dried fruits in smoothies provides several distinct benefits:</p>
      <ul>
        <li><strong>Intense Flavor:</strong> The concentrated flavor of freeze-dried fruits can give your smoothies a more pronounced fruit taste without diluting the consistency.</li>
        <li><strong>Year-Round Availability:</strong> No more seasonal limitations – enjoy your favorite fruits in smoothies all year round.</li>
        <li><strong>Nutrient Density:</strong> Freeze-dried fruits retain up to 97% of their nutrients, making them nutritionally comparable to fresh fruits.</li>
        <li><strong>Extended Shelf Life:</strong> Keep a variety of freeze-dried fruits on hand without worrying about spoilage.</li>
        <li><strong>Less Food Waste:</strong> Use exactly the amount you need without leftover fresh fruit going bad in your refrigerator.</li>
      </ul>

      <h2>Basic Principles for Freeze-Dried Fruit Smoothies</h2>
      <p>When using freeze-dried fruits in smoothies, keep these key principles in mind:</p>

      <h3>1. Rehydration Options</h3>
      <p>You have two main approaches to using freeze-dried fruits in smoothies:</p>
      <ul>
        <li><strong>Pre-soak Method:</strong> Rehydrate the freeze-dried fruits in a small amount of water or juice for 5-10 minutes before blending. This softens the fruits and can produce a smoother texture.</li>
        <li><strong>Direct Addition Method:</strong> Add the freeze-dried fruits directly to your blender along with extra liquid. The powerful blending action will incorporate the fruits while they rehydrate simultaneously.</li>
      </ul>

      <h3>2. Liquid Ratios</h3>
      <p>When using freeze-dried fruits, you'll typically need to add more liquid than with fresh fruits. A good starting point is an additional 2-3 tablespoons of liquid per 1/4 cup of freeze-dried fruit. Adjust based on your desired consistency.</p>

      <h3>3. Blending Order</h3>
      <p>For optimal results, follow this blending sequence:</p>
      <ol>
        <li>Liquids first (milk, water, juice, etc.)</li>
        <li>Soft ingredients (yogurt, nut butter, etc.)</li>
        <li>Freeze-dried fruits and other dry ingredients</li>
        <li>Ice cubes last (if using)</li>
      </ol>

      <h2>Signature Freeze-Dried Fruit Smoothie Recipes</h2>
      <p>Ready to get blending? Here are three delicious smoothie recipes featuring our NatureBurst freeze-dried fruits:</p>

      <h3>Tropical Paradise Smoothie</h3>
      <p><em>A vibrant, vitamin-rich smoothie featuring our Tropi Mix freeze-dried fruits.</em></p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        <li>1/2 cup NatureBurst Tropi Mix (freeze-dried pineapple, mango, and banana)</li>
        <li>1 cup coconut milk</li>
        <li>1/2 cup Greek yogurt</li>
        <li>1 tablespoon honey or maple syrup (optional)</li>
        <li>1/2 teaspoon vanilla extract</li>
        <li>1 cup ice</li>
      </ul>
      <p><strong>Instructions:</strong></p>
      <ol>
        <li>Add coconut milk, yogurt, sweetener (if using), and vanilla to blender.</li>
        <li>Add the freeze-dried Tropi Mix.</li>
        <li>Blend until combined, then add ice and blend until smooth.</li>
        <li>Pour into a glass and garnish with a sprinkle of additional freeze-dried fruit.</li>
      </ol>

      <h3>Berry Antioxidant Blast</h3>
      <p><em>A nutrient-dense smoothie packed with antioxidants from our Berry Burst blend.</em></p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        <li>1/2 cup NatureBurst Berry Burst (freeze-dried strawberries, blueberries, and raspberries)</li>
        <li>1 cup almond milk</li>
        <li>1 tablespoon chia seeds</li>
        <li>1 tablespoon almond butter</li>
        <li>1/2 frozen banana</li>
        <li>Splash of lemon juice</li>
      </ul>
      <p><strong>Instructions:</strong></p>
      <ol>
        <li>Combine almond milk, chia seeds, and freeze-dried Berry Burst in blender.</li>
        <li>Let sit for 3-5 minutes to allow chia seeds to begin expanding and fruits to partially rehydrate.</li>
        <li>Add remaining ingredients and blend until smooth.</li>
      </ol>

      <h3>Citrus Immune Booster</h3>
      <p><em>A refreshing, vitamin C-rich smoothie perfect for supporting immune health.</em></p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        <li>1/3 cup NatureBurst Citrus Delight (freeze-dried orange, lemon, and lime)</li>
        <li>1 cup orange juice</li>
        <li>1/2 cup vanilla yogurt</li>
        <li>1 tablespoon honey</li>
        <li>1/4 teaspoon turmeric</li>
        <li>Pinch of black pepper</li>
        <li>1 cup ice</li>
      </ul>
      <p><strong>Instructions:</strong></p>
      <ol>
        <li>Add orange juice, yogurt, honey, turmeric, and black pepper to blender.</li>
        <li>Add freeze-dried Citrus Delight and blend until combined.</li>
        <li>Add ice and blend until smooth and frosty.</li>
      </ol>

      <h2>Nutrition Boosters</h2>
      <p>Take your freeze-dried fruit smoothies to the next level by incorporating these nutritional enhancers:</p>
      <ul>
        <li><strong>Protein Options:</strong> Greek yogurt, protein powder, silken tofu</li>
        <li><strong>Healthy Fats:</strong> Avocado, nut butters, chia seeds, flaxseeds</li>
        <li><strong>Superfoods:</strong> Spirulina, matcha powder, maca powder, cacao nibs</li>
        <li><strong>Vegetables:</strong> Fresh spinach, kale, cucumber, frozen cauliflower</li>
      </ul>

      <h2>Troubleshooting Common Issues</h2>
      <p>If your freeze-dried fruit smoothies aren't turning out perfectly, here are some quick fixes:</p>
      <ul>
        <li><strong>Gritty Texture:</strong> Try pre-soaking your freeze-dried fruits or blending longer.</li>
        <li><strong>Too Thick:</strong> Add more liquid in small increments until desired consistency is reached.</li>
        <li><strong>Too Thin:</strong> Add more freeze-dried fruit, a frozen banana, or ice cubes.</li>
        <li><strong>Not Sweet Enough:</strong> Add a natural sweetener like honey, maple syrup, or dates.</li>
      </ul>

      <p>Freeze-dried fruit smoothies offer a convenient, nutritious, and delicious way to enjoy fruits year-round. With these recipes and tips, you can create endless variations to suit your taste preferences and nutritional goals. Experiment with different combinations of our NatureBurst freeze-dried fruit products to discover your perfect blend!</p>
    `,
    author: {
      name: "Alexis Rivera",
      role: "Product Development",
      avatarUrl: "/images/team/product.jpg"
    },
    category: "Recipes",
    tags: ["Recipes", "Smoothies", "Breakfast"],
    imageUrl: "/images/blog/smoothie-guide.jpg",
    publishDate: "2023-06-20",
    readTime: 8
  },
  {
    id: "sustainable-farming",
    slug: "our-commitment-to-sustainable-farming",
    title: "Our Commitment to Sustainable Farming Practices",
    excerpt: "Learn about NatureBurst's partnerships with eco-conscious farmers and our sustainable agriculture initiatives.",
    content: `
      <p>At NatureBurst, our commitment to sustainability goes beyond just creating healthy snacks. We believe that truly nutritious food must be grown in ways that respect and nurture our planet. This post explores our dedication to sustainable farming practices and how we're working to make a positive impact on both human health and environmental wellbeing.</p>

      <h2>Why Sustainable Farming Matters</h2>
      <p>The conventional agricultural system, while productive in the short term, often prioritizes yield over environmental health. This approach has led to significant challenges:</p>
      <ul>
        <li>Soil degradation and erosion</li>
        <li>Water pollution from chemical runoff</li>
        <li>Biodiversity loss</li>
        <li>Increased carbon emissions</li>
        <li>Reduced nutrient density in crops</li>
      </ul>

      <p>At NatureBurst, we recognize that these challenges threaten not only our planet's health but also the long-term viability of our food systems. That's why we've made sustainable agriculture a cornerstone of our business model.</p>

      <h2>Our Sustainable Farming Partners</h2>
      <p>We carefully select farming partners who share our commitment to environmental stewardship. Our partner farms implement various sustainable practices, including:</p>

      <h3>Regenerative Agriculture</h3>
      <p>Several of our fruit suppliers practice regenerative agriculture, which goes beyond sustainability to actively improve soil health and biodiversity. These techniques include:</p>
      <ul>
        <li><strong>Cover cropping:</strong> Growing plants between harvest cycles to prevent erosion and add nutrients to the soil</li>
        <li><strong>Minimal tillage:</strong> Reducing soil disturbance to maintain soil structure and microbial communities</li>
        <li><strong>Crop rotation:</strong> Varying crops in a sequence to improve soil health and reduce pest pressure</li>
        <li><strong>Composting:</strong> Recycling organic matter to build soil fertility naturally</li>
      </ul>

      <h3>Water Conservation</h3>
      <p>Water is a precious resource, particularly in many fruit-growing regions. Our partner farms implement advanced water conservation techniques:</p>
      <ul>
        <li><strong>Drip irrigation:</strong> Delivering water directly to plant roots to minimize waste</li>
        <li><strong>Soil moisture monitoring:</strong> Using technology to irrigate only when necessary</li>
        <li><strong>Rainwater harvesting:</strong> Capturing and storing rainwater for use during dry periods</li>
        <li><strong>Drought-resistant crop varieties:</strong> Selecting plants that require less water</li>
      </ul>

      <h3>Biodiversity Promotion</h3>
      <p>Healthy ecosystems depend on diversity. Our partners work to foster biodiversity through:</p>
      <ul>
        <li><strong>Hedgerows and buffer zones:</strong> Creating habitats for beneficial insects and wildlife</li>
        <li><strong>Pollinator programs:</strong> Maintaining bee-friendly environments essential for fruit production</li>
        <li><strong>Integrated pest management:</strong> Using natural predators and targeted interventions instead of broad-spectrum pesticides</li>
        <li><strong>Native plant conservation:</strong> Preserving local flora alongside agricultural areas</li>
      </ul>

      <h2>Our Direct Impact Initiatives</h2>
      <p>Beyond working with sustainable farms, NatureBurst has implemented several direct initiatives to reduce our environmental footprint:</p>

      <h3>1. Sustainable Packaging Program</h3>
      <p>We've invested in developing compostable packaging materials for our products. Our current packaging is:</p>
      <ul>
        <li>Made from 60% post-consumer recycled materials</li>
        <li>Printed with vegetable-based inks</li>
        <li>Designed to minimize material usage while maintaining product freshness</li>
      </ul>
      <p>By 2024, we aim to have 100% compostable or recyclable packaging across our entire product line.</p>

      <h3>2. Carbon-Neutral Shipping</h3>
      <p>Transportation is a significant source of carbon emissions in the food system. We're addressing this through:</p>
      <ul>
        <li>Partnerships with carbon-neutral shipping providers</li>
        <li>Carbon offset investments for all shipping activities</li>
        <li>Regional distribution centers to minimize shipping distances</li>
        <li>Bulk shipping options that reduce packaging and transportation emissions</li>
      </ul>

      <h3>3. Zero-Waste Processing</h3>
      <p>Our freeze-drying facilities operate on zero-waste principles:</p>
      <ul>
        <li>Fruit trimmings and unsuitable pieces are composted or used for other products</li>
        <li>Water used in processing is filtered and recycled</li>
        <li>Energy-efficient equipment reduces our carbon footprint</li>
        <li>Solar panels provide 40% of the energy for our main processing facility</li>
      </ul>

      <h2>Measuring Our Impact</h2>
      <p>We believe in transparency and accountability in our sustainability efforts. Each year, we conduct a comprehensive environmental impact assessment that measures:</p>
      <ul>
        <li>Carbon footprint across our entire supply chain</li>
        <li>Water usage and conservation metrics</li>
        <li>Waste generation and diversion rates</li>
        <li>Biodiversity impact of our sourcing practices</li>
      </ul>
      <p>These assessments help us identify areas for improvement and set meaningful goals for the future. Our latest impact report is available on our website under the "Sustainability" section.</p>

      <h2>Future Initiatives</h2>
      <p>Our sustainability journey is ongoing. Here are some initiatives we're currently developing:</p>
      <ul>
        <li><strong>Farmer Training Program:</strong> Providing resources and education to help conventional farmers transition to sustainable practices</li>
        <li><strong>Renewable Energy Transition:</strong> Working toward 100% renewable energy for all processing and office facilities by 2025</li>
        <li><strong>Agricultural Research Partnership:</strong> Collaborating with universities to study and improve sustainable fruit production methods</li>
        <li><strong>Community Garden Initiative:</strong> Supporting urban gardening projects in food-insecure communities</li>
      </ul>

      <h2>Join Us in Making a Difference</h2>
      <p>Sustainability is a collaborative effort. Here's how you can be part of the solution:</p>
      <ul>
        <li>Support companies committed to sustainable practices</li>
        <li>Properly dispose of or compost our packaging</li>
        <li>Share feedback and ideas to help us improve</li>
        <li>Learn more about sustainable food systems and advocate for change</li>
      </ul>

      <p>When you choose NatureBurst products, you're not just making a healthy choice for yourself – you're supporting a vision of agriculture that nourishes both people and planet. We're grateful for your partnership in this important mission.</p>

      <p>Have questions about our sustainability practices? We'd love to hear from you! Contact our Sustainability Director, James Washington, at sustainability@natureburst.com.</p>
    `,
    author: {
      name: "James Washington",
      role: "Sustainability Director",
      avatarUrl: "/images/team/sustainability.jpg"
    },
    category: "Sustainability",
    tags: ["Sustainability", "Farming", "Environment"],
    imageUrl: "/images/blog/sustainable-farming.jpg",
    publishDate: "2023-07-10",
    readTime: 7
  }
];

// Helper function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get all blog post slugs (useful for static paths in Next.js)
export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}