<script>
	// Segédfüggvény: biztosítja, hogy a szóközök és magyar ékezetek érvényes URL-t kapjanak
	function getFileUrl(folder, fileName) {
		return `/docs/${folder}/${encodeURIComponent(fileName)}`;
	}

	const documents = [
		{
			id: 'crud-pptx',
			type: 'PPT',
			title: 'MySQL CRUD',
			subtitle: 'Prezentáció: Adatbázis-műveletek összefoglalása',
			fileName: 'MySQL CRUD.pptx',
			folder: '11'
		},
		{
			id: 'crud-pdf',
			type: 'PDF',
			title: 'MySQL CRUD Parancsok és Lehetőségek',
			subtitle: 'Részletes szintaxis és példák (INSERT, SELECT, UPDATE, DELETE)',
			fileName: 'MySQL CRUD Parancsok és Lehetőségek.pdf',
			folder: '11'
		},
		{
			id: 'join',
			type: 'PDF',
			title: 'MySQL JOIN Műveletek és Halmazelmélet',
			subtitle: 'Táblák összekapcsolása, relációk és halmazok',
			fileName: 'MySQL JOIN Műveletek és Halmazelmélet.pdf',
			folder: '11'
		},
		{
			id: 'rendezes-szures',
			type: 'PDF',
			title: 'SQL Adatrendezés és Szűrés Haladóknak',
			subtitle: 'Komplex feltételkezelés, ORDER BY és szűrések',
			fileName: 'SQL Adatrendezés és Szűrés Haladóknak.pdf',
			folder: '11'
		},
		{
			id: 'aggregator',
			type: 'PDF',
			title: 'SQL Aggregátor Függvények',
			subtitle: 'COUNT, SUM, AVG és a csoportosítás logikája',
			fileName: 'SQL Aggregátor Függvények.pdf',
			folder: '11'
		}
	];

	// Alapértelmezetten kiválasztott tananyag (az első PDF az azonnali előnézethez)
	let selectedDoc = $state(documents[1]);
</script>

<div class="container">
	<header class="page-header">
		<span class="badge">11. Évfolyam</span>
		<h1>MySQL és SQL Tananyagok</h1>
		<p class="subtitle">Diasorok, prezentációk és letölthető segédletek</p>
	</header>

	<div class="content-grid">
		<!-- DOKUMENTUMOK LISTÁJA -->
		<section class="docs-list">
			<h2>Tananyagok listája ({documents.length})</h2>
			<div class="cards">
				{#each documents as doc}
					{@const fileUrl = getFileUrl(doc.folder, doc.fileName)}
					<div class="doc-card {selectedDoc.id === doc.id ? 'active-card' : ''}">
						<div class="doc-info">
							<div class="card-header">
								<span class="type-tag {doc.type.toLowerCase()}-tag">{doc.type}</span>
								<h3>{doc.title}</h3>
							</div>
							<p class="doc-sub">{doc.subtitle}</p>
						</div>

						<div class="doc-actions">
							<button 
								type="button"
								class="btn btn-secondary" 
								onclick={() => (selectedDoc = doc)}
							>
								{selectedDoc.id === doc.id ? '✓ Megnyitva' : 'Megtekintés'}
							</button>

							<a 
								class="btn btn-primary" 
								href={fileUrl} 
								download={doc.fileName}
							>
								⬇ Letöltés
							</a>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- BEÁGYAZOTT MEGJELENÍTŐ -->
		<section class="viewer-section">
			{@const currentUrl = getFileUrl(selectedDoc.folder, selectedDoc.fileName)}
			<div class="viewer-header">
				<div class="viewer-title">
					<span class="preview-label">Kiválasztott tananyag:</span>
					<strong>{selectedDoc.title}</strong>
				</div>
				<a 
					href={currentUrl} 
					target="_blank" 
					rel="noopener noreferrer" 
					class="link-external"
				>
					Megnyitás új lapon ↗
				</a>
			</div>

			<div class="viewer-wrapper">
				{#if selectedDoc.type === 'PDF'}
					<iframe
						src="{currentUrl}#toolbar=1&view=FitH"
						title={selectedDoc.title}
						class="pdf-frame"
					></iframe>
				{:else}
					<div class="ppt-placeholder">
						<div class="ppt-icon">📊</div>
						<h3>PowerPoint Prezentáció</h3>
						<p>{selectedDoc.fileName}</p>
						<p class="ppt-hint">
							A böngészők a prezentáció formátumot közvetlenül nem ágyazzák be. Kattints a gombra a letöltéshez!
						</p>
						<a 
							class="btn btn-primary" 
							href={currentUrl} 
							download={selectedDoc.fileName}
						>
							⬇ Prezentáció letöltése
						</a>
					</div>
				{/if}
			</div>
		</section>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.page-header {
		border-bottom: 1px solid #334155;
		padding-bottom: 1.5rem;
	}

	.badge {
		background-color: #334155;
		color: #94a3b8;
		padding: 0.25rem 0.65rem;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	h1 {
		margin: 0.6rem 0 0.25rem 0;
		font-size: 2rem;
		color: #f8fafc;
	}

	.subtitle {
		margin: 0;
		color: #94a3b8;
		font-size: 1rem;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1.35fr;
		gap: 2rem;
		align-items: start;
	}

	.docs-list h2 {
		font-size: 1.2rem;
		margin-top: 0;
		margin-bottom: 1rem;
		color: #cbd5e1;
	}

	.cards {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.doc-card {
		background-color: #1e293b;
		border: 1px solid #334155;
		border-radius: 8px;
		padding: 1.15rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0.9rem;
		transition: border-color 0.2s ease, background-color 0.2s ease;
	}

	.doc-card:hover {
		border-color: #475569;
	}

	.active-card {
		border-color: #64748b;
		background-color: #243248;
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.35rem;
	}

	.type-tag {
		color: #ffffff;
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
	}

	.pdf-tag {
		background-color: #ef4444;
	}

	.ppt-tag {
		background-color: #d97706;
	}

	.doc-card h3 {
		margin: 0;
		font-size: 1rem;
		color: #f1f5f9;
		line-height: 1.3;
	}

	.doc-sub {
		margin: 0;
		font-size: 0.825rem;
		color: #94a3b8;
		line-height: 1.4;
	}

	.doc-actions {
		display: flex;
		gap: 0.65rem;
		padding-top: 0.6rem;
		border-top: 1px solid #334155;
	}

	.btn {
		font-size: 0.825rem;
		font-weight: 500;
		padding: 0.45rem 0.9rem;
		border-radius: 6px;
		text-decoration: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.15s ease;
		border: 1px solid transparent;
	}

	.btn-secondary {
		background-color: #334155;
		color: #e2e8f0;
	}

	.btn-secondary:hover {
		background-color: #475569;
	}

	.btn-primary {
		background-color: #475569;
		color: #ffffff;
	}

	.btn-primary:hover {
		background-color: #64748b;
	}

	.viewer-section {
		background-color: #1e293b;
		border: 1px solid #334155;
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 750px;
		position: sticky;
		top: 5rem;
	}

	.viewer-header {
		padding: 0.85rem 1.25rem;
		background-color: #172033;
		border-bottom: 1px solid #334155;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		gap: 1rem;
	}

	.viewer-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.preview-label {
		color: #94a3b8;
		margin-right: 0.35rem;
	}

	.link-external {
		color: #94a3b8;
		text-decoration: none;
		font-size: 0.825rem;
		white-space: nowrap;
	}

	.link-external:hover {
		color: #f8fafc;
	}

	.viewer-wrapper {
		flex: 1;
		width: 100%;
		height: 100%;
		background-color: #0f172a;
	}

	.pdf-frame {
		width: 100%;
		height: 100%;
		border: none;
	}

	.ppt-placeholder {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		text-align: center;
		gap: 0.75rem;
	}

	.ppt-icon {
		font-size: 3rem;
	}

	.ppt-placeholder h3 {
		margin: 0;
		color: #f8fafc;
		font-size: 1.25rem;
	}

	.ppt-placeholder p {
		margin: 0;
		color: #94a3b8;
		font-size: 0.9rem;
	}

	.ppt-hint {
		max-width: 320px;
		margin-bottom: 1rem !important;
		line-height: 1.4;
	}

	@media (max-width: 1024px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.viewer-section {
			position: static;
			height: 550px;
		}
	}
</style>