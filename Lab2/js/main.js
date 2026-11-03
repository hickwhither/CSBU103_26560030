(() => {
	const nav = document.getElementById('primary-nav');
	const navToggle = document.querySelector('.nav-toggle');
	const searchToggle = document.getElementById('search-toggle');
	const searchPanel = document.getElementById('search-panel');
	const searchForm = document.getElementById('search-form');
	const searchInput = document.getElementById('product-search');
	const productGrid = document.getElementById('product-grid');
	const productCards = Array.from(productGrid.querySelectorAll('.product-card'));
	const noResults = document.getElementById('no-results');
	const cartButton = document.getElementById('cart-button');
	const cartCount = document.getElementById('cart-count');
	const toast = document.getElementById('toast');

	let cartItems = Number.parseInt(cartCount.textContent, 10) || 0;
	let toastTimer;

	const showToast = (message) => {
		toast.textContent = message;
		toast.classList.add('is-visible');
		window.clearTimeout(toastTimer);
		toastTimer = window.setTimeout(() => {
			toast.classList.remove('is-visible');
		}, 2200);
	};

	const setCartLabel = () => {
		const label = `${cartItems} ${cartItems === 1 ? 'item' : 'items'}`;
		cartButton.setAttribute('aria-label', `Open cart, ${label}`);
	};

	const closeNav = () => {
		nav.classList.remove('is-open');
		navToggle.setAttribute('aria-expanded', 'false');
	};

	const closeSearch = () => {
		searchPanel.hidden = true;
		searchToggle.setAttribute('aria-expanded', 'false');
	};

	navToggle.addEventListener('click', () => {
		const isOpen = nav.classList.toggle('is-open');
		navToggle.setAttribute('aria-expanded', String(isOpen));
	});

	nav.addEventListener('click', (event) => {
		if (event.target.closest('a')) {
			closeNav();
		}
	});

	searchToggle.addEventListener('click', () => {
		if (searchPanel.hidden) {
			searchPanel.hidden = false;
			searchToggle.setAttribute('aria-expanded', 'true');
			searchInput.focus();
		} else {
			closeSearch();
		}
	});

	searchForm.addEventListener('submit', (event) => {
		event.preventDefault();
	});

	searchInput.addEventListener('input', () => {
		const query = searchInput.value.trim().toLowerCase();
		let visibleCount = 0;

		productCards.forEach((card) => {
			const searchable = `${card.dataset.search} ${card.textContent}`.toLowerCase();
			const matches = query === '' || searchable.includes(query);
			card.hidden = !matches;

			if (matches) {
				visibleCount += 1;
			}
		});

		noResults.hidden = visibleCount !== 0;
	});

	productGrid.addEventListener('click', (event) => {
		const button = event.target.closest('.add-to-cart');

		if (!button) {
			return;
		}

		cartItems += 1;
		cartCount.textContent = String(cartItems);
		setCartLabel();

		const label = button.querySelector('span');
		const originalLabel = label.textContent;
		button.classList.add('is-added');
		label.textContent = 'Added';

		window.setTimeout(() => {
			button.classList.remove('is-added');
			label.textContent = originalLabel;
		}, 1200);

		showToast(`${button.dataset.product} added to cart`);
	});

	cartButton.addEventListener('click', () => {
		const label = `${cartItems} ${cartItems === 1 ? 'item' : 'items'}`;
		showToast(`Your cart contains ${label}.`);
	});

	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') {
			return;
		}

		closeNav();
		closeSearch();
	});

	setCartLabel();
})();
