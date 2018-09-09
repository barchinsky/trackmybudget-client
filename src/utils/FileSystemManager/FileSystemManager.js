import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { success, failed } from '@utils/task_statuses';

const TAG = 'FileSystemManager';
export default class FileSystemManager {
	static async saveData(data, path) {
		const targetDir = Platform.select({
			ios: RNFS.MainBundlePath,
			android: RNFS.DocumentDirectoryPath,
		});

		const fullPath = `${targetDir}/${path}`;
		console.log(`${TAG}.saveData(): fullPath: ${fullPath}`);

		try {
			await RNFS.writeFile(fullPath, data, 'utf8');

			return success();
		} catch (e) {
			return failed(`${TAG}.saveData():: Error: ${e.message}`);
		}
	}

	static async loadData(path) {
		const targetDir = Platform.select({
			ios: RNFS.MainBundlePath,
			android: RNFS.DocumentDirectoryPath,
		});

		const fullPath = `${targetDir}/${path}`;
		console.log(`${TAG}.loadData(): fullPath: ${fullPath}`);

		try {
			const data = await RNFS.readFile(fullPath);

			return success(data);
		} catch (e) {
			return failed(`${TAG}.saveData():: Error: ${e.message}`);
		}
	}

	static listDir(path = '') {
		try {
			const targetDir = Platform.select({
				ios: RNFS.MainBundlePath,
				android: RNFS.DocumentDirectoryPath,
			});

			RNFS.readDir(targetDir) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
				.then(result => {
					console.log('GOT RESULT', result);
				});
		} catch (e) {
			return failed(`${TAG}.listDir():: Error: ${e.message}`);
		}
	}
}
