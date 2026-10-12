<script>
	const documents = [
		{
			id: 'operatorok',
			title: 'Python Aritmetikai Operátorok és Elágazások',
			subtitle: 'Számítási műveletek, precedencia és döntési logikák',
			fileName: 'Python Aritmetikai Operátorok és Elágazások.pdf',
			path: '/docs/10/Python Aritmetikai Operátorok és Elágazások.pdf'
		},
		{
			id: 'while',
			title: 'A Python while Ciklus',
			subtitle: 'Feltételvezérelt ismétlés, számlálók és adatellenőrzés',
			fileName: 'A Python while Ciklus.pdf',
			path: '/docs/10/A Python while Ciklus.pdf'
		},
		{
			id: 'ciklusok',
			title: 'Python Ciklusok és Adatszerkezetek',
			subtitle: 'For ciklusok, listák kezelése és beépített függvények',
			fileName: 'Python Ciklusok és Adatszerkezetek.pdf',
			path: '/docs/10/Python Ciklusok és Adatszerkezetek.pdf'
		},
		{
			id: 'tetelek',
			title: 'Programozási Tételek Pythonban',
			subtitle: 'Alapvető algoritmusok, összegzés, keresés és eldöntés',
			fileName: 'Programozási Tételek Pythonban.pdf',
			path: '/docs/10/Programozási Tételek Pythonban.pdf'
		}
	];

	// Alapértelmezetten kiválasztott PDF
	let selectedDoc = $state(documents[0]);
</script>

<div class="container">
	<header class="page-header">
		<span class="badge">10. Évfolyam</span>
		<h1>Python Programozás Tananyagok</h1>
		<p class="subtitle">Interaktív diasorok, tananyagok és letölthető segédletek</p>
	</header>

	<div class="content-grid">
		<!-- DOKUMENTUMOK LISTÁJA -->
		<section class="docs-list">
			<h2>Tananyagok listája ({documents.length})</h2>
			<div class="cards">
				{#each documents as doc}
					<div class="doc-card {selectedDoc.id === doc.id ? 'active-card' : ''}">
						<div class="doc-info">
							<div class="card-header">
								<span class="pdf-tag">PDF</span>
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
								href={doc.path} 
								download={doc.fileName}
							>
								⬇ Letöltés
							</a>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- BEÁGYAZOTT PDF MEGJELENÍTŐ -->
		<section class="viewer-section">
			<div class="viewer-header">
				<div class="viewer-title">
					<span class="preview-label">Megnyitott dokumentum:</span>
					<strong>{selectedDoc.title}</strong>
				</div>
				<a 
					href={selectedDoc.path} 
					target="_blank" 
					rel="noopener noreferrer" 
					class="link-external"
				>
					Megnyitás új lapon ↗
				</a>
			</div>

			<div class="viewer-wrapper">
				<iframe
					src="{encodeURI(selectedDoc.path)}#toolbar=1&view=FitH"
					title={selectedDoc.title}
					class="pdf-frame"
				></iframe>
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

	.pdf-tag {
		background-color: #ef4444;
		color: #ffffff;
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
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

	/* Megjelenítő felület */
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