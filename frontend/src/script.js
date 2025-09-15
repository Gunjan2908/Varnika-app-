');
    const mainApp = document.getElementById('main-app');
    
    if (appState.isLoggedIn) {
        landingPage.classList.remove('active');
        mainApp.classList.add('active');
        showPage(appState.currentPage);
    } else {
        landingPage.classList.add('active');
        mainApp.classList.remove('active');
    }
}

// Show different pages within the app
function showPage(pageId) {
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Update page visibility
    const pages = document.querySelectorAll('.app-page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageId;
    }
    
    // Special handling for products page
    if (pageId === 'products') {
        renderProducts();
    }
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const noProductsMsg = document.getElementById('no-products');
    
    // Filter products
    let filteredProducts = appState.products.filter(product => {
        const matchesCategory = appState.currentFilter === 'all' || product.category === appState.currentFilter;
        const matchesSearch = appState.searchQuery === '' || 
            product.name.toLowerCase().includes(appState.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(appState.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    if (filteredProducts.length === 0) {
        grid.style.display = 'none';
        noProductsMsg.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        noProductsMsg.style.display = 'none';
        
        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-content">
                    <div class="product-header">
                        <h3 class="product-title">${product.name}</h3>
                        <span class="product-category">${product.category}</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <p class="product-artisan">By ${product.artisan}</p>
                    <div class="product-footer">
                        <span class="product-price">${product.price}</span>
                        <a href="#" class="view-details">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Filter products by category
function filterByCategory(category) {
    appState.currentFilter = category;
    
    // Update filter buttons
    const filterBtns = document.querySelectorAll('.filter-tag');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    renderProducts();
}

// Filter products by search
function filterProducts() {
    const searchInput = document.getElementById('search-input');
    appState.searchQuery = searchInput.value;
    renderProducts();
}

// Handle image upload preview
function previewImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImg = document.getElementById('preview-img');
            const imagePreview = document.getElementById('image-preview');
            const uploadArea = document.getElementById('upload-area');
            
            previewImg.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadArea.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

// Remove uploaded image
function removeImage() {
    const imagePreview = document.getElementById('image-preview');
    const uploadArea = document.getElementById('upload-area');
    const imageInput = document.getElementById('image-input');
    
    imagePreview.style.display = 'none';
    uploadArea.style.display = 'block';
    imageInput.value = '';
}

// Add new product
function addProduct(productData) {
    const newProduct = {
        id: Date.now().toString(),
        ...productData,
        image: productData.image || 'https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU3NTAwNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    };
    
    appState.products.unshift(newProduct);
    showPage('products');
    showToast('Product added successfully!');
}

// Setup form event handlers
function setupFormHandlers() {
    // Login form
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email && password) {
            handleLogin(email);
        } else {
            showToast('Please fill in all fields', 'error');
        }
    });
    
    // Add product form
    const addProductForm = document.getElementById('add-product-form');
    addProductForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            price: document.getElementById('product-price').value,
            category: document.getElementById('product-category').value,
            artisan: document.getElementById('product-artisan').value
        };
        
        // Get image if uploaded
        const previewImg = document.getElementById('preview-img');
        if (previewImg.src && previewImg.src !== window.location.href) {
            formData.image = previewImg.src;
        }
        
        // Validate required fields
        if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.artisan) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate loading
        const submitBtn = addProductForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Adding Product...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            addProduct(formData);
            
            // Reset form
            addProductForm.reset();
            removeImage();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('login-modal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideLogin();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideLogin();
        }
    });
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Utility function to handle responsive behavior
function handleResize() {
    // Add any responsive JavaScript logic here if needed
}

// Listen for window resize
window.addEventListener('resize', handleResize);

// Handle page visibility (for cleanup when user leaves page)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - could save state here
    } else {
        // Page is visible - could refresh data here
    }
});

// Add some smooth scrolling behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize any animations or interactive elements
function initializeAnimations() {
    // Add scroll-based animations or other interactive features
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation (could be expanded)
    document.querySelectorAll('.feature-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAnimations);