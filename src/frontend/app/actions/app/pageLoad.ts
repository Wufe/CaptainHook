import Action from '../Action';
import {App} from '../../states';
import {PAGE_LOADING} from '../../constants';

export
	const setPageLoading: () => Action<App> =
		() => {
			return {
				type: PAGE_LOADING,
				payload: {
					loading: true
				}
			};
		};

export
	const setPageLoaded: () => Action<App> =
		() => {
			return {
				type: PAGE_LOADING,
				payload: {
					loading: false
				}
			};
		};