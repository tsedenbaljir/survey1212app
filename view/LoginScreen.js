import React, { Component } from 'react';
import Utils from '../utils/Utils';
import Loaiding from '../components/Loading';
import CheckBox from 'react-native-check-box';
import CodePush from "react-native-code-push";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { Alert, Text, TextInput, StyleSheet, View, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restartAllowed: true,
      progress: false,
      syncMessage: "",
      username: '',
      userpassword: '',
      isdouble: false,
      loading: false,
      isRemember: false,
      errorMessage: undefined,
      deviceId: '',
    };
  }

  _storeRememberME = async () => {
    //SAVING ASYNCSTORAGE VALUE FOR REMEMBER ME :
    if (this.state.isRemember) {
      await AsyncStorage.setItem('username', this.state.username);
      await AsyncStorage.setItem('userpassword', this.state.userpassword);
      await AsyncStorage.setItem('isRemember', 'yes');
    } else {
      const isRemember = AsyncStorage.getItem('isRemember');
      if (isRemember) {
        await AsyncStorage.removeItem('isRemember');
        //await AsyncStorage.clear();
      }
    }
  };

  async componentDidMount() {
    const { navigation } = this.props;

    navigation.setOptions({
      headerShown: false
    });

    // this.sync();
    this._checkForRememberMe();
  }

  codePushStatusDidChange(syncStatus) {
    CodePush.getUpdateMetadata().then((metadata) => {
      const ver = metadata !== null ? `v${metadata.appVersion} rev.${metadata.label.substring(1)}` : null;
      this.setState({ syncMessage: ver === null ? "" : ver });
      // console.log(ver)
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          this.setState({ syncMessage: "Апп-ын шинэчлэл шалгаж байна." });
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.setState({ syncMessage: "Апп-ын шинэчлэл татаж байна." });
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          this.setState({ syncMessage: "Awaiting user action." });
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          this.setState({ syncMessage: "Апп-ын шинэчлэж суулгаж байна." });
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          this.setState({ syncMessage: ver === null ? "" : ver, progress: false });
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          this.setState({ syncMessage: "Update cancelled by user.", progress: false });
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          this.setState({ syncMessage: "Апп шинэчлэгдсэн байна. \nАпп-ыг хаагаад дахин эхлүүлнэ үү.", progress: false });
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          this.setState({ syncMessage: "Апп шинэчлэх үед алдаа гарлаа.", progress: false });
          break;
      }
    });
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }

  sync() {
    CodePush.sync(
      {
        deploymentKey: Platform.OS === "ios" ? '7oB8i_zxWgSZQLj8OpioaRng_YC_wh0pWunZT' : 'MN8MZzY-x-oJ9KJBttqiZu-Smw4UtsEasJZGn',
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  _checkForRememberMe = async () => {
    const isRemember = await AsyncStorage.getItem('isRemember');
    if (isRemember) {
      const username1 = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('userpassword');
      this.setState({
        username: username1,
        userpassword: password,
        isRemember: true,
      });
      this.state.isRemember = true;
    } else {
      this.state.isRemember = false;
    }
  };

  _callInAsync = () => {
    this.props.navigation.navigate('UserConfirm');
  };

  _signInAsync = async () => {
    this.setState({ loading: true });
    if (this.state.username == '' || this.state.userpassword == '') {
      Alert.alert('Алдаа', 'Хэрэглэгчийн нэр, нууц үгээ шалгана уу');
      this.setState({ loading: false });
    } else {
      try {
        // const tokenid = await AsyncStorage.getItem('tokenid');
        await fetch(`${Utils.BASE_URL}/sample/user/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: "032401",
            userPassword: "603002",
          }),
        })
          .then((response) => response.json())
          .then(async (res) => {
            this.setState({ loading: true });
            if (res.status) {
              await AsyncStorage.setItem('user', JSON.stringify({ user: res.data }));
              this._storeRememberME();
              this.setState({ loading: false });
              this.props.navigation.navigate('Home');
            } else {
              Alert.alert(
                'Aлдаа',
                'Хэрэглэгчийн нэр, нууц үг буруу байна шалгана уу.',
              );
              this.setState({ loading: false });
            }
            this.setState({ loading: false });
          })
          .catch((error) => {
            Alert.alert(
              'Aлдаа',
              'Хэрэглэгчийн нэр, нууц үг буруу байна шалгана уу.',
            );
            // Alert.alert('f_login: ', error);
            this.setState({ loading: false });
          });
      } catch (error) {
        console.log(error);
        this.setState({ loading: false });
      }
      this.setState({ loading: false });
    }
  };

  render() {
    let progressView;

    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes}</Text>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: "100%", backgroundColor: "white" }}>
        {this.state.loading ? (
          <Loaiding />
        ) : (<View
          behavior="padding"
          enabled
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            padding: 10,
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={Utils.LOGO}
              style={{
                marginTop: "40%",
                bottom: 40,
                width: 120,
                height: 120,
              }}
            />
          </View>
          <View>
            <TextInput
              placeholder="Хэрэглэгчийн нэр"
              placeholderTextColor="grey"
              style={styles.inputStyles}
              onChangeText={(username) => {
                this.setState({ username });
              }}
              value={this.state.username}
            />
            <TextInput
              placeholder="Нууц үг"
              placeholderTextColor="grey"
              secureTextEntry
              style={styles.inputStyles}
              onChangeText={(userpassword) => {
                this.setState({ userpassword });
              }}
              value={this.state.userpassword}
            />
            <CheckBox
              style={{ padding: 10, color: "#005baa" }}
              checkBoxColor="#005baa"
              onClick={() => {
                this.setState({
                  isRemember: !this.state.isRemember,
                });
                console.log('CHECK', !this.state.isRemember);
              }}
              isChecked={this.state.isRemember}
              rightText="Намайг санах"
            />

            <TouchableOpacity
              style={{
                borderRadius: 6,
                backgroundColor: '#005baa',
                padding: 10,
                marginTop: 10,
              }}
              onPress={this._signInAsync}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Нэвтрэх
              </Text>
            </TouchableOpacity>
            <View style={{ justifyContent: "center", alignItems: "center", margin: 10 }}>
              {/* <Text>{this.state.syncMessage ? "Апп-ыг шинэчлэж байна." : ""}</Text> */}
              {progressView}
              <Text style={{ textAlign: "center" }}>{this.state.syncMessage || ""}</Text>
              {/* <TouchableOpacity 
                onPress={this.sync.bind(this)} 
                style={{
                  borderRadius: 6,
                  backgroundColor: 'green',
                  padding: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Check Update</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('UserManual1', { menu: 'Auth' })}>
                <Text style={{ color: "#005baa" }}>Ашиглах Заавар
                  <View>
                    <FontAwesomeIcon icon={faQuestionCircle} style={{ color: "#005baa", marginLeft: 10, marginBottom: -2.5 }} />
                  </View>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyles: {
    height: 50,
    width: width - 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 9,
    padding: 10,
    fontSize: 15,
    marginVertical: 10,
  },
});
