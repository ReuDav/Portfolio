<script>
	import DocViewer from '#lib/components/DocViewer.svelte';

	const documents = [
		{
			id: 'operatorok',
			type: 'PDF',
			title: 'Python Aritmetikai Operátorok és Elágazások',
			subtitle: 'Számítási műveletek, precedencia és döntési logikák',
			fileName: 'Python Aritmetikai Operátorok és Elágazások.pdf',
			path: '/docs/10/Python Aritmetikai Operátorok és Elágazások.pdf'
		},
		{
			id: 'while',
			type: 'PDF',
			title: 'A Python while Ciklus',
			subtitle: 'Feltételvezérelt ismétlés, számlálók és adatellenőrzés',
			fileName: 'A Python while Ciklus.pdf',
			path: '/docs/10/A Python while Ciklus.pdf'
		},
		{
			id: 'ciklusok',
			type: 'PDF',
			title: 'Python Ciklusok és Adatszerkezetek',
			subtitle: 'For ciklusok, listák kezelése és beépített függvények',
			fileName: 'Python Ciklusok és Adatszerkezetek.pdf',
			path: '/docs/10/Python Ciklusok és Adatszerkezetek.pdf'
		},
		{
			id: 'tetelek',
			type: 'PDF',
			title: 'Programozási Tételek Pythonban',
			subtitle: 'Alapvető algoritmusok, összegzés, keresés és eldöntés',
			fileName: 'Programozási Tételek Pythonban.pdf',
			path: '/docs/10/Programozási Tételek Pythonban.pdf'
		},
		{
			id: 'fajlkezeles-oop',
			type: 'PDF',
			title: 'Python Fájlkezelés és Objektumorientált Beolvasás',
			subtitle: 'Szöveges állományok olvasása, írása és adatmodellezés',
			fileName: 'Python Fájlkezelés és Objektumorientált Beolvasás.pdf',
			path: '/docs/10/Python Fájlkezelés és Objektumorientált Beolvasás.pdf'
		},
		{
			id: 'fuggvenyek-ppt',
			type: 'PPT',
			title: 'Python függvények',
			subtitle: 'Paraméterezés, visszatérési értékek és hatókörök',
			fileName: 'Python függvények.pptx',
			path: '/docs/10/Python függvények.pptx'
		},
		{
			id: 'oop-ppt',
			type: 'PPT',
			title: 'Python Objektum Orientált Programozás',
			subtitle: 'Osztályok, objektumok, adattagok és metódusok',
			fileName: 'Python Objektum Orientált Programozás.pptx',
			path: '/docs/10/Python Objektum Orientált Programozás.pptx'
		}
	];
</script>

<DocViewer
	badge="10. Évfolyam"
	title="Python Programozás Tananyagok"
	subtitle="Interaktív diasorok, tananyagok és letölthető segédletek"
	{documents}
/>