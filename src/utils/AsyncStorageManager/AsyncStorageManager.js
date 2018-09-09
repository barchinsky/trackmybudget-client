import { AsyncStorage } from 'react-native';
import Transaction from '@models/transaction';
import Category from '@models/category';
import Budget from '@models/budget';

import moment from 'moment';
import {
	date as dateFormat,
	datetime as dateTimeFormat,
} from '@utils/dateFormats';

import { success, failed } from '@utils/task_statuses';

const TRANSACTIONS_KEY = 'transactions';
const CATEGORIES_KEY = 'categories';
const BUDGETS_KEY = 'budgets';

const TAG = 'AsyncStorageManager';
export default class AsyncStorageManager {
	static transactionsKey(userId) {
		return `${TRANSACTIONS_KEY}_${userId}`;
	}

	static categoriesKey(userId) {
		return `${CATEGORIES_KEY}_${userId}`;
	}

	static budgetsKey(userId) {
		return `${BUDGETS_KEY}_${userId}`;
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
			console.error(`${TAG}::getTransactions()::Error: ${e.message}`);
			return failed(e.message);
		}
	}

	static async getTransactionsByBudgetAndCategory(
		budget = null,
		targetCategoryId = null,
		userId = null
	) {
		console.log(
			`${TAG}.getTransactionsByBudgetAndCategory():: budget:${budget}, targetCategoryId: ${targetCategoryId}, userId: ${userId}`
		);
		if (!(budget && targetCategoryId && userId)) return [];

		const transactions = await AsyncStorageManager.getTransactions(userId);
		console.log(
			`${TAG}.getTransactionsByBudgetAndCategory():transactions.length: ${
				transactions.length
			}`
		);

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

			console.log(`${TAG}::deleteTransaction():result=${result}`);

			return result;
		} catch (e) {
			console.error(`${TAG}.deleteTransaction():: ${e.message}`);
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
			console.error(`${TAG}.updateTransactions()::Error:${e.message}`);

			return failed(e.message);
		}
	}

	static async _updateTransactions(transactions, userId) {
		if (!userId) {
			console.error(`${TAG}._updateTransactions()::No userId provided`);
			return failed(`${TAG}._updateTransactions()::No userId provided`);
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
			console.error(`${TAG}::_updateTransactions()::Error:${e.message}`);
			return failed(e.message);
		}
	}

	///////////////// Categories ///////////////////////////

	static async getCategories(userId) {
		try {
			const userCategoriesKey = AsyncStorageManager.categoriesKey(userId);
			const categories = await AsyncStorageManager.restoreData(
				userCategoriesKey,
				Category
			);

			console.log(
				`${TAG}.getCategories()::categories.length=${categories.length}`
			);

			return categories || [];
		} catch (e) {
			console.log('AsyncStorageManager()::getCategories():', e.message);
			return [];
		}
	}

	static async addCategory(category, userId) {
		try {
			const categories = await AsyncStorageManager.getCategories(userId);
			const updatedCategories = [category, ...categories];
			const result = await AsyncStorageManager._updateCategories(
				updatedCategories,
				userId
			);
			return result;
		} catch (e) {
			console.error(`${TAG}::addCategory()::Error ${e.message}`);
			return failed(e.message);
		}
	}

	static async updateCategory(category, userId) {
		try {
			const categories = await AsyncStorageManager.getCategories(userId);
			const updatedCategories = categories.map(
				c => (c.id === category.id ? category : c)
			);
			const result = await AsyncStorageManager._updateCategories(
				updatedCategories,
				userId
			);
			return result;
		} catch (e) {
			console.log(`${TAG}.updateCategory()::Error${e.message}`);
		}
	}

	static async deleteCategory(category, userId) {
		try {
			const categories = await AsyncStorageManager.getCategories(userId);
			const updatedCategories = categories.filter(c => c.id !== category.id);
			const result = await AsyncStorageManager._updateCategories(
				updatedCategories,
				userId
			);
			return result;
		} catch (e) {
			console.log('AsyncStorageManager.deleteCategory:', e.message);
		}
	}

	static async _updateCategories(categories, userId) {
		try {
			const userCategoriesKey = AsyncStorageManager.categoriesKey(userId);
			await AsyncStorageManager.deleteItem(userCategoriesKey);
			const serializedCategories = categories.map(c => c.serialize());

			await AsyncStorage.setItem(
				userCategoriesKey,
				JSON.stringify(serializedCategories)
			);

			return success();
		} catch (e) {
			console.log(`${TAG}._updateCategories():Error: ${e.message}`);
			return failed(`${TAG}._updateCategories():Error: ${e.message}`);
		}
	}

	///////////////////////// Budgets /////////////////////////////////

	static async getBudgets(userId) {
		const userBudgetsKey = AsyncStorageManager.budgetsKey(userId);
		const budgets = await AsyncStorageManager.restoreData(
			userBudgetsKey,
			Budget
		);

		console.log(`${TAG}.getBudgets()::Fetched budgets: ${budgets.length}`);
		const transactions = await AsyncStorageManager.getTransactions(userId);

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

		console.log(
			`${TAG}.getBudgets(): budgetsWithSpenAmount.length=${
				budgetsWithSpenAmount.length
			}`
		);

		return budgetsWithSpenAmount || [];
	}

	static async addBudget(budget, userId) {
		try {
			const oldBudgets = await AsyncStorageManager.getBudgets(userId);

			// console.log('oldBudgets:', oldBudgets);
			const newBudgets = [budget, ...oldBudgets];
			// console.log('newBudgets:', newBudgets);
			const result = await AsyncStorageManager._updateBudgets(
				newBudgets,
				userId
			);
			console.log(`${TAG}.addBudget(): result: ${result}`);
			return result;
		} catch (e) {
			console.error(`${TAG}::addBudget():: ${e.message}`);
			return failed(e.message);
		}
	}

	static async deleteBudget(budget, userId) {
		const oldBudgets = await AsyncStorageManager.getBudgets(userId);
		try {
			const newBudgets = oldBudgets.filter(b => b.id !== budget.id);
			const result = await AsyncStorageManager._updateBudgets(
				newBudgets,
				userId
			);
			return result;
		} catch (e) {
			console.error('AsyncStorageManager()::deleteBudget()::', e.message);
			return failed(e.message);
		}
	}

	static async updateBudget(budget, userId) {
		try {
			const oldBudgets = await AsyncStorageManager.getBudgets(userId);
			const newBudgets = oldBudgets.map(b => (b.id === budget.id ? budget : b));
			const result = await AsyncStorageManager._updateBudgets(
				newBudgets,
				userId
			);
			return result;
		} catch (e) {
			console.error('AsyncStorageManager()::updateBudget()::', e.message);
			return failed(e.message);
		}
	}

	static async _updateBudgets(budgets, userId) {
		try {
			const userBudgetsKey = AsyncStorageManager.budgetsKey(userId);
			await AsyncStorageManager.deleteItem(userBudgetsKey);

			const serializedBudgets = budgets.map(b => b.serialize());
			await AsyncStorage.setItem(
				userBudgetsKey,
				JSON.stringify(serializedBudgets)
			);

			return success();
		} catch (e) {
			console.error(`${TAG}::_updateBudgets():: ${e.message}`);
			return failed(e.message);
		}
	}

	// Utilities methods

	static async deleteItem(key) {
		// remove item from async storage
		try {
			console.log(`${TAG}.deleteItem(): key: ${key}`);
			await AsyncStorage.removeItem(key);
			return success();
		} catch (e) {
			console.error(`${TAG}::deleteItem()::Error: ${e.message}`);
			return failed(e.message);
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
			console.error(
				`${TAG}::restoreData: Failed to restore ${key}:${e.message}`
			);
			return failed(
				`${TAG}::restoreData(): Failed to restore ${key}:${e.message}`
			);
		}
	}

	static async __clear__() {
		console.warn(`${TAG}::WARNING: Clear AsyncStorage requested!`);
		await AsyncStorage.clear();
	}
}
