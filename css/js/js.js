document.addEventListener('DOMContentLoaded', function () {

  const urlParams = new URLSearchParams(window.location.search);
  let currentCategory = urlParams.get('cat') || 'tui-xach-tay'; 
  if (!CATEGORY_LIST.some(function (cat) { return cat.key === currentCategory; })) {
    currentCategory = 'tui-xach-tay';
  }

  function renderSubcatRow() {
    const row = document.getElementById('subcatRow');
    if (!row) return;
    row.innerHTML = CATEGORY_LIST.map(function (cat) {
      const activeClass = cat.key === currentCategory ? ' active' : '';
      return (
        '<a href="product.html?cat=' + cat.key + '" class="subcat-item' + activeClass + '">' +
          '<span class="subcat-circle"><img src="' + cat.icon + '" alt="' + cat.label + '"></span>' +
          '<span>' + cat.label + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function renderCategoryFilter() {
    const wrap = document.getElementById('categoryFilterList');
    if (!wrap) return;

    const VISIBLE_COUNT = 3;   // Hiện 3 cái đầu tiên
    let html = '';

    CATEGORY_LIST.forEach(function (cat, index) {
      const count = PRODUCT_DATA.filter(function (p) { return p.category === cat.key; }).length;
      const checkedAttr = cat.key === currentCategory ? ' checked' : '';
      const hiddenClass = index >= VISIBLE_COUNT ? ' is-hidden-category' : '';
      
      html += 
        '<label class="filter-check' + hiddenClass + '" style="display:' + (index >= VISIBLE_COUNT ? 'none' : 'flex') + '">' +
          '<input type="checkbox" class="filter-category" value="' + cat.key + '"' + checkedAttr + '> ' +
          cat.label + ' <span class="count">(' + count + ')</span>' +
        '</label>';
    });

    html += '<button type="button" class="btn-toggle-category" id="toggleCategoryBtn">Xem thêm</button>';
    wrap.innerHTML = html;

    wrap.querySelectorAll('.filter-category').forEach(function (cb) {
      cb.addEventListener('change', function () {
        if (this.checked) {
          window.location.href = 'product.html?cat=' + this.value;
        }
      });
    });

    const toggleBtn = document.getElementById('toggleCategoryBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const isExpanding = this.textContent.trim() === 'Xem thêm';
        const hiddenItems = wrap.querySelectorAll('.is-hidden-category');

        hiddenItems.forEach(function (item) {
          item.style.display = isExpanding ? 'flex' : 'none';
        });

        this.textContent = isExpanding ? 'Thu gọn' : 'Xem thêm';
      });
    }
  }

  function updateBannerAndBreadcrumb() {
    const currentCat = CATEGORY_LIST.find(function (c) { return c.key === currentCategory; });
    if (!currentCat) return;

    const bannerImgEl = document.getElementById('bannerImage');
    const eyebrowEl = document.getElementById('bannerEyebrow');
    const headingEl = document.getElementById('bannerHeading');
    const descriptionEl = document.getElementById('bannerDescription');
    const breadcrumbEl = document.getElementById('breadcrumbCurrent');

    if (bannerImgEl) bannerImgEl.src = currentCat.banner;
    if (eyebrowEl) eyebrowEl.textContent = currentCat.eyebrow;
    if (headingEl) headingEl.textContent = currentCat.heading;
    if (descriptionEl) descriptionEl.textContent = currentCat.description;
    if (breadcrumbEl) breadcrumbEl.textContent = currentCat.label;

    document.title = currentCat.label + ' - Lady Rose';
  }

  function renderProductGrid() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const list = PRODUCT_DATA.filter(function (p) { return p.category === currentCategory; });

    grid.innerHTML = list.map(function (product) {
      return buildProductCard(product, list);
    }).join('');

    updateProductCount(list.length);
    bindCardEvents();
  }

  function formatVND(num) {
    return num.toLocaleString('vi-VN') + 'đ';
  }

  function buildProductCard(product, totalCount) {
    const defaultColor = product.colors[0];
    const productColorKeys = product.colors.map(function (c) { return c.key; }).join(',');
    const wishlistActive = isWishlisted(product.id);
    const wishlistClass = wishlistActive ? ' active' : '';
    const wishlistIconClass = wishlistActive ? 'ti ti-heart-filled' : 'ti ti-heart';
    const ratingText = product.rating || '(0 đánh giá)';
    const colorDotsHtml = product.colors.map(function (c, idx) {
      const activeClass = idx === 0 ? ' active' : '';
      const outline = c.hex.toUpperCase() === '#FFFFFF' ? ';outline-color:#E3D7C7' : '';
      return (
        '<span class="color-dot' + activeClass + '" style="background:' + c.hex + outline + '" ' +
          'data-color="' + c.key + '" data-image="' + c.image + '" data-image-model="' + c.imageModel + '" ' +
          'title="' + c.label + '"></span>'
      );
    }).join('');

    const price = defaultColor.priceOverride || product.price;

    return (
      '<div class="col-xl-3 col-md-4 col-6 product-item" ' +
        'data-id="' + product.id + '" ' +
        'data-name="' + product.name + '" ' +
        'data-category="' + product.category + '" ' +
        'data-material="' + product.material + '" ' +
        'data-occasion="' + product.occasion + '" ' +
        'data-color="' + defaultColor.key + '" ' +
        'data-colors="' + productColorKeys + '" ' +
        'data-price="' + price + '">' +
        '<div class="product-card">' +
          '<div class="product-thumb">' +
            '<img class="img-default" src="' + defaultColor.image + '" alt="' + product.name + ' màu ' + defaultColor.label + '">' +
            '<img class="img-lifestyle" src="' + defaultColor.imageModel + '" alt="Người mẫu mang ' + product.name + '" ' +
              'onerror="this.onerror=null; this.src=this.previousElementSibling.src;">' +
            '<button class="btn-wishlist' + wishlistClass + '" aria-label="Yêu thích"><i class="' + wishlistIconClass + '"></i></button>' +
          '</div>' +
          '<div class="product-info">' +
            '<div class="product-name">' + product.name + '</div>' +
            '<div class="product-colors">' + colorDotsHtml + '</div>' +
            '<div class="price-row"><span class="price-current">' + formatVND(price) + '</span></div>' +
            '<div class="rating-row"><span class="stars">★★★★★</span><span>' + ratingText + '</span></div>' +
          '</div>' +
          '<div class="product-actions">' +
            '<button class="btn-quick-add">Thêm vào giỏ</button>' +
            '<a href="product-detail.html?id=' + product.id + '&color=' + defaultColor.key + '" class="btn-view-detail">Chi tiết sp</a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function bindCardEvents() {
    document.querySelectorAll('.product-colors .color-dot').forEach(function (dot) {
      dot.addEventListener('click', function () {
        const card = this.closest('.product-item');
        const defaultImg = card.querySelector('.img-default');
        const lifestyleImg = card.querySelector('.img-lifestyle');

        const newImage = this.dataset.image;          
        const newImageModel = this.dataset.imageModel; 

        if (defaultImg) {
          defaultImg.src = newImage;
          defaultImg.alt = card.dataset.name + ' màu ' + this.title; 
        }
        
        if (lifestyleImg) {
          lifestyleImg.src = newImageModel || newImage; 
          lifestyleImg.alt = 'Người mẫu mang ' + card.dataset.name + ' màu ' + this.title;
          lifestyleImg.onerror = function() {
            this.onerror = null; 
            this.src = newImage; 
          };
        }

        card.querySelectorAll('.color-dot').forEach(function (d) { d.classList.remove('active'); });
        this.classList.add('active');

        card.dataset.color = this.dataset.color;
        const detailLink = card.querySelector('.btn-view-detail');
        if (detailLink) {
          const id = card.dataset.id;
          detailLink.href = 'product-detail.html?id=' + id + '&color=' + this.dataset.color;
        }

        var thumb = card.querySelector('.product-thumb');
        if (thumb) {
          thumb.classList.add('color-changed');
          setTimeout(function () {
            thumb.classList.remove('color-changed');
          }, 50);
        }
      });
    });

    document.querySelectorAll('.btn-wishlist').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const card = this.closest('.product-item');
        const productId = card ? card.dataset.id : '';
        const productName = card ? card.dataset.name : '';
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
          icon.classList.remove('ti-heart');
          icon.classList.add('ti-heart-filled');
          updateWishlist(productId, true);
          showToast('❤️ ' + productName + ' đã được thêm vào yêu thích');
        } else {
          icon.classList.remove('ti-heart-filled');
          icon.classList.add('ti-heart');
          updateWishlist(productId, false);
          showToast('Đã xóa ' + productName + ' khỏi danh sách yêu thích');
        }
        updateWishlistBadge();
      });
    });

    // --- BƯỚC 1: ĐÃ CẬP NHẬT Ở ĐÂY ---
    document.querySelectorAll('.btn-quick-add').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const card = this.closest('.product-item');
        
        // Gọi hàm thêm vào giỏ hàng
        addToCart(card.dataset.id, card.dataset.color);
        
        // Hiệu ứng UX đổi màu nút báo thành công
        const originalText = this.textContent;
        this.textContent = 'ĐÃ THÊM ✓';
        this.style.background = '#2e8b3a';
        this.style.color = '#fff';
        this.style.borderColor = '#2e8b3a';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
            this.style.color = '';
            this.style.borderColor = '';
        }, 1200);
      });
    });
  }

  function filterProducts() {
    const productCards = document.querySelectorAll('.product-item');
    const activeMaterials = getCheckedValues('filter-material');
    const activeOccasions = getCheckedValues('filter-occasion');
    const activeColors = Array.from(document.querySelectorAll('.filter-sidebar .color-swatch.active'))
      .map(function (el) { return el.dataset.color; });
    const priceRange = document.getElementById('priceRange');
    const maxPrice = priceRange ? parseInt(priceRange.value, 10) : Infinity;

    let visibleCount = 0;

    productCards.forEach(function (card) {
      const matchMaterial = activeMaterials.length === 0 || activeMaterials.includes(card.dataset.material);
      const matchOccasion = activeOccasions.length === 0 || activeOccasions.includes(card.dataset.occasion);
      const cardColors = (card.dataset.colors || card.dataset.color || '').split(',');
      const matchColor = activeColors.length === 0 || activeColors.some(function (color) {
        return cardColors.includes(color);
      });
      const matchPrice = parseInt(card.dataset.price, 10) <= maxPrice;

      if (matchMaterial && matchOccasion && matchColor && matchPrice) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    updateProductCount(visibleCount);
  }

  function getCheckedValues(groupClass) {
    return Array.from(document.querySelectorAll('.' + groupClass + ':checked'))
      .map(function (el) { return el.value; });
  }

  function updateProductCount(count) {
    const countDesktopEl = document.getElementById('productCountDesktop');
    const countMobileAndTabletEl = document.getElementById('productCountMobileAndTablet');
    const countOnlyMobileEl = document.getElementById('productCountOnlyMobile');

    if (countDesktopEl) countDesktopEl.textContent = count + ' sản phẩm';
    if (countMobileAndTabletEl) countMobileAndTabletEl.textContent = count + ' sản phẩm';
    if (countOnlyMobileEl) countOnlyMobileEl.textContent = count + ' sản phẩm';
  }

  function bindSidebarEvents() {
    document.querySelectorAll('.filter-sidebar .color-swatch').forEach(function (sw) {
      if (sw.dataset.filterBound === 'true') return;
      sw.dataset.filterBound = 'true';
      sw.addEventListener('click', function () {
        this.classList.toggle('active');
        filterProducts();
      });
    });

    document.querySelectorAll('.filter-material, .filter-occasion').forEach(function (cb) {
      if (cb.dataset.filterBound === 'true') return;
      cb.dataset.filterBound = 'true';
      cb.addEventListener('change', filterProducts);
    });

    const priceRange = document.getElementById('priceRange');
    const priceToInput = document.getElementById('priceTo');
    if (priceRange && priceRange.dataset.filterBound !== 'true') {
      priceRange.dataset.filterBound = 'true';
      priceRange.addEventListener('input', function () {
        priceToInput.value = formatVND(parseInt(this.value, 10));
        filterProducts();
      });
    }

    const clearFilterBtn = document.getElementById('clearFilterBtn');
    if (clearFilterBtn && clearFilterBtn.dataset.filterBound !== 'true') {
      clearFilterBtn.dataset.filterBound = 'true';
      clearFilterBtn.addEventListener('click', function () {
        document.querySelectorAll('.filter-material, .filter-occasion').forEach(function (cb) { cb.checked = false; });
        document.querySelectorAll('.filter-sidebar .color-swatch').forEach(function (sw) { sw.classList.remove('active'); });
        if (priceRange) {
          priceRange.value = priceRange.max;
          priceToInput.value = formatVND(parseInt(priceRange.max, 10));
        }
        filterProducts();
      });
    }
  }

  function bindSearchEvent() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    searchInput.addEventListener('input', function () {
      const keyword = this.value.trim().toLowerCase();
      const productCards = document.querySelectorAll('.product-item');
      let visibleCount = 0;
      productCards.forEach(function (card) {
        const name = card.dataset.name.toLowerCase();
        const show = name.includes(keyword);
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      updateProductCount(visibleCount);
    });
  }

  function bindSortEvent() {
    const sortSelectDesktop = document.getElementById('sortSelectDesktop');
    const sortSelectMobileAndTablet = document.getElementById('sortSelectMobileAndTablet');

    const handleSortChange = function() {
      const grid = document.getElementById('productGrid');
      const cards = Array.from(grid.querySelectorAll('.product-item'));
      const sortType = this.value; 

      cards.sort(function (a, b) {
        const priceA = parseInt(a.dataset.price, 10);
        const priceB = parseInt(b.dataset.price, 10);
        if (sortType === 'price-asc') return priceA - priceB;
        if (sortType === 'price-desc') return priceB - priceA;
        return 0;
      });
      cards.forEach(function (card) { grid.appendChild(card); });
    };

    if (sortSelectDesktop) {
      sortSelectDesktop.addEventListener('change', handleSortChange);
    }
    if (sortSelectMobileAndTablet) {
      sortSelectMobileAndTablet.addEventListener('change', handleSortChange);
    }
  }

  // --- BƯỚC 2: ĐÃ CẬP NHẬT Ở ĐÂY ---
  function addToCart(productId, colorKey) {
    if (typeof CartManager !== 'undefined') {
      CartManager.addFromCatalog(productId, colorKey, 1);
      showToast('Đã thêm sản phẩm vào giỏ hàng');
      
      if (document.getElementById('cartOffcanvas') && document.getElementById('cartOffcanvas').classList.contains('show')) {
        renderCartOffcanvas();
      }
    } else {
      console.error("Chưa tải file cart.js");
    }
  }

  function updateCartBadge() {
    if (typeof refreshCartBadge === 'function') {
      refreshCartBadge();
    }
  }

  function getWishlist() {
    return JSON.parse(localStorage.getItem('ladyrose_wishlist') || '[]');
  }

  function isWishlisted(productId) {
    return getWishlist().includes(productId);
  }

  function updateWishlist(productId, shouldAdd) {
    if (!productId) return;
    let wishlist = getWishlist();
    if (shouldAdd && !wishlist.includes(productId)) {
      wishlist.push(productId);
    }
    if (!shouldAdd) {
      wishlist = wishlist.filter(function (id) { return id !== productId; });
      const productCard = document.querySelector(`.product-item[data-id="${productId}"]`);
      if (productCard) {
        const wishlistBtn = productCard.querySelector('.btn-wishlist');
        const wishlistIcon = wishlistBtn.querySelector('i');
        wishlistBtn.classList.remove('active');
        wishlistIcon.classList.remove('ti-heart-filled');
        wishlistIcon.classList.add('ti-heart');
      }
    }
    localStorage.setItem('ladyrose_wishlist', JSON.stringify(wishlist));
  }

  function updateWishlistBadge() {
    const count = getWishlist().length;
    if (typeof window.updateWishlistBadge === 'function') {
      window.updateWishlistBadge(count);
    } else {
      const badge = document.getElementById('wishlistBadge');
      if (badge) badge.textContent = count;
    }
  }

  function showToast(message) {
    let toast = document.getElementById('ladyroseToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ladyroseToast';
      toast.style.cssText = `
        position: fixed;
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        background: rgba(58, 46, 38, 0.9); 
        color: #fff;
        padding: 14px 24px; 
        border-radius: 8px;
        font-size: 15px; 
        z-index: 99999; 
        opacity: 0;
        transition: opacity .4s ease-in-out, transform .4s ease-in-out;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        min-width: 280px;
        max-width: 90vw; 
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, -50%)';

    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(function () { 
      toast.style.opacity = '0'; 
      toast.style.transform = 'translate(-50%, -60%)'; 
    }, 2500);
  }

  renderSubcatRow();
  renderCategoryFilter();
  updateBannerAndBreadcrumb();
  renderProductGrid();
  bindSidebarEvents();
  bindSearchEvent();
  bindSortEvent();
  updateCartBadge();
  updateWishlistBadge();

  // --- BƯỚC 3: ĐÃ CẬP NHẬT Ở ĐÂY ---
  function renderCartOffcanvas() {
    if (typeof CartManager === 'undefined') return;
    
    const cart = CartManager.getCart(); 
    const cartItemsEl = document.getElementById('cartItems');
    const cartEmptyEl = document.getElementById('cartEmpty');
    const cartFooterEl = document.getElementById('cartFooter');
    const cartTotalEl = document.getElementById('cartTotal');

    if (!cartItemsEl) return;

    if (cart.length === 0) {
      cartItemsEl.style.display = 'none';
      cartItemsEl.innerHTML = '';
      if (cartEmptyEl) cartEmptyEl.style.display = 'flex';
      if (cartFooterEl) cartFooterEl.style.display = 'none';
      return;
    }

    let total = 0;
    let html = '';
    
    cart.forEach(function (item) {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      html += `
        <div class="cart-offcanvas-item" style="
          display:flex; gap:12px; background:#fff;
          border:1px solid #E3D7C7; border-radius:10px;
          padding:12px; margin-bottom:10px;
        ">
          <img src="${item.image}" alt="${item.name}"
               style="width:72px; height:80px; object-fit:cover; border-radius:6px; flex-shrink:0; background:#F5EFE6;">
          <div style="flex:1; min-width:0;">
            <div style="font-size:13px; font-weight:600; color:#2D231B; line-height:1.3; margin-bottom:4px;">${item.name}</div>
            <div style="font-size:12px; color:#9C8E7E; margin-bottom:6px;">Màu: ${item.colorLabel}</div>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
              <div style="display:flex; align-items:center; border:1px solid #E3D7C7; border-radius:6px; overflow:hidden;">
                <button class="cart-qty-btn" data-action="minus" data-cart-id="${item.cartItemId}"
                        style="width:28px; height:28px; background:none; border:none; cursor:pointer; font-size:16px; color:#3A2E26; display:flex; align-items:center; justify-content:center;">−</button>
                <span style="width:28px; text-align:center; font-size:13px; font-weight:600;">${item.qty}</span>
                <button class="cart-qty-btn" data-action="plus" data-cart-id="${item.cartItemId}"
                        style="width:28px; height:28px; background:none; border:none; cursor:pointer; font-size:16px; color:#3A2E26; display:flex; align-items:center; justify-content:center;">+</button>
              </div>
              <div style="font-size:14px; font-weight:700; color:#413125;">${formatVND(itemTotal)}</div>
            </div>
          </div>
          <button class="cart-remove-btn" data-cart-id="${item.cartItemId}"
                  style="background:none; border:none; cursor:pointer; color:#C0A898; font-size:18px; padding:0; align-self:flex-start;"
                  title="Xóa">×</button>
        </div>
      `;
    });

    cartItemsEl.innerHTML = html;
    cartItemsEl.style.display = 'block';
    if (cartEmptyEl) cartEmptyEl.style.display = 'none';
    if (cartFooterEl) cartFooterEl.style.display = 'block';
    if (cartTotalEl) cartTotalEl.textContent = formatVND(total);

    cartItemsEl.querySelectorAll('.cart-qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cartItemId = this.dataset.cartId;
        const action = this.dataset.action;
        const currentItem = CartManager.getCart().find(i => i.cartItemId === cartItemId);
        
        if (currentItem) {
            const newQty = action === 'plus' ? currentItem.qty + 1 : currentItem.qty - 1;
            CartManager.updateQty(cartItemId, newQty); 
            renderCartOffcanvas(); 
        }
      });
    });

    cartItemsEl.querySelectorAll('.cart-remove-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        CartManager.removeItem(this.dataset.cartId); 
        renderCartOffcanvas(); 
      });
    });
  }

  function bindCartOffcanvas() {
    setTimeout(function () {
      const cartOffcanvas = document.getElementById('cartOffcanvas');
      if (cartOffcanvas) {
        cartOffcanvas.addEventListener('show.bs.offcanvas', function () {
          renderCartOffcanvas();
        });
      }
    }, 800);
  }

  function initFilterDrawer() {
    const openFilterMobileBtn = document.getElementById('openFilterMobileBtn'); 
    const filterDrawerOverlay = document.getElementById('filterDrawerOverlay');
    const filterDrawer = document.getElementById('filterDrawer');
    const filterDrawerClose = document.getElementById('filterDrawerClose');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const filterSidebar = document.querySelector('.filter-sidebar'); 

    if (!openFilterMobileBtn || !filterDrawer || !filterDrawerOverlay || !filterSidebar) return;

    const drawerBody = filterDrawer.querySelector('.filter-drawer-body');
    const filterHome = document.createComment('filter-sidebar-home');
    filterSidebar.parentNode.insertBefore(filterHome, filterSidebar);

    function openDrawer() {
      moveFilterForViewport();
      filterDrawer.classList.add('open');
      filterDrawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      filterDrawer.classList.remove('open');
      filterDrawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
      filterProducts();
    }

    function moveFilterForViewport() {
      const isMobileOrTablet = window.innerWidth < 992;

      if (isMobileOrTablet) {
        if (filterSidebar.parentNode !== drawerBody) {
          drawerBody.appendChild(filterSidebar);
        }
        filterSidebar.style.display = 'block';
        return;
      }

      closeDrawer();
      if (filterSidebar.parentNode !== filterHome.parentNode) {
        filterHome.parentNode.insertBefore(filterSidebar, filterHome.nextSibling);
      }
      filterSidebar.style.display = '';
    }

    function handleResize() {
      window.clearTimeout(window._filterDrawerResizeTimer);
      window._filterDrawerResizeTimer = window.setTimeout(moveFilterForViewport, 120);
    }

    openFilterMobileBtn.addEventListener('click', openDrawer);
    filterDrawerClose.addEventListener('click', closeDrawer);
    filterDrawerOverlay.addEventListener('click', closeDrawer);
    applyFilterBtn.addEventListener('click', closeDrawer);
    window.addEventListener('resize', handleResize);

    moveFilterForViewport();
  }

  function showWishlistModal() {
    const wishlistIds = getWishlist();
    let contentHTML = '';

    if (wishlistIds.length === 0) {
      contentHTML = `<p style="text-align:center; padding: 60px 20px; color: #9C8E7E; font-size: 15px;">
        Bạn chưa có sản phẩm yêu thích nào.<br>
        Hãy nhấn ❤️ trên sản phẩm để thêm vào đây.
      </p>`;
    } else {
      contentHTML = `<div class="row g-3">`;
      PRODUCT_DATA.forEach(function (product) {
        if (wishlistIds.includes(product.id)) {
          const defaultColor = product.colors[0];
          contentHTML += `
            <div class="col-6 col-md-4 wishlist-item">
              <div style="background:#fff; border:1px solid #E3D7C7; border-radius:10px; overflow:hidden; display:flex; flex-direction:column; height:100%;">
                <div style="aspect-ratio:1/1.1; overflow:hidden; background:#F5EFE6;">
                  <img src="${defaultColor.image}" alt="${product.name}" 
                       style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="padding:12px; display:flex; flex-direction:column; flex:1; gap:6px;">
                  <div style="font-size:13.5px; font-weight:500; color:#2D231B; line-height:1.35;">${product.name}</div>
                  <div style="font-size:16px; font-weight:600; color:#413125;">${formatVND(defaultColor.priceOverride || product.price)}</div>
                  <div style="display:flex; gap:6px; margin-top:auto; padding-top:8px;">
                    <a href="product-detail.html?id=${product.id}&color=${defaultColor.key}" 
                       style="flex:1; background:#3A2E26; color:#fff; border:none; border-radius:6px; padding:8px 4px; font-size:12px; font-weight:600; text-align:center; text-decoration:none; display:flex; align-items:center; justify-content:center;">
                      Mua ngay
                    </a>
                    <button class="remove-from-wishlist" data-id="${product.id}" 
                            style="flex:1; background:transparent; color:#3A2E26; border:1px solid #3A2E26; border-radius:6px; padding:8px 4px; font-size:12px; font-weight:600; cursor:pointer;">
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
        }
      });
      contentHTML += `</div>`;
    }

    let modal = document.getElementById('wishlistModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'wishlistModal';
      modal.style.cssText = `position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:99999; display:flex; align-items:center; justify-content:center;`;
      modal.innerHTML = `
        <div style="background:#fff; width:95%; max-width:720px; max-height:92vh; overflow:auto; border-radius:12px; padding:20px 24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:16px;">
            <h4 style="margin:0;">Danh sách yêu thích (<span id="modalWishlistCount">0</span>)</h4>
            <button id="closeWishlistModal" style="font-size:28px; background:none; border:none; cursor:pointer; color:#666;">×</button>
          </div>
          <div id="wishlistModalContent"></div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    document.getElementById('wishlistModalContent').innerHTML = contentHTML;
    document.getElementById('modalWishlistCount').textContent = wishlistIds.length;
    modal.style.display = 'flex';

    document.querySelectorAll('.remove-from-wishlist').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.dataset.id;
        updateWishlist(id, false);
        updateWishlistBadge();
        showWishlistModal();
      });
    });

    document.getElementById('closeWishlistModal').onclick = function () {
      modal.style.display = 'none';
    };
  }

  function bindHeaderWishlistClick() {
    setTimeout(function () {
      const wishlistLink = document.querySelector('a[aria-label="Yêu thích"]');
      if (wishlistLink) {
        wishlistLink.addEventListener('click', function (e) {
          e.preventDefault();
          showWishlistModal();
        });
      }
    }, 800);
  }

  initFilterDrawer();
  bindHeaderWishlistClick();
  bindCartOffcanvas();
});
