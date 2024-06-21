import React, { Component } from 'react';
import Utils from '../utils/Utils';
import Loaiding from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { Text, Alert, TouchableOpacity, Dimensions, View, StyleSheet } from 'react-native';

const { width } = Dimensions.get("window")
export default class HsesHomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      user: null,
    }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: 'Өрхийн өдрийн тэмдэглэл',
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexWrap: "nowrap", flexDirection: "row" }}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} style={{ color: "#0070aa", fontWeight: "bold" }} />
          <Text style={{ color: "#0070aa", fontWeight: "bold" }}>Буцах</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('Login')
        }}>
          <FontAwesomeIcon icon={faSignOut} style={{ color: "#aa0033" }} />
        </TouchableOpacity>
      ),
    });

    this.setState({ loading: true })
    const userToken = await AsyncStorage.getItem('user');
    if (userToken) {
      let user = JSON.parse(userToken).user;
      this.setState({ user: user, loading: false }, () => console.log(this.state));
    }
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        // backgroundColor:"#59637B"
      },
      image: {
        width: 70,
        height: 68,
      },
      text: {
        textAlign: 'center',
        color: "white",
        marginTop: 10,
        fontWeight: "600",
      },
    });

    return (
      this.state.loading ? <Loaiding /> :
        <View>
          <TouchableOpacity style={{
            borderRadius: 15,
            margin: 10,
            height: 100,
            backgroundColor: "#005baa"
          }}
            onPress={() => this.props.navigation.navigate('HsesEntryForm1')}>
            <View style={styles.container}>
              {/* <View style={{ width: 150, height: 100 }} >
                <Image
                  source={Utils.food}
                  style={styles.image}
                />
              </View> */}
              <View style={{ marginTop: 30 }} >
                <Text style={styles.text}>ӨРХИЙН ХҮНСНИЙ ХЭРЭГЛЭЭ</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{
            borderRadius: 15,
            marginHorizontal: 10,
            height: 100,
            backgroundColor: "#005baa"
          }}
            onPress={() => this.props.navigation.navigate('HsesEntryForm2')}>
            <View >
              {/* <View style={{ height: 150 }} >
                <Image
                  source={Utils.dinner}
                  style={styles.image}
                /></View> */}
              <View style={{ marginTop: 25 }} >
                <Text style={{ textAlign: 'center', color: "white",
                              fontWeight: "600", }}> ГЭРЭЭС ГАДУУР ХЭРЭГЛЭСЭН {'\n'}ӨРХИЙН ХҮНСНИЙ ХЭРЭГЛЭЭ,{'\n'} ЗОЧНЫ ТОО</Text>
              </View>
            </View>
          </TouchableOpacity>
          {
            (this.state.user != null && (this.state.user.verify == null || this.state.user.verify == 0)) &&
            <TouchableOpacity
              onPress={() => {
                fetch(`${Utils.BASE_URL}/form1/verify/${this.state.user.id}`, {
                  method: 'GET',
                  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                })
                  .then((response) => response.json())
                  .then((res) => {
                    if (res.data.length === 0) {
                      Alert.alert(
                        'Анхааруулга',
                        'Та дуусгах товч дарснаар мэдээллээ засах боломжгүй болно. Та итгэлтэй байна уу?',
                        [
                          {
                            text: 'Цуцлах',
                            onPress: () => console.log('Цуцлах'),
                            style: 'cancel',
                          },
                          {
                            text: 'Дуусгах', onPress: () => {
                              fetch(`${Utils.BASE_URL}/verify/${this.state.user.id}`, {
                                method: 'GET',
                                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                              })
                                .then((response) => response.json())
                                .then((res) => {
                                  if (res.status) {
                                    let user = { ...this.state.user }
                                    user.verify = res.data
                                    this.setState({ user })
                                  }
                                })
                                .catch(err => console.log(err))
                            }
                          },
                        ],
                        { cancelable: false },
                      );
                    } else {
                      let days = [];
                      res.data.map((v, i) => { days.push(v.dayName) });
                      let msg = '';
                      if (days.length > 0) {
                        msg = `${days.toString()} ${days.length > 1 ? 'гарагуудын' : 'гарагийн'}`
                      }
                      Alert.alert('Анхааруулга', `Та ${msg} гэрээс гадуур хэрэглэсэн өрхийн хүнсний хэрэглээ оруулаагүй байна.`)
                    }
                  })
                  .catch(err => console.log(err))
              }}
            >
              <Text style={{ textAlign: 'center', color: "#FFF", fontSize: width / 30 }}>{`7 ХОНОГИЙН ӨДРИЙН ТЭМДЭГЛЭЛ ДУУСГАХ`}</Text>
            </TouchableOpacity>
          }
        </View>
    );
  }
}
