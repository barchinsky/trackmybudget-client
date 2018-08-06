import Budget from '@models/budget';

describe('Budget', () => {
	test('inits', () => {
		expect(() => {
			const b = new Budget();
		}).not.toThrow();
	});

	test('.serialize()', () => {
		const raw_data = {
			id: 1,
			name: 'test budget',
			startDate: '2018-05-01 14:20',
			endDate: '2018-05-30 14:20',
			spentAmount: 0,
			estimate: 1400,
		};

		const b = new Budget(raw_data);
		expect(b.name)
			.toEqual(raw_data.name);

		expect(() => {
			b.serialize();
		}).not.toThrow();

		const serializationExpectedResult = JSON.stringify(raw_data);
		const serializationResult = b.serialize();

		expect(serializationResult)
			.toEqual(serializationExpectedResult);

		console.log(JSON.stringify(b));
	});

	test('.deserialize()', () => {
		const raw_data = {
			id: 1,
			name: 'test budget',
			startDate: '2018-05-01 14:20',
			endDate: '2018-05-30 14:20',
			spentAmount: 0,
			estimate: 1400,
		};

		const initialBudget = new Budget(raw_data);
		const serializedBudget = initialBudget.serialize();

		const restoredBudget = Budget.deserialize(serializedBudget);

		expect(restoredBudget.id)
			.toEqual(initialBudget.id);
	});
});
