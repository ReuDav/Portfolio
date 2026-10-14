<script>
	import DocViewer from '#lib/components/DocViewer.svelte';

	const documents = [
		{
			id: 'eszkozhasznalat',
			type: 'PDF',
			title: 'Digitális eszközhasználat és személyiség',
			subtitle: 'Hardveres alapismeretek, digitális lábnyom és személyiségvédelem',
			fileName: 'Digitalis eszkozhasznalat es szemelyiseg.pdf',
			path: '/docs/9/digitalis_kultura/Digitalis eszkozhasznalat es szemelyiseg.pdf'
		},
		{
			id: 'biztonsag',
			type: 'PDF',
			title: 'Biztonság a digitális térben',
			subtitle: 'Kiberbiztonság, jelszókezelés, adathalászat és adatvédelem',
			fileName: 'Biztonsag a digitalis terben.pdf',
			path: '/docs/9/digitalis_kultura/Biztonsag a digitalis terben.pdf'
		},
		{
			id: 'tudatossag',
			type: 'PDF',
			title: 'Digitális Tudatosság',
			subtitle: 'Kritikus médiafogyasztás, forráskritika és etikus internethasználat',
			fileName: 'Digitalis Tudatossag.pdf',
			path: '/docs/9/digitalis_kultura/Digitalis Tudatossag.pdf'
		}
	];
</script>

<DocViewer
	badge="9. Évfolyam"
	title="Digitális Kultúra"
	subtitle="Prezentációk, elméleti anyagok és digitális alapozó témakörök"
	{documents}
/>