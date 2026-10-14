<script>
	import DocViewer from '#lib/components/DocViewer.svelte';

	const documents = [
		{
			id: 'eszkozhasznalat',
			type: 'PDF',
			title: 'Digitális eszközhasználat és személyiség',
			subtitle: 'Hardveres alapismeretek, digitális lábnyom és személyiségvédelem',
			fileName: 'Digitális eszközhasználat és személyiség.pdf',
			path: '/docs/9/digitalis_kultura/Digitális eszközhasználat és személyiség.pdf'
		},
		{
			id: 'biztonsag',
			type: 'PDF',
			title: 'Biztonság a digitális térben',
			subtitle: 'Kiberbiztonság, jelszókezelés, adathalászat és adatvédelem',
			fileName: 'Biztonság a digitális térben.pdf',
			path: '/docs/9/digitalis_kultura/Biztonság a digitális térben.pdf'
		},
		{
			id: 'tudatossag',
			type: 'PDF',
			title: 'Digitális Tudatosság',
			subtitle: 'Kritikus médiafogyasztás, forráskritika és etikus internethasználat',
			fileName: 'Digitális Tudatosság.pdf',
			path: '/docs/9/digitalis_kultura/Digitális Tudatosság.pdf'
		}
	];
</script>

<DocViewer
	badge="9. Évfolyam"
	title="Digitális Kultúra"
	subtitle="Prezentációk, elméleti anyagok és digitális alapozó témakörök"
	{documents}
/>