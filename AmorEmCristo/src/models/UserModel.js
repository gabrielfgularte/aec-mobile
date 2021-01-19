import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserModel {

  static STORAGE_KEY = '@amoremcristo/user';

  constructor(data) {
    this.data = data;
    this.json = JSON.stringify(data);
  }

  async save() {
    await AsyncStorage.setItem(UserModel.STORAGE_KEY, this.json);
  }

  static async logout() {
    await AsyncStorage.removeItem(UserModel.STORAGE_KEY);
  }

  static async load() {
    const data = await AsyncStorage.getItem(UserModel.STORAGE_KEY);
    if (data) return new UserModel(JSON.parse(data)).data;
    return null;
  }
}
