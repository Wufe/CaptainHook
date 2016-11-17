import Action from '../Action';
import {PING} from '../../constants';

export
	const ping: () => Action<any> =
		() => {
			return {
				type: PING
			};
		};