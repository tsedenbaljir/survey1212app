import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Utils from '../utils/Utils';
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';

export default class NotificationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      messageList: [],
      hhId: 0
    }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: 'Мэдэгдэл',
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

    this.props.navigation.addListener(
      'willFocus', () => {
        AsyncStorage.getItem('user')
          .then((dt) => {
            var data = JSON.parse(dt);
            this.setState({ hhId: data.user.id }, () => this._getMessageList());
          })
      }
    );
  }

  _getMessageList = async () => {
    this.setState({ loading: true });
    await fetch(`${Utils.BASE_URL}/notification/find_hh/${this.state.hhId}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status) {
          this.setState({
            messageList: res.data,
            loading: false
          }, () => console.log(this.state))
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        alert("f_getmessagelist: " + error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center", padding: 10 }}>
          Судлаачаас ирсэн мэдэгдлүүд
        </Text>
        {
          this.state.loading ? <ActivityIndicator /> :
            <View style={{ padding: 10 }}>
              {
                this.state.messageList.length > 0 ?
                  <FlatList
                    data={this.state.messageList}
                    renderItem={({ item, index }) =>
                      <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("NotificationAdd", {
                          messageid: item.id
                        })
                      }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              borderLeftWidth: 3,
                              borderBottomWidth: 1,
                              borderTopWidth: 1,
                              borderBottomColor: "#E1DDF0",
                              borderTopColor: "#E1DDF0",
                              borderLeftColor: "#3CD6A8",
                              padding: 10
                            }}
                          >
                            <View style={{ flex: .18 }}>
                              {/* <Icon name={item.isread == 1 ?  "envelope" : "envelope-open"} color = "#3CD6A8" size={32}/> */}
                              <Icon name="envelope" color="#3CD6A8" size={32} />
                            </View>
                            <View style={{ flex: .82 }}>
                              {/* <Text style={item.isread == 0 ?  styles.textLabel : styles.textLabelRead}> */}
                              <Text style={styles.textLabel}>
                                {item.notification}
                              </Text>
                              <Text style={styles.textLabel}>
                                Огноо: {moment(item.createdAt).format('YYYY-MM-DD, H:mm:ss')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                  />
                  :
                  <View><Text>Мэдэгдэл байхгүй байна.</Text></View>
              }
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textLabel: {
    color: "black",
    fontSize: 16,
    fontWeight: "600"
  },
  textLabelRead: {
    fontSize: 16,
  }
})
