import { AsyncStorage } from 'react-native';
import Transaction from '@models/transaction';
import Category from '@models/category';
import Budget from '@models/budget';

const TRANSACTIONS_KEY = 'transactions';
const CATEGORIES_KEY = 'categories';

export default class AsyncStorageManager {
	static async getTransactions() {
		const key = 'transactions';
		const transactions = await AsyncStorageManager.restoreData(
			key,
			Transaction
		);
		return transactions;
	}

	static async addTransaction(transaction) {
		try {
			const transactions = await AsyncStorageManager.getTransactions();
			console.log('addTransaction::transactions', transactions);
			const updatedTransactions = [transaction, ...transactions];
			console.log('addTransaction::updatedTransactions:', updatedTransactions);
			await AsyncStorageManager._updateTransactions(updatedTransactions);
			return 1;
		} catch (e) {
			throw new Error(
				'AsyncStorageManager()::addTransaction() Failed to store transaction:' +
					e.message
			);
		}
	}

	static async deleteTransaction(transaction) {
		try {
			const transactions = await AsyncStorageManager.getTransactions();
			const updatedTransactions = transactions.filter(
				t => t.id !== transaction.id
			);
			AsyncStorageManager._updateTransactions(updatedTransactions);
		} catch (e) {
			console.log('AsyncStorageManager().deleteTransaction()::', e.message);
			throw new Error(
				`AsyncStorageManager().deleteTransaction()::${e.message}`
			);
		}
	}

	static async updateTransaction(transaction) {
		try {
			const transactions = await AsyncStorageManager.getTransactions();
			const updatedTransactions = transactions.map(
				t => (t.id === transaction.id ? transaction : t)
			);
			await AsyncStorageManager._updateTransactions(updatedTransactions);
			return 1;
		} catch (e) {
			throw new Error(
				`AsyncStorageManager().updateTransactions():: Update failed:${
					e.message
				}`
			);
		}
	}

	static async _updateTransactions(transactions) {
		const storageKey = 'transactions';
		await AsyncStorageManager.deleteItem(storageKey);
		const serializedTransactions = transactions.map(t => t.serialize());
		console.log('serializedTransactions:', serializedTransactions);
		await AsyncStorage.setItem(
			storageKey,
			JSON.stringify(serializedTransactions)
		);
	}

	static async getCategories() {
		try {
			const categories = AsyncStorageManager.restoreData(
				CATEGORIES_KEY,
				Category
			);

			return categories || [];
		} catch (e) {
			console.log('AsyncStorageManager()::getCategories():', e.message);
			return [];
		}
	}

	static async addCategory(category) {
		try {
			const categories = await AsyncStorageManager.getCategories();
			const updatedCategories = [category, ...categories];
			await AsyncStorageManager._updateCategories(updatedCategories);
			return true;
		} catch (e) {
			return false;
		}
	}

	static async updateCategory(category) {
		try {
			const categories = await AsyncStorageManager.getCategories();
			const updatedCategories = categories.map(
				c => (c.id === category.id ? category : c)
			);
			await AsyncStorageManager._updateCategories(updatedCategories);
			return 1;
		} catch (e) {
			console.log('AsyncStorageManager.updateCategory:', e.message);
		}
	}

	static async deleteCategory(category) {
		try {
			const categories = await AsyncStorageManager.getCategories();
			const updatedCategories = categories.filter(c => c.id !== category.id);
			await AsyncStorageManager._updateCategories(updatedCategories);
			return 1;
		} catch (e) {
			console.log('AsyncStorageManager.deleteCategory:', e.message);
		}
	}

	static async _updateCategories(categories) {
		try {
			await AsyncStorageManager.deleteItem(CATEGORIES_KEY);
			const serializedCategories = categories.map(c => c.serialize());
			console.log(
				'AsyncStorageManager._updateCategories(): serializeCategories:',
				serializedCategories
			);
			await AsyncStorage.setItem(
				CATEGORIES_KEY,
				JSON.stringify(serializedCategories)
			);
		} catch (e) {
			console.log('AsyncStorageManager()._updateCategories:', e.message);
		}
	}

	static async deleteItem(key) {
		try {
			await AsyncStorage.removeItem(key);
			return true;
		} catch (e) {
			console.log(e.message);
			return false;
		}
	}

	static async restoreData(key, Instance) {
		try {
			const savedData = (await AsyncStorage.getItem(key)) || [];
			console.log(`AsyncStorageManager()::restoreData::${key}: ${savedData}`);
			if (!savedData.length) {
				return [];
			}
			const deserializedData = JSON.parse(savedData);
			console.log('deserializedData:', deserializedData);
			const objectsInstances = deserializedData.map(serialized => {
				// console.log('serialized:', serialized);
				return Instance.deserialize(serialized);
			});
			return objectsInstances;
		} catch (e) {
			console.log(
				`AsyncStorageManager()::restoreData: Failed to restore ${key}:${
					e.message
				}`
			);
			return 0;
		}
	}

	static async __clear__() {
		await AsyncStorage.clear();
	}
}
