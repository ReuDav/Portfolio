import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import type { SortableGridDragEndParams, SortableGridRenderItem } from 'react-native-sortables';
import Sortable from 'react-native-sortables';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import LoadingScreen from './loading';
import "@/global.css"
import CookiePopup from "@/components/cookies"

const SOLUTION: string[][] = [
	["1. lépés", "2. lépés", "3. lépés", "4. lépés", "5. lépés"],
	["Első", "Második", "Harmadik", "Negyedik", "Ötödik"],
	["Egy", "Kettő", "Három", "Négy", "Öt"],
];
const router = useRouter();

async function loadValue(key:string, _default:any=null): Promise<any | null> {
	  const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : _default;
}
async function saveValue(key:string, value:any): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

function Random(min: number, max: number, notInclude: number[] = []): number {
  let tries = 0;
  while (tries < 50) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!notInclude.includes(num)) {
      return num;
    }
    tries++;
  }
  throw new Error("Random(): no valid number found");
}

async function getTask(): Promise<{ index: number, task: string[]}> {
	function RandomizeArray<T>(arr: T[]): T[] {
		const new_arr = [...arr];
		for (let i = new_arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[new_arr[i], new_arr[j]] = [new_arr[j], new_arr[i]];
		}
		if (JSON.stringify(new_arr) === JSON.stringify(arr)) {
			return RandomizeArray(arr);
		} 
		return new_arr;
	}
  let USED_NUMBERS:number[] = await loadValue("USED_NUMBERS", []);
  console.log(USED_NUMBERS, SOLUTION)
  if (USED_NUMBERS.length >= SOLUTION.length) {
    router.push('/finished');
    return { index: -1, task: []}; 
  }
  const rnd = Random(0, SOLUTION.length - 1, USED_NUMBERS);

  return {index:rnd, task:RandomizeArray(SOLUTION[rnd])};
}


export default function Grid() {
	const [data, setData] = useState<string[] | null>(null);
	const [index, setIndex] = useState<number | null>(null);
  const [cookies_accepted, setCookies] = useState<boolean|null>(null);

	useEffect(() => {
		(async () => {
		  const result = await getTask();
		  setData(result.task);
		  setIndex(result.index);
      setCookies(await loadValue("cookies_accepted", false))
		})();
  	}, []);
  
	const renderItem = useCallback<SortableGridRenderItem<string>>(
		({ item }) => (
			<View style={styles.card}>
				<Text>{item}</Text>
			</View>
		),
		[]
	);

const CheckOrder = async () => {
  const IsCorrect = index !== null && JSON.stringify(data) === JSON.stringify(SOLUTION[index]);
  console.log('Is correct:', IsCorrect);

  if (IsCorrect) {
    let USED_NUMBERS:number[] = await loadValue("USED_NUMBERS");
		// Prevent duplicate values
		const numberSet = new Set(USED_NUMBERS);
		numberSet.add(index!);
		USED_NUMBERS = Array.from(numberSet);
		await saveValue("USED_NUMBERS", USED_NUMBERS);
    // ✅ Ha ez volt az utolsó feladat
    if (USED_NUMBERS.length >= SOLUTION.length) {
      try {
        const timestamp = new Date().toISOString();
        const payload = {
          id: null,
          solution: SOLUTION,
          created_at: timestamp,
          updated_at: timestamp,
        };

        const response = await fetch('http://127.0.0.1:8000/api/quiz-solution', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Fetch error: ${response.status}`);
        }

        console.log('✅ Összes feladat elküldve a szervernek!');
        const result = await response.json();
        console.log('Szerver válasz:', result);

        Alert.alert('🎉 Kész!', 'Minden feladatot teljesítettél, adat elküldve!');
        router.push('/finished');
      } catch (err) {
        console.error('❌ Hiba a fetch során:', err);
        Alert.alert('Hiba', 'Nem sikerült elküldeni az adatokat a szervernek.');
      }
      return;
    }

    // ✅ Egyébként: még vannak hátralévő feladatok
    const next = await getTask();
    setData(next.task);
    setIndex(next.index);

    router.push({
      pathname: '/task_complete',
      params: {
        completed: USED_NUMBERS.length,
        total: SOLUTION.length,
      },
    });
  } else {
    router.push('/incorrect');
  }
};

	if (!data) {
    	return <LoadingScreen />;
  	}
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Sortable.Grid
				columns={1}
				data={data}
				renderItem={renderItem}
				rowGap={10}
				columnGap={10}
				onDragEnd={(params: SortableGridDragEndParams<string>) => {setData(params.data);}}
				overDrag='none'
				dragActivationDelay={0}
			/>

			<View style={{ marginTop: 20, marginHorizontal: 50 }}>
				<Button title="Ellenőrzés" onPress={CheckOrder} />
			</View>
      {cookies_accepted == false && <CookiePopup/>}
		</View>
	);

}

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'rgba(0, 152, 119, 1)',
		height: 100,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginInline: 50
	}
});