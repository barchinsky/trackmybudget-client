import { AsyncStorage } from 'react-native';
import Transaction from '@models/transaction';

export default class AsyncStorageManager {
	static async getTransactions() {
		try {
			const ASData = await AsyncStorage.getItem('transactions');
			console.log(
				'AsyncStorageManger()::getTransactions(): transactions:',
				ASData
			);
			if (ASData === null) {
				return [];
			}
			const deserializedData = JSON.parse(ASData);
			const deserializedTransactions = deserializedData.map(serialized =>
				Transaction.deserialize(serialized)
			);
			return deserializedTransactions;
		} catch (e) {
			throw new Error(
				'AsyncStorageManager()::getTransactions() Failed to fetch transactions:' +
					e.message
			);
		}
	}

	static async addTransaction(transaction) {
		try {
			await AsyncStorage.mergeItem(
				'transactions',
				JSON.stringify([transaction])
			);
			return 0;
		} catch (e) {
			throw new Error(
				'AsyncStorageManager()::addTransaction() Failed to store transaction:' +
					e.message
			);
		}
	}
}
