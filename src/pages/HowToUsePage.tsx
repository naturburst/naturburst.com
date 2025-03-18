// src/pages/HowToUsePage.tsx
import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import { FaBlender, FaIceCream, FaUtensils, FaHiking, FaDumbbell } from 'react-icons/fa';

const HowToUsePage = () => {
  return (
    <main>
      <PageHero title="how to use" />
      <Wrapper className="page section section-center">
        <div className="header">
          <h2>Creative Ways to Enjoy Freeze-Dried Fruits</h2>
          <p className="subtitle">
            Our premium freeze-dried fruits are incredibly versatile and can enhance many of your favorite foods and drinks.
            Here are some delicious ways to incorporate them into your daily routine!
          </p>
        </div>

        <div className="illustration-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
            {/* Background elements */}
            <rect width="800" height="500" fill="#f8f9fa" />
            <circle cx="120" cy="100" r="80" fill="#e6f7ed" />
            <circle cx="700" cy="400" r="100" fill="#e6f7ed" />
            <circle cx="400" cy="50" r="30" fill="#d1ede0" />
            <circle cx="650" cy="150" r="40" fill="#d1ede0" />

            {/* Improved Blender/Smoothie Section */}
            <g transform="translate(150, 150)">
              {/* Blender Base - thicker outlines */}
              <rect x="20" y="170" width="100" height="30" rx="5" fill="#429460" stroke="#333" strokeWidth="1.5" />
              <rect x="35" y="160" width="70" height="15" rx="2" fill="#3c8957" stroke="#333" strokeWidth="1" />

              {/* Blender Container - improved transparency and outlines */}
              <path d="M35,50 L105,50 L115,160 L25,160 Z" fill="#b3dcc5" fillOpacity="0.8" />
              <path d="M35,50 L105,50 L115,160 L25,160 Z" fill="none" stroke="#333" strokeWidth="2" />

              {/* Blender Top */}
              <rect x="30" y="40" width="80" height="10" rx="2" fill="#429460" stroke="#333" strokeWidth="1" />
              <circle cx="70" cy="30" r="10" fill="#429460" stroke="#333" strokeWidth="1" />

              {/* Smoothie Content */}
              <path d="M35,70 L105,70 L110,140 L30,140 Z" fill="#9c51b6" fillOpacity="0.9" />

              {/* Fruit elements in smoothie - larger, more distinct */}
              <circle cx="55" cy="90" r="9" fill="#50b848" stroke="#333" strokeWidth="0.5" />
              <circle cx="85" cy="100" r="7" fill="#d4af37" stroke="#333" strokeWidth="0.5" />
              <circle cx="65" cy="110" r="8" fill="#8e44ad" stroke="#333" strokeWidth="0.5" />

              {/* Label with bolder text */}
              <text x="70" y="225" textAnchor="middle" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#333">Smoothies</text>
            </g>

            {/* Improved Yogurt/Dessert Topping Section */}
            <g transform="translate(330, 150)">
              {/* Bowl with clearer outline */}
              <ellipse cx="70" cy="150" rx="60" ry="20" fill="#3c8957" />
              <path d="M10,150 C10,120 40,80 70,80 C100,80 130,120 130,150" fill="#f5f5f5" stroke="#333" strokeWidth="2" />

              {/* Yogurt - slightly off-white for better contrast */}
              <ellipse cx="70" cy="150" rx="50" ry="15" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />

              {/* Freeze-dried Fruit Toppings - larger and more visible */}
              <circle cx="50" cy="140" r="6" fill="#50b848" stroke="#333" strokeWidth="0.5" />
              <circle cx="60" cy="135" r="7" fill="#d4af37" stroke="#333" strokeWidth="0.5" />
              <circle cx="75" cy="138" r="6" fill="#8e44ad" stroke="#333" strokeWidth="0.5" />
              <circle cx="90" cy="142" r="5" fill="#50b848" stroke="#333" strokeWidth="0.5" />
              <circle cx="85" cy="132" r="4" fill="#8e44ad" stroke="#333" strokeWidth="0.5" />
              <circle cx="45" cy="130" r="5" fill="#d4af37" stroke="#333" strokeWidth="0.5" />

              {/* Spoon with better definition */}
              <path d="M120,120 C130,100 140,90 150,85 C140,95 130,105 120,120" fill="#d0d0d0" stroke="#999" strokeWidth="1.5" />

              {/* Label with bolder text */}
              <text x="70" y="190" textAnchor="middle" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#333">Dessert Toppings</text>
            </g>

            {/* Improved Trail Mix Section */}
            <g transform="translate(510, 150)">
              {/* Trail Mix Container with clearer outline */}
              <rect x="20" y="90" width="100" height="80" rx="10" fill="#f5f5f5" stroke="#333" strokeWidth="2" />

              {/* Trail Mix Content */}
              <ellipse cx="70" cy="150" rx="45" ry="10" fill="#e0c088" stroke="#c0a068" strokeWidth="1" />

              {/* Mix Elements - Better defined */}
              {/* Nuts with outlines for clarity */}
              <ellipse cx="40" cy="140" rx="8" ry="6" fill="#b57b53" stroke="#956b43" strokeWidth="1" transform="rotate(30 40 140)" />
              <ellipse cx="60" cy="145" rx="7" ry="5" fill="#b57b53" stroke="#956b43" strokeWidth="1" transform="rotate(-20 60 145)" />
              <ellipse cx="85" cy="142" rx="9" ry="6" fill="#b57b53" stroke="#956b43" strokeWidth="1" transform="rotate(15 85 142)" />

              {/* Seeds with slight outline */}
              <circle cx="50" cy="135" r="3" fill="#f8f8f0" stroke="#e0e0d0" strokeWidth="0.5" />
              <circle cx="73" cy="137" r="2" fill="#f8f8f0" stroke="#e0e0d0" strokeWidth="0.5" />
              <circle cx="92" cy="134" r="3" fill="#f8f8f0" stroke="#e0e0d0" strokeWidth="0.5" />
              <circle cx="35" cy="132" r="2" fill="#f8f8f0" stroke="#e0e0d0" strokeWidth="0.5" />

              {/* Freeze-dried Fruits with clear outlines */}
              <circle cx="45" cy="125" r="6" fill="#50b848" stroke="#333" strokeWidth="0.5" />
              <circle cx="65" cy="123" r="7" fill="#d4af37" stroke="#333" strokeWidth="0.5" />
              <circle cx="80" cy="127" r="6" fill="#8e44ad" stroke="#333" strokeWidth="0.5" />
              <circle cx="55" cy="118" r="5" fill="#50b848" stroke="#333" strokeWidth="0.5" />

              {/* Label with bolder text */}
              <text x="70" y="190" textAnchor="middle" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#333">Trail Mix</text>
            </g>

            {/* Enhanced Title with shadow for better readability */}
            <text x="400" y="50" textAnchor="middle" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#3c8957" stroke="#fff" strokeWidth="0.7" paintOrder="stroke">Creative Ways to Enjoy freeze-dried Fruits</text>

          </svg>
        </div>

        <div className="usage-section">
          <UsageCard
            icon={<FaBlender />}
            title="Smoothies & Shakes"
            description="Add our freeze-dried fruits to your smoothies and shakes for an intense burst of flavor and a nutritional boost. They blend perfectly and dissolve to create a smooth texture with vibrant taste."
            instructions={[
              "Add 1-2 tablespoons to your blender",
              "Great with yogurt, milk, or plant-based alternatives",
              "Blends instantly - no need to rehydrate first"
            ]}
          />

          <UsageCard
            icon={<FaIceCream />}
            title="Dessert Toppings"
            description="Sprinkle over ice cream, yogurt, oatmeal, or cereal for a delightful crunch and natural sweetness. The vivid colors make any dessert look spectacular!"
            instructions={[
              "Crush slightly for a more even distribution",
              "Try mixing with nuts for contrasting textures",
              "Perfect for decorating cakes and cupcakes"
            ]}
          />

          <UsageCard
            icon={<FaUtensils />}
            title="Baking & Cooking"
            description="Incorporate into your baking for colorful, flavorful additions to muffins, pancakes, cookies, and more. The freeze-dried texture means they won't add excess moisture to your recipes."
            instructions={[
              "Fold gently into batters and doughs",
              "Can be powdered for natural food coloring",
              "Use as-is or rehydrate depending on your recipe"
            ]}
          />

          <UsageCard
            icon={<FaHiking />}
            title="Trail Mix & Snacks"
            description="Create your own custom trail mix with nuts, seeds, and our freeze-dried fruits. The light weight makes them perfect for hiking, traveling, or just enjoying as a healthy snack any time."
            instructions={[
              "Mix with nuts and dark chocolate for a balanced energy boost",
              "Store in small containers for portion control",
              "Perfect on-the-go snack for kids and adults"
            ]}
          />

          <UsageCard
            icon={<FaDumbbell />}
            title="Pre & Post Workout"
            description="Enjoy as a quick energy source before workouts or as a natural recovery snack afterward. The natural sugars provide instant energy while the nutrients support recovery."
            instructions={[
              "Eat directly from the package for convenience",
              "Pair with protein for post-workout recovery",
              "Lightweight alternative to fresh fruit at the gym"
            ]}
          />
        </div>

        <div className="tips-section">
          <h3>Pro Tips for Best Results</h3>
          <ul className="tips-list">
            <li>
              <strong>Storage:</strong> Always reseal the package properly and store in a cool, dry place to maintain the crisp texture.
            </li>
            <li>
              <strong>Rehydration:</strong> For some recipes, you may want to rehydrate the fruits. Simply soak in warm water for 5-10 minutes until they reach your desired texture.
            </li>
            <li>
              <strong>Powdering:</strong> Use a food processor or spice grinder to create fruit powders that can be used as natural food coloring or flavor enhancers.
            </li>
            <li>
              <strong>Pairing:</strong> Our freeze-dried fruits pair exceptionally well with dairy, chocolate, and nuts, creating a perfect balance of flavors and textures.
            </li>
          </ul>
        </div>

        <div className="recipe-idea">
          <h3>Featured Recipe: Tropical Breakfast Parfait</h3>
          <div className="recipe-content">
            <div className="ingredients">
              <h4>Ingredients:</h4>
              <ul>
                <li>½ cup Greek yogurt</li>
                <li>¼ cup granola</li>
                <li>1 tbsp honey</li>
                <li>2 tbsp Freeze-Dried Jackfruit</li>
                <li>1 tbsp Freeze-Dried Custard Apple</li>
                <li>Optional: fresh mint for garnish</li>
              </ul>
            </div>
            <div className="instructions">
              <h4>Instructions:</h4>
              <ol>
                <li>Layer Greek yogurt in the bottom of a glass or bowl</li>
                <li>Add a layer of granola</li>
                <li>Sprinkle freeze-dried fruits on top</li>
                <li>Drizzle with honey</li>
                <li>Repeat layers as desired</li>
                <li>Enjoy immediately for maximum crunch!</li>
              </ol>
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

// Usage Card Component for displaying each use case
interface UsageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  instructions: string[];
}

const UsageCard = ({ icon, title, description, instructions }: UsageCardProps) => {
  return (
    <div className="usage-card">
      <div className="card-header">
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
      </div>
      <p className="description">{description}</p>
      <ul className="instructions">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
};

const Wrapper = styled.section`
  .header {
    text-align: center;
    margin-bottom: 3rem;

    h2 {
      color: var(--clr-primary-3);
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    .subtitle {
      max-width: 800px;
      margin: 0 auto;
      color: var(--clr-grey-5);
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }

  // SVG illustration container styling with improved shadow
  .illustration-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto 4rem;
    border-radius: var(--radius);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    background: var(--clr-white);
    border: 1px solid rgba(0, 0, 0, 0.05);

    // Scale SVG responsively while maintaining aspect ratio
    svg {
      width: 100%;
      height: auto;
      display: block;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }

  // Fixed usage cards to ensure equal height and consistent display
  .usage-section {
    display: grid;
    gap: 2rem;
    margin-bottom: 4rem;
    grid-template-columns: 1fr; // Default for mobile

    .usage-card {
      background: var(--clr-white);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s linear;
      height: 100%; // Ensure same height within a row
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }

      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        .icon {
          font-size: 2rem;
          color: var(--clr-primary-5);
          margin-right: 1rem;
          display: flex;
        }

        h3 {
          margin-bottom: 0;
          color: var(--clr-primary-1);
          font-size: 1.4rem;
        }
      }

      .description {
        color: var(--clr-grey-5);
        margin-bottom: 1.5rem;
        line-height: 1.6;
        flex-grow: 1; // Allow description to take available space
      }

      .instructions {
        list-style: disc;
        padding-left: 1.5rem;
        color: var(--clr-grey-3);

        li {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  .tips-section {
    background: var(--clr-primary-10);
    padding: 2rem;
    border-radius: var(--radius);
    margin-bottom: 3rem;
    border-left: 3px solid var(--clr-primary-5); // Added visual accent

    h3 {
      color: var(--clr-primary-1);
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .tips-list {
      display: grid;
      gap: 1rem;

      li {
        color: var(--clr-grey-3);
        line-height: 1.6;

        strong {
          color: var(--clr-primary-5);
        }
      }
    }
  }

  .recipe-idea {
    background: var(--clr-white);
    padding: 2rem;
    border-radius: var(--radius);
    border-left: 5px solid var(--clr-primary-5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    h3 {
      color: var(--clr-primary-3);
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      text-align: center;
    }

    .recipe-content {
      display: grid;
      gap: 2rem;

      h4 {
        color: var(--clr-primary-5);
        margin-bottom: 1rem;
      }

      ul, ol {
        padding-left: 1.5rem;
        color: var(--clr-grey-3);

        li {
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  /* Responsive adjustments with equal-height cards */
  @media (min-width: 768px) {
    .usage-section {
      grid-template-columns: repeat(2, 1fr);
    }

    .recipe-content {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .usage-section {
      grid-template-columns: repeat(3, 1fr);

      // Modified to create a better balanced layout
      .usage-card:nth-child(4), .usage-card:nth-child(5) {
        grid-column: span 1; // Each spans only 1 column for equal sizing
      }

      // The last row containing the 4th and 5th cards is centered
      .usage-card:nth-child(4) {
        grid-column: 1 / 2;
      }

      .usage-card:nth-child(5) {
        grid-column: 2 / 3;
      }
    }
  }

  @media (min-width: 1200px) {
    .usage-section {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default HowToUsePage;