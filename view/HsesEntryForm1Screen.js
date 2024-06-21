import React, { Component } from 'react';
import moment from 'moment';
import Utils from '../utils/Utils';
import List from "../components/List";
import Tabs from "../components/Tabs";
import { WeekName } from '../libs/Week';
import Loaiding from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class HsesEntryForm1Screen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      verify: 0,
      hhId: null,
      dayId: null,
      data: [],
      startingDate: null,
      selectedDate: null,
      currentDate: moment(),
      initTab: 0,
    }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: 'Өрхийн хүнсний хэрэглээ',
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
      let day = moment(user.startingDate).day();
      let dayId = day == 0 ? 7 : day;
      this.setState({
        initTab: 0,
        startingDate: moment(user.startingDate),
        selectedDate: moment(user.startingDate),
        dayId: dayId, hhId: user.id, verify: user.verify
      }, () => {
        this.getData(this.state.hhId, this.state.dayId)
      });
    }
    this.props.navigation.addListener(
      'willFocus', async () => {
        this.getData(this.state.hhId, this.state.dayId)
      })
  }

  getData = (hhId, dayId) => {
    this.setState({ loading: true });
    fetch(`${Utils.BASE_URL}/form1/${hhId}/${dayId == 0 ? 7 : dayId}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status && res.data.length > 0) {
          setTimeout(() => {
            this.setState({ data: res.data, loading: false })
          }, 1000)
        } else {
          const data = { ...this.state.data };
          data.hhId = hhId;
          data.dayId = dayId == 0 ? 7 : dayId;
          data.productName = "";
          data.quantity = 0;
          data.unit = 0;
          data.source = 0;
          data.price = 0;
          this.setState({ data: data, loading: false });
        }
      })
      .catch(err => console.error(err));
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        backgroundColor: "#005baa",
      },
      dataBody: {
        height: "90%",
        // backgroundColor:"red"
        // padding: 10
      },
      gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      addButton: {
        // width: "50%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10,
        elevation: 1,
        shadowRadius: 2,
        shadowOpacity: 0.50,
        shadowColor: "#005baa",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        backgroundColor: "#005baa"
      }
    });

    const handleChangeTab = (day, i, setDay) => {
      this.setState({
        initTab: i,
        dayId: day,
        selectedDate: moment(this.state.startingDate).add(i, "day")
      })
      this.getData(this.state.hhId, day)
    }

    return (
      <View style={{ backgroundColor: "#F7F7F7" }}>
        {/* 7 хоногийн сонголт Tabs */}
        <Tabs state={this.state} handleChangeTab={handleChangeTab} />
        {/*  */}
        {this.state.loading ?
          <View style={styles.dataBody}>
            <Loaiding />
          </View> :
          this.state.data.length > 0 &&
          <View style={styles.dataBody}>
            {/* Бүтээгдэхүүний жагсаалт */}
            {
              (this.state.verify == 0 || this.state.verify == null) &&
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  this.props.navigation.navigate('HsesAddForm1', {
                    hhId: this.state.hhId, dayId: this.state.dayId, day: WeekName(this.state.dayId)
                  })
                }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>ХҮНСНИЙ ХЭРЭГЛЭЭ НЭМЭХ</Text>
              </TouchableOpacity>
            }
            <List state={this.state} props={this.props} />
          </View>
        }
      </View>
    );
  }
}