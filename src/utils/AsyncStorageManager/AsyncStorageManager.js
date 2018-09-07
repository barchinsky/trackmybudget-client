import { AsyncStorage } from 'react-native';
import Transaction from '@models/transaction';
import Category from '@models/category';
import Budget from '@models/budget';

import moment from 'moment';
import {
	date as dateFormat,
	datetime as dateTimeFormat,
} from '@utils/dateFormats';

const TRANSACTIONS_KEY = 'transactions';
const CATEGORIES_KEY = 'categories';
const BUDGETS_KEY = 'budgets';

export default class AsyncStorageManager {
	static TAG = 'AsyncStorageManager';

	static transactionsKey(userId) {
		return `${TRANSACTIONS_KEY}_${userId}`;
	}

	static async getTransactions(userId) {
		try {
			const userTransactionsKey = AsyncStorageManager.transactionsKey(userId);
			const transactions = await AsyncStorageManager.restoreData(
				userTransactionsKey,
				Transaction
			);
			return transactions;
		} catch (e) {
			console.error('AsyncStorageManager::getTransactions()::', e.message);
			return 0;
		}
	}

	static async getTransactionsByBudgetAndCategory(
		userId = null,
		budget = null,
		targetCategoryId = null
	) {
		if (!(budget && targetCategoryId && !userId)) return [];

		const transactions = await AsyncStorageManager.getTransactions(userId);

		const budgetStartDate = moment(budget.startDate, dateFormat);
		const budgetEndDate = moment(budget.endDate, dateFormat);

		const filteredTransactions = transactions.filter(t => {
			const transactionDate = moment(t.date, dateTimeFormat);

			return (
				transactionDate.isBetween(budgetStartDate, budgetEndDate) &&
				t.categoryId == targetCategoryId
			);
		});

		return filteredTransactions;
	}

	static async addTransaction(transaction, userId) {
		try {
			const transactions = await AsyncStorageManager.getTransactions(userId);
			// console.log('addTransaction::transactions', transactions);
			const updatedTransactions = [transaction, ...transactions];
			// console.log('addTransaction::updatedTransactions:', updatedTransactions);
			const result = await AsyncStorageManager._updateTransactions(
				updatedTransactions,
				userId
			);

			return result;
		} catch (e) {
			return failed(
				`Error::AsyncStorageManager.addTransaction()::${e.message}`
			);
		}
	}

	static async deleteTransaction(transaction, userId) {
		try {
			const transactions = await AsyncStorageManager.getTransactions(userId);

			// console.log(
			// 	`${AsyncStorageManager.TAG}::transactions before delete:${
			// 		transactions.length
			// 	}`
			// );
			const updatedTransactions = transactions.filter(
				t => t.id !== transaction.id
			);
			// console.log(
			// 	`${AsyncStorageManager.TAG}::transactions after delete:${
			// 		updatedTransactions.length
			// 	}`
			// );
			const result = await AsyncStorageManager._updateTransactions(
				updatedTransactions,
				userId
			);

			console.log(
				`${AsyncStorageManager.TAG}::deleteTransaction():result=${result}`
			);

			return result;
		} catch (e) {
			console.error(
				`${AsyncStorageManager.TAG}.deleteTransaction():: ${e.message}`
			);
			return failed(e.message);
		}
	}

	static async updateTransaction(transaction, userId) {
		try {
			const transactions = await AsyncStorageManager.getTransactions(userId);
			const updatedTransactions = transactions.map(
				t => (t.id === transaction.id ? transaction : t)
			);
			const result = await AsyncStorageManager._updateTransactions(
				updatedTransactions,
				userId
			);

			return result;
		} catch (e) {
			console.error(
				`AsyncStorageManager().updateTransactions():: Update failed:${
					e.message
				}`
			);

			return failed(e.message);
		}
	}

	static async _updateTransactions(transactions, userId) {
		if (!userId) {
			throw new Error(
				'AsyncStorageManager()._updateTransactions()::No userId provided'
			);
		}

		try {
			const userTransactionsKey = AsyncStorageManager.transactionsKey(userId);
			await AsyncStorageManager.deleteItem(userTransactionsKey);
			const serializedTransactions = transactions.map(t => t.serialize());
			// console.log('serializedTransactions:', serializedTransactions);
			await AsyncStorage.setItem(
				userTransactionsKey,
				JSON.stringify(serializedTransactions)
			);

			return success();
		} catch (e) {
			console.error('AsyncStorageManager()::', e);
			return failed(e.message);
		}
	}

	///////////////// Categories ///////////////////////////
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
			console.error('AsyncStorageManager()::addCategory()::', e.message);
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
			// console.log(
			// 	'AsyncStorageManager._updateCategories(): serializeCategories:',
			// 	serializedCategories
			// );
			await AsyncStorage.setItem(
				CATEGORIES_KEY,
				JSON.stringify(serializedCategories)
			);
		} catch (e) {
			console.log('AsyncStorageManager()._updateCategories:', e.message);
		}
	}

	///////////////////////// Budgets /////////////////////////////////

	static async getBudgets() {
		const budgets = await AsyncStorageManager.restoreData(BUDGETS_KEY, Budget);
		const transactions = await AsyncStorageManager.getTransactions();

		const budgetsWithSpenAmount = budgets.map(budget => {
			// get spent amount of already added transactions that fits budget params
			// console.log('budget::', budget);
			const budgetStartDate = moment(budget.startDate, dateFormat);
			const budgetEndDate = moment(budget.endDate, dateFormat);

			// console.log('budgetStartDate:', budgetStartDate.format(dateTimeFormat));
			// console.log('budgetEndDate:', budgetEndDate.format(dateTimeFormat));

			const spentAmount = transactions.reduce((acc, transaction) => {
				// console.log('transaction::', transaction);
				const transactionDate = moment(transaction.date, dateTimeFormat);
				// console.log(
				// 	'transactionDate:',
				// 	transactionDate.format(dateTimeFormat),
				// 	transactionDate.isBetween(budgetStartDate, budgetEndDate)
				// );
				const amount = transactionDate.isBetween(budgetStartDate, budgetEndDate)
					? +transaction.amount
					: 0;

				return acc + amount;
			}, 0);
			budget.spentAmount = spentAmount;

			// console.log('getBudget()::spentAmount::', spentAmount);

			return budget;
		});

		// console.log('budgetsWithSpenAmount:', budgetsWithSpenAmount);

		return budgetsWithSpenAmount;
	}

	static async addBudget(budget) {
		try {
			const oldBudgets = await AsyncStorageManager.getBudgets();

			// console.log('oldBudgets:', oldBudgets);
			const newBudgets = [budget, ...oldBudgets];
			// console.log('newBudgets:', newBudgets);
			await AsyncStorageManager._updateBudgets(newBudgets);
			return 1;
		} catch (e) {
			console.error('AsyncStorageManager()::addBudget()::', e.message);
			return 0;
		}
	}

	static async deleteBudget(budget) {
		const oldBudgets = await AsyncStorageManager.getBudgets();
		try {
			const newBudgets = oldBudgets.filter(b => b.id !== budget.id);
			await AsyncStorageManager._updateBudgets(newBudgets);
			return 1;
		} catch (e) {
			console.error('AsyncStorageManager()::deleteBudget()::', e.message);
			return 0;
		}
	}

	static async updateBudget(budget) {
		try {
			const oldBudgets = await AsyncStorageManager.getBudgets();
			const newBudgets = oldBudgets.map(b => (b.id === budget.id ? budget : b));
			await AsyncStorageManager._updateBudgets(newBudgets);
			return 1;
		} catch (e) {
			console.error('AsyncStorageManager()::updateBudget()::', e.message);
			return 0;
		}
	}

	static async _updateBudgets(budgets) {
		try {
			await AsyncStorageManager.deleteItem(BUDGETS_KEY);
			const serializedBudgets = budgets.map(b => b.serialize());
			await AsyncStorage.setItem(
				BUDGETS_KEY,
				JSON.stringify(serializedBudgets)
			);
		} catch (e) {
			console.error('AsyncStorageManager()::_updateBudgets()::', e.message);
		}
	}

	// Utilities methods

	static async deleteItem(key) {
		// remove item from async storage
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
			// console.log(`AsyncStorageManager()::restoreData::${key}: ${savedData}`);
			if (!savedData.length) {
				return [];
			}
			const deserializedData = JSON.parse(savedData);
			// console.log('deserializedData:', deserializedData);
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

export const ASM_STATUS = {
	SUCCESS: 1,
	FAILED: 0,
};

// helpers
function success() {
	return {
		status: ASM_STATUS.SUCCESS,
		msg: '',
	};
}

function failed(msg) {
	return {
		status: ASM_STATUS.FAILED,
		msg: msg,
	};
}
