import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import themes from '@utils/themes';

//import LoginScreen from '@screens/Login/Login';
import SplashScreen from '@screens/Splash/Splash';
// import Card from '@components/Card/Card';
import BudgetList from '@components/Budget/List/List';
//import HomeScreen from '@screens/Home/Home';
// import CategoryCard from '@components/Category/Card/Card';
// import TransactionCard from '@components/Transaction/Card/Card';
// import TransactionList from '@components/Transaction/List/List';

import { getUserData } from '@api/local-storage';
// import { fetchBudgets } from '@redux/actions/budgets/fetch';
import { loginSuccess } from '@redux/actions/account';
import { fetchCategories } from '@redux/actions/categories/fetch';
import { fetchTransactions } from '@redux/actions/transactions/fetch';
import { fetchBudgets } from '@redux/actions/budgets/fetch';

// import Transaction from '@models/transaction';
// import Category from '@models/category';
// import TransactionForm from '@components/Transaction/Form/Form';
// import BudgetCategoryCard from '@components/Budget/CategoryCard/CategoryCard';

import styles from './_styles';

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			isLoggedIn: false,
		};
	}

	componentDidMount() {
		themes[0].apply();

		this.loadUserData();
	}

	loadUserData = async () => {
		const userData = await getUserData();
		if (!userData.userId) {
			// console.log('userData.userId:', userData.userId);
			this.props.navigation.navigate('LoginScreen');
		} else {
			this.props.dispatch(loginSuccess(userData));

			const initStack = [
				this.props.dispatch(fetchBudgets()),
				this.props.dispatch(fetchCategories()),
				this.props.dispatch(fetchTransactions()),
			];
			await Promise.all(initStack);

			this.setState({ isLoaded: true, isLoggedIn: true });
		}
		// }
	};

	static getDerivedStateFromProps(props, state) {
		if (props.userData.userId && state.isLoggedIn === false) {
			return { isLoggedIn: true, isLoaded: true };
		}

		return null;
	}

	renderBudets = () => {
		const budgets = this.props.budgets;

		return (
			<BudgetList budgets={budgets} onBudgetPress={this.onBudgetSelected} />
		);
	};

	onBudgetSelected = budget => {
		// console.log('onBudgetSelected()::', budget);
		this.props.navigation.navigate('BudgetOverviewScreen', { budget });
	};

	renderContent() {
		const { isLoaded } = this.state;
		//
		// const cat1 = new Category({
		// 	_id: '5ae232093305571d3ca5d347',
		// 	_userId: '5adb7ab3ee93b8143273d7ce',
		// 	_name: 'Cat1Updated',
		// 	_color: '#cf3232',
		// 	__v: 0,
		// });

		// if (true) return <BudgetCategoryCard category={cat1} readOnly={true} />;

		return isLoaded ? this.renderBudets() : null;
	}

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderContent()}</Theme.View>
		);
	}
}

Home.navigationOptions = () => {
	return { title: 'Budgets' };
};

Home.propTypes = {
	dispatch: PropTypes.func,
	userData: PropTypes.object,
	navigation: PropTypes.object,
	budgets: PropTypes.array,
};

function mapStateToProps(state) {
	return {
		userData: state.userData,
		budgets: state.budgets.data,
		transactions: state.transactions.data,
	};
}

export default connect(mapStateToProps)(Home);
