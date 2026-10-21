<script>
	import DocViewer from '#lib/components/DocViewer.svelte';

	const documents = [
		{
			id: 'urlapok',
			type: 'PPT',
			title: 'HTML5 Űrlapok és Beviteli Mezők',
			subtitle: 'Form elemek, beviteli típusok, validáció és adatbekérés',
			fileName: 'HTML5 Űrlapok és Beviteli Mezők.pptx',
			path: '/docs/9/programozas/HTML5 Űrlapok és Beviteli Mezők.pptx'
		},
		{
			id: 'szemantikus-html-css',
			type: 'PPT',
			title: 'Szemantikus HTML és CSS Alapok',
			subtitle: 'Strukturális tagek, dobozmodell, stílusozás és elrendezések',
			fileName: 'Szemantikus HTML és CSS Alapok.pptx',
			path: '/docs/9/programozas/Szemantikus HTML és CSS Alapok.pptx'
		},
		{
			id: 'gyakorlo-feladatsor-html',
			type: 'PDF',
			title: 'Gyakorló feladatsor HTML',
			subtitle: 'Űrlap tagek és CSS gyakorlati feladatok',
			fileName: 'Gyakorlo feladatsor HTML.pdf',
			path: '/docs/9/programozas/Gyakorlo feladatsor HTML.pdf'
		},
		{
			id: 'a-legfontosabb-css-tulajdonsagok',
			type: 'PDF',
			title: 'A Legfontosabb CSS Tulajdonságok',
			subtitle: 'Leggyakrabban használt CSS tulajdonságok összefoglalása',
			fileName: 'A Legfontosabb CSS Tulajdonságok.pdf',
			path: '/docs/9/programozas/A Legfontosabb CSS Tulajdonságok.pdf'
		}
	];
</script>

<DocViewer
	badge="9. Évfolyam"
	title="Programozás Alapjai"
	subtitle="Webes technológiák, prezentációk és kódolási alapok"
	{documents}
/>