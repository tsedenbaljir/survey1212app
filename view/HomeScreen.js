import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Utils from '../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'
import Loaiding from '../components/Loading';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Menu = ({ unreadcount, menuid, name, id, icon, onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: "#F6F6F6",
      borderRadius: 9,
      padding: 20,
      width: "45%",
      height: 120,
      margin: 6,
      justifyContent: "center",
      alignItems: "center",
      // shadow
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 4,
      // },
      // shadowOpacity: 0.20,
      // shadowRadius: 6,
      // elevation: 8
    }}
    onPress={onPress}
    key={id}
  >
    <Image source={{ uri: icon }} size={50} style={{ width: 60, height: 60 }} />
    {/* <FontAwesomeIcon icon={faLocationDot} style={{ color: "#aa0033" }} /> */}
    {
      menuid == 10 ?
        unreadcount == 0 ?
          <View /> :
          <View style={styles.box2}>
            <Text style={{ color: "#FFF", fontWeight: "bold", textAlign: "center" }}>{unreadcount}</Text>
          </View>
        :
        <View />
    }
    <Text style={{ textAlign: "center" }}> {name}</Text>
  </TouchableOpacity>
)

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userid: "",
      menus: [],
      loading: false,
      unreadmessagecount: 0
    }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: 'Survey1212',
      headerLeft: () => (<></>),
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('Login')
        }}>
          <FontAwesomeIcon icon={faSignOut} style={{ color: "#aa0033" }} />
        </TouchableOpacity>
      ),
    });

    await AsyncStorage.getItem('user')
      .then((data) => {
        let user1 = JSON.parse(data);
        this.setState({
          userid: user1.user.id
        },
          () => this._LoadMenuAsync()); 
      })
      .catch(error => alert("willFocus AsyncStorage: " + error));
  }

  _LoadMenuAsync = async () => {
    this.setState({ loading: true });
    await fetch(`${Utils.BASE_URL}/menus`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status) {
          this.setState({
            menus: res.data,
            loading: false
          })
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        alert(`f_getusermenudata: ${error}`);
      });
    this._LoadGetMessageAsync();
  };

  _LoadGetMessageAsync = async () => {
    this.setState({ loading: true });
    await fetch(`${Utils.BASE_URL}/notification/find_hh/${this.state.userid}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.status) {
          this.setState({
            unreadmessagecount: res.data.length,
            loading: false
          })
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        alert("f_getmessagecount: " + error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.loading ? <Loaiding /> :
            <View style={{ margin: 10 }}>
              <View style={styles.box1}>
                {
                  this.state.menus.length > 0 &&
                  this.state.menus.map((menu, idx) => {
                    return <Menu
                      key={idx}
                      unreadcount={this.state.unreadmessagecount}
                      menuid={menu.id}
                      name={menu.name}
                      id={idx}
                      icon={menu.url}
                      onPress={() => this.props.navigation.navigate(menu.pageName, { sysuserid: this.state.userid })}
                    />
                  })
                }
              </View>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  box1: {
    flexDirection: "row",
    position: "absolute",
    flexWrap: "wrap",
    justifyContent: 'space-between'
  },
  box2: {
    zIndex: 2,
    borderWidth: 1,
    borderColor: "red",
    padding: 3,
    borderRadius: 13,
    width: 30,
    position: "absolute",
    backgroundColor: "red",
    left: width - 263,
    top: height - 660,
    transform: [{ 'translate': [1, 0, 1] }]
  }
});