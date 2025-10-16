import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function resetData() {
	const router = useRouter();
	useEffect(() => {
		const reset = async() => {
			AsyncStorage.removeItem("USED_NUMBERS");
			router.replace('/');
		}
		reset();
	});
}