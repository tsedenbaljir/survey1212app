import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Text, View, Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons/faPhoneVolume';
import Loaiding from '../components/Loading';
import Utils from '../utils/Utils';

const { width } = Dimensions.get('window');
export default class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      OPERATOR: '',
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: 'Холбоо барих',
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

    const userToken = await AsyncStorage.getItem('user'); // usertoken-g avna
    if (userToken) {
      let user = JSON.parse(userToken).user;
      this.setState({ OPERATOR: user.OPERATOR }, () => {
        this.getData(this.state.OPERATOR)
      });

    }
    // this.getData();
    // this.props.navigation.setParams({ logout: this._signOutAsync });
  };

  getData = async (OPERATOR) => {
    this.setState({ loading: true });
    await fetch(`${Utils.BASE_URL}/user/operator/${OPERATOR}`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status) {
          this.setState(
            {
              data: res.data,
              loading: false,
            },
            () => console.log('LIST', this.state),
          );
        } else {
          alert(res.message);
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  // _signOutAsync = async () => {
  //   // await AsyncStorage.removeItem('user');
  //   // this.props.navigation.navigate('Auth');
  // };

  render() {
    const { data } = this.state;
    return (
      <View style={{ backgroundColor: "white", height: "100%" }}>
        {this.state.loading ? (
          <Loaiding />
        ) : (
          <View style={{ backgroundColor: "#d7eefa", height: "100%" }}>
            <View style={{
              backgroundColor: "white",
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 30
            }}>
              <Image
                source={require('../assets/logo1.png')}
                style={{ height: 100, width: 100, marginVertical: 20 }}
              />
              <Text style={{ fontWeight: 'bold', marginTop: 20 }}>ҮНДЭСНИЙ СТАТИСТИКИЙН ХОРОО</Text>
              <View style={{ marginTop: 25, textAlign: "left" }}>
                <Text style={{ fontSize: 15 }}>
                  <View style={{
                    padding: 5,
                    borderWidth: 1,
                    marginBottom: -5,
                    borderRadius: 20,
                    borderColor: "#B1B1B1",
                    backgroundColor: "#E3E3E3",
                  }}>
                    <FontAwesomeIcon icon={faUser} size={10}
                      style={{
                        color: "#B1B1B1",
                      }}
                    />
                  </View>  {data.OPERATORNAME}
                </Text>
              </View>
            </View>
            <View style={{
              backgroundColor: "white",
              paddingTop: 20,
              height: "100%",
              marginTop: 20
            }}>
              {
                this.state.OPERATOR !== null &&
                <View>
                  {/* <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>СУДЛААЧИЙН МЭДЭЭЛЭЛ</Text> */}
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      width: "100%", paddingLeft: 20
                    }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Гар утас
                      </Text>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: 'center',
                          marginTop: 10
                        }}
                        onPress={() => Linking.openURL(`tel:${data.OPERATORPHONENUMBER}`)}
                      >
                        <Text style={{
                          height: 20,
                          fontSize: 15,
                          color: "#616161",
                          width: width - 100,
                          // fontWeight: "bold",
                        }}>
                          +976-{data.OPERATORPHONENUMBER}
                        </Text>
                        <View style={{ backgroundColor: "red" }}>
                          <FontAwesomeIcon
                            icon={faPhoneVolume}
                            size={25}
                            style={{
                              color: "#5dba73",
                              marginTop: -10
                            }} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", paddingLeft: 20, marginTop: 60 }}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Ажлын утас
                      </Text>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: 'center',
                          marginTop: 10
                        }}
                        onPress={() => Linking.openURL(`tel:70141212`)}
                      >
                        <Text style={{
                          fontSize: 15,
                          height: 20,
                          color: "#616161",
                          // fontWeight: "bold",
                          width: width - 100,
                        }}>
                          70141212
                        </Text>
                        <View style={{ backgroundColor: "red" }}>
                          <FontAwesomeIcon
                            icon={faPhoneVolume}
                            size={25}
                            style={{
                              color: "#5dba73",
                              marginTop: -10
                            }} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                ||
                <Text style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', marginTop: 100, fontSize: 20 }}>Судлаачийн мэдээлэл байхгүй байна.</Text>
              }
            </View>
          </View>
        )}
      </View>
    );
  }
}