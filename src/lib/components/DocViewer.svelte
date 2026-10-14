<script>
	/**
	 * @typedef {{
	 *   id: string,
	 *   title: string,
	 *   subtitle: string,
	 *   type?: 'PDF' | 'PPT',
	 *   fileName: string,
	 *   path: string
	 * }} DocumentItem
	 */

	/** @type {{ badge: string, title: string, subtitle: string, documents: DocumentItem[] }} */
	let { badge, title, subtitle, documents = [] } = $props();

	let selectedId = $state(null);

	let selectedDoc = $derived(
		documents.find((d) => d.id === selectedId) || documents[0] || null
	);

	let currentUrl = $derived(selectedDoc ? encodeURI(selectedDoc.path) : '');
</script>

<div class="flex flex-col gap-8">
	<!-- FEJLÉC -->
	<div class="border-b border-slate-700 pb-6">
		<span class="inline-block bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-700">
			{badge}
		</span>
		<h1 class="text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
		<p class="text-slate-400 mt-2 text-base">{subtitle}</p>
	</div>

	{#if documents.length === 0}
		<div class="bg-slate-800/60 border border-slate-700 rounded-xl p-8 text-center text-slate-400">
			Hamarosan érkeznek a tananyagok...
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
			<!-- DOKUMENTUMLISTA -->
			<div class="lg:col-span-5 space-y-4">
				<h2 class="text-lg font-semibold text-slate-200">Elérhető tananyagok ({documents.length})</h2>
				
				<div class="flex flex-col gap-3">
					{#each documents as doc}
						{@const docUrl = encodeURI(doc.path)}
						{@const isSelected = selectedDoc?.id === doc.id}
						{@const isPdf = doc.type !== 'PPT'}

						<div class="bg-slate-800 border rounded-xl p-5 flex flex-col justify-between gap-4 transition-all {isSelected ? 'border-slate-500 bg-slate-800/90 shadow-md ring-1 ring-slate-500' : 'border-slate-700 hover:border-slate-600'}">
							<div>
								<div class="flex items-center gap-2 mb-2">
									<span class="text-[10px] font-bold px-2 py-0.5 rounded text-white {isPdf ? 'bg-red-600' : 'bg-amber-600'}">
										{doc.type || 'PDF'}
									</span>
									<h3 class="font-medium text-slate-100 text-base leading-snug">{doc.title}</h3>
								</div>
								<p class="text-xs text-slate-400 leading-relaxed">{doc.subtitle}</p>
							</div>

							<div class="flex gap-2 pt-3 border-t border-slate-700/60">
								<button
									type="button"
									onclick={() => (selectedDoc = doc)}
									class="flex-1 text-xs font-semibold py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
								>
									{isSelected ? '✓ Megnyitva' : 'Megtekintés'}
								</button>
								<a
									href={docUrl}
									download={doc.fileName}
									class="flex-1 text-xs font-semibold py-2 px-3 rounded-lg bg-slate-600 hover:bg-slate-500 text-white text-center transition-colors flex items-center justify-center gap-1"
								>
									<span>⬇</span> Letöltés
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- NÉZŐKE -->
			<div class="lg:col-span-7 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex flex-col h-[750px] lg:sticky lg:top-24 shadow-2xl">
				<div class="bg-slate-900/80 px-4 py-3 border-b border-slate-700 flex justify-between items-center text-sm">
					<div class="truncate mr-4 text-slate-300">
						<span class="text-slate-400">Megnyitva:</span>
						<strong class="text-white ml-1">{selectedDoc?.title}</strong>
					</div>
					<a href={currentUrl} target="_blank" rel="noopener noreferrer" class="text-xs text-slate-400 hover:text-white shrink-0">
						Új lapon ↗
					</a>
				</div>

				<div class="flex-1 w-full h-full bg-slate-950">
					{#if selectedDoc?.type === 'PPT'}
						<div class="h-full flex flex-col items-center justify-center p-8 text-center gap-4">
							<span class="text-5xl">📊</span>
							<h3 class="text-xl font-bold text-white">PowerPoint Prezentáció</h3>
							<p class="text-sm text-slate-400 max-w-sm">
								Ez a formátum közvetlenül nem ágyazható be a böngészőbe. Töltsd le a megtekintéshez!
							</p>
							<a href={currentUrl} download={selectedDoc.fileName} class="mt-2 bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm py-2 px-4 rounded-lg transition-colors">
								⬇ Letöltés ({selectedDoc.fileName})
							</a>
						</div>
					{:else if selectedDoc}
						<iframe src="{currentUrl}#toolbar=1&view=FitH" title={selectedDoc.title} class="w-full h-full border-none"></iframe>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>