import React, { Component } from 'react'
import { ActivityIndicator, Text, StyleSheet, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Utils from '../utils/Utils'
import { Icon } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'

export default class Survey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      surveys: [],
      startingDate: '',
      sysuserid: 0
    }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: 'Судалгаа',
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

    const { sysuserid } = this.props.route.params;
    this.setState({ sysuserid: sysuserid })
    const userToken = await AsyncStorage.getItem('user'); // usertoken-g avna
    if (userToken) {
      let user = JSON.parse(userToken).user;
      this.setState({ startingDate: user.startingDate }, () => {
        this._getUserSurveysAsync();
      });
      this._getUserSurveysAsync();
    }
    // this.props.navigation.setParams({ logout: this._signOutAsync });
  }

  // _signOutAsync = async () => {
  //   await AsyncStorage.removeItem('user');
  //   this.props.navigation.navigate('Auth');
  // };

  _getUserSurveysAsync = async () => {
    const { navigation } = this.props;
    this.setState({ loading: true });

    await fetch(`${Utils.BASE_URL}/survey`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status) {
          this.setState({
            loading: false,
            surveys: res.data,
          })
        } else {
          Alert.alert(res.message);
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(`f_getusersurveydata: ${error}`);
      });
  }

  renderSeparator = () => {
    return (
      <View style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }} />
    )
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          {
            this.state.loading ? <ActivityIndicator /> :
              <View style={{
                flex: 1,
                padding: 10,
                // backgroundColor: "Gray"
              }}>
                <FlatList
                  data={this.state.surveys}
                  renderItem={({ item }) =>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          if ('2024-04-26' == '') {
                            Alert.alert('Уучлаарай таны эхлэх өдөр байхгүй байна. Та судлаачтай холбогдоно уу!!!');
                          } else {
                            this.props.navigation.navigate("HsesHome",
                              {
                                surveyid: item.id,
                                surveyname: item.name,
                                userid: this.state.sysuserid
                              })
                          }
                        }}
                        style={{
                          backgroundColor: "#005baa",
                          borderRadius: 15
                        }}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                          <View style={{ padding: 10 }}>
                            {/* <Image source={{ uri: item.img_url }} style={{ height: 50, width: 50 }} ></Image> */}
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={{
                              flex: 1,
                              flexWrap: "wrap",
                              fontSize: 18,
                              fontWeight: "600",
                              marginVertical: 20,
                              color: "white",
                              textAlign: "center"
                            }}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  }
                  ItemSeparatorComponent={this.renderSeparator}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
          }
        </View>
      </SafeAreaProvider>
    )
  }
}