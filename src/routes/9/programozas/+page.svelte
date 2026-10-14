<script>
	import DocViewer from '$lib/components/DocViewer.svelte';

	const documents = [
		{
			id: 'urlapok',
			type: 'PDF',
			title: 'HTML5 Űrlapok és Beviteli Mezők',
			subtitle: 'Form elemek, input típusok, validáció és adatbekérés',
			fileName: 'HTML5 Urlapok es Beviteli Mezok.pdf',
			path: '/docs/9/programozas/HTML5 Urlapok es Beviteli Mezok.pdf'
		},
		{
			id: 'szemantikus-html-css',
			type: 'PDF',
			title: 'Szemantikus HTML és CSS Alapok',
			subtitle: 'Strukturális tagek, dobozmodell, stílusozás és elrendezések',
			fileName: 'Szemantikus HTML es CSS Alapok.pdf',
			path: '/docs/9/programozas/Szemantikus HTML es CSS Alapok.pdf'
		}
	];
</script>

<DocViewer
	badge="9. Évfolyam"
	title="Programozás Alapjai"
	subtitle="Webes technológiák, strukturális felépítés és kódolási alapok"
	{documents}
/>