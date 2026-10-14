<script>
	import favicon from '#lib/assets/favicon.svg';
	import '../app.css'; 
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

	let isMenuOpen = $state(false);
	let isSubMenuOpen = $state(false);

	function closeMenu() {
		isMenuOpen = false;
		isSubMenuOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-slate-900 text-slate-200 font-sans antialiased">
	<!-- FEJLÉC -->
	<header class="sticky top-0 z-50 bg-slate-800/95 backdrop-blur border-b border-slate-700">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<!-- LOGO -->
			<a href="/" onclick={closeMenu} class="flex items-center gap-2 text-white font-bold text-lg tracking-tight hover:text-slate-100 transition-colors">
				<span class="text-slate-400 font-mono">&lt;/&gt;</span>
				<span>Legyél Informatikus!</span>
			</a>

			<!-- HAMBURGER GOMB (MOBIL) -->
			<button
				type="button"
				class="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
				onclick={() => (isMenuOpen = !isMenuOpen)}
				aria-label="Menü kapcsolása"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if isMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>

			<!-- ASZTALI NAVIGÁCIÓ -->
			<nav class="hidden md:flex items-center gap-1">
				<!-- 9. Évfolyam lenyíló almenüvel -->
				<div class="relative group">
					<a
						href="/9"
						class="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
					>
						9. évfolyam
						<svg class="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</a>

					<div class="absolute left-0 mt-1 w-52 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 hidden group-hover:block transition-all z-50">
						<a href="/9/digitalis_kultura" class="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
							Digitális kultúra
						</a>
						<a href="/9/programozas" class="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
							Programozás
						</a>
					</div>
				</div>

				<a href="/10" class="px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">10. évfolyam</a>
				<a href="/11" class="px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">11. évfolyam</a>
				<a href="/12" class="px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">12. évfolyam</a>
				<a href="/esti" class="px-3 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">Esti képzés</a>
			</nav>
		</div>

		<!-- MOBIL NAVIGÁCIÓ -->
		{#if isMenuOpen}
			<div class="md:hidden border-t border-slate-700 bg-slate-800 px-4 pt-2 pb-4 space-y-1">
				<div>
					<div class="flex items-center justify-between">
						<a href="/9" onclick={closeMenu} class="px-3 py-2 text-base font-medium text-slate-300 hover:text-white">
							9. évfolyam
						</a>
						<button
							type="button"
							class="p-2 text-slate-400 hover:text-white"
							onclick={() => (isSubMenuOpen = !isSubMenuOpen)}
							aria-label="Almenü lenyitása"
						>
							<span>{isSubMenuOpen ? '▲' : '▼'}</span>
						</button>
					</div>
					{#if isSubMenuOpen}
						<div class="pl-4 space-y-1 mt-1 border-l-2 border-slate-700 ml-2">
							<a href="/9/digitalis_kultura" onclick={closeMenu} class="block px-3 py-2 text-sm rounded-md text-slate-400 hover:text-white hover:bg-slate-700">
								Digitális kultúra
							</a>
							<a href="/9/programozas" onclick={closeMenu} class="block px-3 py-2 text-sm rounded-md text-slate-400 hover:text-white hover:bg-slate-700">
								Programozás
							</a>
						</div>
					{/if}
				</div>

				<a href="/10" onclick={closeMenu} class="block px-3 py-2 text-base font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white">10. évfolyam</a>
				<a href="/11" onclick={closeMenu} class="block px-3 py-2 text-base font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white">11. évfolyam</a>
				<a href="/12" onclick={closeMenu} class="block px-3 py-2 text-base font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white">12. évfolyam</a>
				<a href="/esti" onclick={closeMenu} class="block px-3 py-2 text-base font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white">Esti képzés</a>
			</div>
		{/if}
	</header>

	<!-- TARTALOM (Biztonságos snippet renderelés) -->
	<main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
		{@render children?.()}
	</main>

	<!-- LÁBLÉC -->
	<footer class="bg-slate-800 border-t border-slate-700 py-6 text-center text-sm text-slate-400">
		<p>&copy; 2026 Legyél Informatikus. Minden jog fenntartva.</p>
	</footer>
</div>