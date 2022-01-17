import { useContext } from 'react';
import { Context } from '../../contexts/notification';

export default function useNotification() {
	return useContext(Context);
}
