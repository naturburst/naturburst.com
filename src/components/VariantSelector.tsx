import React from 'react';
import styled from 'styled-components';
import { ShopifyProduct } from '../utils/shopify-product-utils';

interface VariantSelectorProps {
  product: ShopifyProduct;
  selectedOptions: Record<string, string>;
  onVariantChange: (optionName: string, value: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  selectedOptions,
  onVariantChange
}) => {
  // Only render if product has options beyond the default "Title" option
  if (!product.options || product.options.length <= 1) return null;

  return (
    <Wrapper>
      {product.options.map((option) => {
        // Skip the default Title option which is usually just a placeholder
        if (option.name === 'Title' && option.values.length === 1) return null;

        return (
          <div className="option-container" key={option.name}>
            <h3>{option.name}</h3>
            <div className="option-values">
              {option.values.map((value) => {
                // Determine if this variant is available by checking if any variant
                // with this option value is in stock
                const isAvailable = product.variants.some(
                  variant =>
                    variant.selectedOptions.some(
                      opt => opt.name === option.name && opt.value === value
                    ) && variant.available
                );

                // Calculate whether this option is selected
                const isSelected = selectedOptions[option.name] === value;

                return (
                  <button
                    key={value}
                    className={`option-btn ${isSelected ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`}
                    onClick={() => onVariantChange(option.name, value)}
                    disabled={!isAvailable}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 2rem;

  .option-container {
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--clr-grey-3);
    }
  }

  .option-values {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .option-btn {
    background: white;
    border: 2px solid var(--clr-grey-8);
    color: var(--clr-grey-3);
    font-size: 0.9rem;
    padding: 0.5rem 1.25rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      border-color: var(--clr-primary-5);
      transform: translateY(-2px);
    }

    &.selected {
      background: var(--clr-primary-5);
      color: white;
      border-color: var(--clr-primary-5);
    }

    &.unavailable {
      opacity: 0.5;
      text-decoration: line-through;
      cursor: not-allowed;
    }
  }
`;

export default VariantSelector;