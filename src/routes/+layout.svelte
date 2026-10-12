<script>
	import favicon from '#lib/assets/favicon.svg';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();

	// Reszponzív menü nyitott/zárt állapota Svelte 5 rune-nal
	let isMenuOpen = $state(false);

	const navItems = [
		{ href: '/9', label: '9. évfolyam' },
		{ href: '/10', label: '10. évfolyam' },
		{ href: '/11', label: '11. évfolyam' },
		{ href: '/12', label: '12. évfolyam' },
		{ href: '/esti', label: 'Esti képzés' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-container">
	<!-- FEJLÉC & NAVIGÁCIÓ -->
	<header class="header">
		<div class="header-content">
			<a href="/" class="brand-logo" onclick={closeMenu}>
				<span class="logo-accent">&lt;/&gt;</span> Legyél Informatikus!
			</a>

			<!-- Hamburger gomb mobilon -->
			<button
				class="mobile-toggle"
				onclick={toggleMenu}
				aria-label="Menü megnyitása"
				aria-expanded={isMenuOpen}
			>
				<span class="bar {isMenuOpen ? 'open' : ''}"></span>
				<span class="bar {isMenuOpen ? 'open' : ''}"></span>
				<span class="bar {isMenuOpen ? 'open' : ''}"></span>
			</button>

			<!-- Menüpontok -->
			<nav class="nav-links {isMenuOpen ? 'active' : ''}">
				{#each navItems as item}
					<a href={item.href} class="nav-link" onclick={closeMenu}>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
	</header>

	<!-- FŐ TARTALOM -->
	<main class="main-content">
		{@render children()}
	</main>

	<!-- LÁBLÉC -->
	<footer class="footer">
		<p class="copyright">
			&copy; 2026 Legyél Informatikus. Minden jog fenntartva.
		</p>
	</footer>
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		background-color: #0f172a; /* Mélysötét szürke / pala háttér */
		color: #e2e8f0;            /* Világosszürke szövegszín */
	}

	*, *::before, *::after {
		box-sizing: inherit;
	}

	/* Layout elrendezés (Sticky footer) */
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* Fejléc */
	.header {
		background-color: #1e293b;
		border-bottom: 1px solid #334155;
		position: sticky;
		top: 0;
		z-index: 50;
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.9rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.brand-logo {
		font-size: 1.25rem;
		font-weight: 700;
		text-decoration: none;
		color: #f8fafc;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		letter-spacing: -0.02em;
	}

	.logo-accent {
		color: #94a3b8;
		font-family: monospace;
	}

	/* Linkek asztali nézetben */
	.nav-links {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.nav-link {
		color: #cbd5e1;
		text-decoration: none;
		font-size: 0.925rem;
		font-weight: 500;
		padding: 0.45rem 0.85rem;
		border-radius: 6px;
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.nav-link:hover {
		background-color: #334155;
		color: #ffffff;
	}

	/* Hamburger gomb alapállapotban rejtve */
	.mobile-toggle {
		display: none;
		flex-direction: column;
		justify-content: space-around;
		width: 28px;
		height: 22px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.bar {
		width: 100%;
		height: 2px;
		background-color: #e2e8f0;
		border-radius: 2px;
		transition: transform 0.25s ease, opacity 0.25s ease;
	}

	/* Hamburger animáció nyitáskor */
	.bar.open:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.bar.open:nth-child(2) {
		opacity: 0;
	}
	.bar.open:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Fő tartalom konténer */
	.main-content {
		flex: 1;
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		padding: 2rem 1.5rem;
	}

	/* Lábléc */
	.footer {
		background-color: #1e293b;
		border-top: 1px solid #334155;
		padding: 1.5rem;
		text-align: center;
	}

	.copyright {
		margin: 0;
		font-size: 0.875rem;
		color: #94a3b8;
	}

	/* Reszponzív nézet mobilon */
	@media (max-width: 768px) {
		.mobile-toggle {
			display: flex;
		}

		.nav-links {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background-color: #1e293b;
			border-bottom: 1px solid #334155;
			flex-direction: column;
			gap: 0;
			padding: 0.75rem 1rem;
		}

		.nav-links.active {
			display: flex;
		}

		.nav-link {
			width: 100%;
			padding: 0.75rem 1rem;
		}
	}
</style>