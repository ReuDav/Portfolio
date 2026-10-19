<script>
	import DocViewer from '#lib/components/DocViewer.svelte';

	const documents = [
		{
			id: 'urlapok',
			type: 'PPT',
			title: 'HTML5 Űrlapok és Beviteli Mezők',
			subtitle: 'Form elemek, beviteli típusok, validáció és adatbekérés',
			fileName: 'HTML5 Urlapok es Beviteli Mezok.pptx',
			path: '/docs/9/programozas/HTML5 Urlapok es Beviteli Mezok.pptx'
		},
		{
			id: 'szemantikus-html-css',
			type: 'PPT',
			title: 'Szemantikus HTML és CSS Alapok',
			subtitle: 'Strukturális tagek, dobozmodell, stílusozás és elrendezések',
			fileName: 'Szemantikus HTML es CSS Alapok.pptx',
			path: '/docs/9/programozas/Szemantikus HTML es CSS Alapok.pptx'
		},
		{
			id: 'gyakorlo-feladatsor-html',
			type: 'PDF',
			title: 'Gyakorló feladatsor HTML',
			subtitle: 'Űrlap tagek és CSS gyakorlati feladatok',
			fileName: 'Gyakorlo feladatsor HTML.pdf',
			path: '/docs/9/programozas/Gyakorlo feladatsor HTML.pdf'
		}
	];
</script>

<DocViewer
	badge="9. Évfolyam"
	title="Programozás Alapjai"
	subtitle="Webes technológiák, prezentációk és kódolási alapok"
	{documents}
/>