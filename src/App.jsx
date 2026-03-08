import React, { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CorporateProfile from './components/CorporateProfile';
import ProductCatalog from './components/ProductCatalog';
import Infrastructure from './components/Infrastructure';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PlaceholderPage from './components/PlaceholderPage';
import AboutPage from './components/AboutPage';
import PrinciplesPage from './components/PrinciplesPage';
import BlogPage from './components/BlogPage';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import BrandsTicker from './components/BrandsTicker';
import ScrollReveal from './components/ScrollReveal';
import CustomCursor from './components/CustomCursor';
import './styles/animations.css';
import dbData from './data/db.json';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubtype, setActiveSubtype] = useState(null);
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('currentPage') || 'HOME');
  const [productsList, setProductsList] = useState(dbData.catalog || []);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('adminUser')));

  useEffect(() => {
    sessionStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('adminUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('adminUser');
    }
  }, [user]);

  const navLinks = [
    { name: 'HOME', hasDropdown: false },
    { name: 'ABOUT US', hasDropdown: false },
    { name: 'PRINCIPLES', hasDropdown: false },
    {
      name: 'PRODUCT',
      hasDropdown: true,
      subItems: [
        'Silicone Inks',
        'Oilbase Non PVC',
        'Specialitys',
        'Waterbase Pigments',
        'Eco friendly water based textile inks'
      ]
    },
    { name: 'INSIGHTS', hasDropdown: false },
    { name: 'CONTACT US', hasDropdown: false },
  ];

  // Hero Slider Data
  const scrollToSection = (sectionId, fallbackPage) => {
    if (currentPage !== 'HOME') {
      navigateTo('HOME');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slides = [
    {
      title: "Welcome to Sterling Dyes Chem",
      subtitle: "Manufacturing world-class Dyestuffs and Specialty Chemicals for the global textile and ink industries.",
      cta: "Quality Products",
      image: `${import.meta.env.BASE_URL}images/hero_sdc.png`,
      textColor: "#ffffff",
      subtitleColor: "#ffffff",
      action: () => navigateTo('PRODUCT')
    },
    {
      title: "Sustainable Chemical Solutions",
      subtitle: "Leading the way in eco-friendly chemical manufacturing and green chemistry innovations.",
      cta: "Go Green",
      image: `${import.meta.env.BASE_URL}images/hero_sustainable.png`,
      textColor: "#ffffff",
      subtitleColor: "rgba(255, 255, 255, 0.9)",
      action: () => scrollToSection('certification-section', 'HOME')
    },
    {
      title: "Global Reach & Performance",
      subtitle: "Delivering high-performance, tailored chemical solutions for modern manufacturing challenges worldwide.",
      cta: "Contact Us",
      image: `${import.meta.env.BASE_URL}images/hero_pioneer.jpg`,
      textColor: "#ffffff",
      subtitleColor: "#ffffff",
      action: () => scrollToSection('contact-section', 'HOME')
    }
  ];

  const categories = ['All', ...productsList.map(c => c.brand)];
  const filteredProducts = activeCategory === 'All' ? productsList : productsList.filter(c => c.brand === activeCategory);

  useEffect(() => {
    const handleSetCategory = (e) => {
      setActiveCategory(e.detail);
      setActiveSubtype(null);
      window.scrollTo(0, 0);
    };
    const handleSetSubtype = (e) => {
      setActiveSubtype(e.detail);
      window.scrollTo(0, 0);
    };
    window.addEventListener('setCategory', handleSetCategory);
    window.addEventListener('setSubtype', handleSetSubtype);

    // Global error logger to help debug white screen on GitHub Pages
    window.onerror = function (msg, url, line, col, error) {
      console.log('UNCAUGHT ERROR:', msg, 'at', url, ':', line, ':', col);
    };

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      fetchProducts();
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('setCategory', handleSetCategory);
      window.removeEventListener('setSubtype', handleSetSubtype);
      clearInterval(slideInterval);
    };
  }, [slides.length]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/catalog');
      const data = await response.json();
      setProductsList(data);
    } catch (err) {
      console.error("Failed to fetch catalog:", err);
      setProductsList(dbData.catalog || []);
    }
  };

  const handleAddProduct = async (product, subtypeName) => {
    try {
      const category = productsList.find(c => c.brand === product.category);
      if (!category) return;

      const newProduct = { ...product, id: 'p_' + Date.now().toString() };

      let subtypes = category.subtypes || [];
      const subtypeIndex = subtypes.findIndex(s => s.name === subtypeName);

      if (subtypeIndex !== -1) {
        subtypes[subtypeIndex] = {
          ...subtypes[subtypeIndex],
          products: [...(subtypes[subtypeIndex].products || []), newProduct]
        };
      } else {
        // Create new subtype if it doesn't exist
        subtypes.push({
          id: 'sub_' + Date.now().toString(),
          name: subtypeName || product.name,
          image: product.image,
          description: product.app,
          products: [newProduct]
        });
      }

      const updatedCategory = {
        ...category,
        subtypes: subtypes
      };

      const response = await fetch(`http://localhost:5000/catalog/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory)
      });
      if (response.ok) fetchProducts();
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  const handleDeleteProduct = async (productId, categoryBrand, subtypeId) => {
    try {
      const category = productsList.find(c => c.brand === categoryBrand);
      if (!category) return;

      const subtypes = (category.subtypes || []).map(sub => {
        if (sub.id === subtypeId) {
          return {
            ...sub,
            products: (sub.products || []).filter(p => p.id !== productId)
          };
        }
        return sub;
      });

      const updatedCategory = {
        ...category,
        subtypes: subtypes
      };

      const response = await fetch(`http://localhost:5000/catalog/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory)
      });
      if (response.ok) fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomCursor />
      <div className="min-h-screen text-[#000158] font-sans selection:bg-[#000158] selection:text-[#ffffff]" style={{ overflowX: 'hidden' }}>

        {/* Hide navbar on Login page for clean UI */}
        {currentPage !== 'LOGIN' && (
          <Navbar
            isScrolled={isScrolled}
            currentPage={currentPage}
            navLinks={navLinks}
            navigateTo={navigateTo}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}

        {/* --- PAGE CONTENT ROUTER --- */}
        {currentPage === 'HOME' && (
          <>
            <Hero
              slides={slides}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
            />

            <CorporateProfile />

            <ScrollReveal>
              <ProductCatalog
                isHomePage={true}
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeSubtype={activeSubtype}
                setActiveSubtype={setActiveSubtype}
                filteredProducts={filteredProducts}
              />
            </ScrollReveal>

            <Infrastructure />

            <ScrollReveal>
              <BrandsTicker />
            </ScrollReveal>

            <ScrollReveal>
              <Contact />
            </ScrollReveal>
          </>
        )}

        {currentPage === 'ABOUT US' && (
          <Box sx={{ pt: { xs: 12, lg: 20 }, minHeight: '100vh' }}>
            <AboutPage />
          </Box>
        )}

        {currentPage === 'PRINCIPLES' && (
          <Box sx={{ pt: { xs: 12, lg: 20 }, minHeight: '100vh' }}>
            <PrinciplesPage />
          </Box>
        )}

        {currentPage === 'PRODUCT' && (
          <Box sx={{ pt: { xs: 12, lg: 20 }, minHeight: '100vh' }}>
            <ProductCatalog
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeSubtype={activeSubtype}
              setActiveSubtype={setActiveSubtype}
              filteredProducts={filteredProducts}
            />
          </Box>
        )}

        {currentPage === 'INSIGHTS' && (
          <Box sx={{ pt: { xs: 12, lg: 20 }, minHeight: '100vh' }}>
            <BlogPage />
          </Box>
        )}

        {currentPage === 'CONTACT US' && (
          <Box sx={{ minHeight: '100vh' }}>
            <Contact />
          </Box>
        )}

        {currentPage === 'LOGIN' && (
          <Login onLogin={(user) => {
            setUser(user);
            navigateTo('ADMIN');
          }} />
        )}

        {currentPage === 'ADMIN' && (
          user ? (
            <AdminPanel
              products={productsList}
              onAdd={handleAddProduct}
              onDelete={handleDeleteProduct}
              onLogout={() => {
                setUser(null);
                navigateTo('HOME');
              }}
            />
          ) : (
            <Login onLogin={(user) => {
              setUser(user);
              navigateTo('ADMIN');
            }} />
          )
        )}

        {/* --- RENDER FALLBACK FOR UNHANDLED ROUTES --- */}
        {!['HOME', 'ABOUT US', 'PRINCIPLES', 'PRODUCT', 'INSIGHTS', 'CONTACT US', 'LOGIN', 'ADMIN'].includes(currentPage) && (
          <PlaceholderPage title={currentPage} />
        )}

        {currentPage !== 'LOGIN' && <Footer navigateTo={navigateTo} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
