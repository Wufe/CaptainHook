import Action from '../Action';
import {App} from '../../states';
import {NOTIFICATION_DELETE} from '../../constants';

export
	const deleteNotification: ( id: number | string ) => Action<App> =
		( id ) => {
			return {
				type: NOTIFICATION_DELETE,
				payload: {
					id
				}
			}
		};