// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes, FaHome, FaShoppingBag, FaQuestionCircle, FaPhone, FaUser, FaHeart } from 'react-icons/fa';
import whiteLogo from '../../assets/logo_white.jpg'
import { useProductsContext } from '../../context/products_context';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useProductsContext();
  const location = useLocation();

  return (
    <SidebarContainer>
      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <div className="sidebar-header">
          <img 
            src={whiteLogo}
            alt="NatureBurst"
            className="logo"
          />
          <button type="button" className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">
          <ul className="main-links">
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
                onClick={closeSidebar}
              >
                <FaHome className="icon" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={location.pathname.includes('/products') ? 'active' : ''}
                onClick={closeSidebar}
              >
                <FaShoppingBag className="icon" />
                <span>Shop</span>
              </Link>
            </li>
            <li>
              <Link
                to="/how-to-use"
                className={location.pathname === '/how-to-use' ? 'active' : ''}
                onClick={closeSidebar}
              >
                <FaQuestionCircle className="icon" />
                <span>How to Use</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === '/contact' ? 'active' : ''}
                onClick={closeSidebar}
              >
                <FaPhone className="icon" />
                <span>Contact</span>
              </Link>
            </li>
          </ul>

          <div className="divider"></div>

          <div className="sidebar-contact">
            <h3>Contact Us</h3>
            <p>Need help? We're just a click away!</p>
            <Link to="/contact" className="contact-btn" onClick={closeSidebar}>
              Get in Touch
            </Link>
          </div>
        </div>
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: all 0.3s ease-in-out;
    transform: translateX(-100%);
    z-index: 999;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .show-sidebar {
    transform: translateX(0);
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1.5rem;
    border-bottom: 1px solid var(--clr-grey-9);

    .logo {
      height: 60px; /* Increased from default size */
      width: auto; /* Maintain aspect ratio */
    }
    
    .close-btn {
      background: transparent;
      border: none;
      color: var(--clr-grey-5);
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        color: var(--clr-primary-5);
        transform: scale(1.1);
      }
    }
  }
  
  .sidebar-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
  }
  
  .main-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    li {
      a {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        border-radius: var(--radius);
        transition: all 0.3s ease;
        color: var(--clr-grey-3);
        font-weight: 500;
        
        .icon {
          margin-right: 1rem;
          font-size: 1.2rem;
          color: var(--clr-grey-5);
          transition: all 0.3s ease;
        }
        
        &:hover, &.active {
          background: var(--clr-primary-10);
          color: var(--clr-primary-5);
          
          .icon {
            color: var(--clr-primary-5);
          }
        }
        
        &.active {
          font-weight: 600;
        }
      }
    }
  }
  
  .divider {
    height: 1px;
    background: var(--clr-grey-9);
    margin: 0.5rem 0;
  }
  
  .category-links {
    h3 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: var(--clr-grey-3);
    }
    
    ul {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      
      li a {
        display: block;
        padding: 0.5rem 1rem;
        color: var(--clr-grey-5);
        transition: all 0.3s ease;
        border-left: 3px solid transparent;
        
        &:hover {
          color: var(--clr-primary-5);
          background: var(--clr-primary-10);
          border-left-color: var(--clr-primary-5);
          padding-left: 1.5rem;
        }
      }
    }
  }
  
  .account-links {
    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      li a {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        border-radius: var(--radius);
        transition: all 0.3s ease;
        color: var(--clr-grey-3);
        
        .icon {
          margin-right: 1rem;
          font-size: 1.2rem;
          color: var(--clr-grey-5);
          transition: all 0.3s ease;
        }
        
        &:hover {
          background: var(--clr-primary-10);
          color: var(--clr-primary-5);
          
          .icon {
            color: var(--clr-primary-5);
          }
        }
      }
    }
  }
  
  .sidebar-contact {
    margin-top: auto;
    padding: 1.5rem;
    background: var(--clr-primary-10);
    border-radius: var(--radius);
    text-align: center;
    
    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: var(--clr-primary-1);
    }
    
    p {
      color: var(--clr-grey-5);
      margin-bottom: 1rem;
    }
    
    .contact-btn {
      display: inline-block;
      background: var(--clr-primary-5);
      color: var(--clr-white);
      padding: 0.6rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--clr-primary-3);
        transform: translateY(-2px);
      }
    }
  }
  
  @media (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;