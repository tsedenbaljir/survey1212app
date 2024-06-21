import React, { Component } from 'react';
import moment from 'moment';
import Utils from '../utils/Utils'
import Tabs from "../components/Tabs";
import Loaiding from '../components/Loading';
import ListScreen from '../components/ListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { TouchableOpacity, Alert, Text, View, Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get("window")

export default class HsesEntryForm2Screen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      verify: 0,
      data: {
        hhId: 0,
        dayId: 0,
        guest: Number('0'),
        d1: 1,
        d2: Number('0'),
        d3: 0,
        d4: 0,
        d5: 1,
        d6: Number('0'),
        d7: 0,
        d8: 0,
        d9: 1,
        d10: Number('0'),
        d11: 0,
        d12: 0,
        d13: 1,
        d14: Number('0'),
        d15: 0,
        d16: 0,
        d17: 1,
        d18: Number('0'),
        d19: 0,
        d20: 0,
        d21: 1,
        d22: Number('0'),
        d23: 0,
        d24: 0,
        d25: 1,
        d26: Number('0'),
        d27: 0,
        d28: 0,
      },
      initTab: 0,
      id: [],
      startingDate: null,
      selectedDate: null,
      currentDate: moment(),
      new: true,
    }
  }

  componentDidMount = async () => {
    const { navigation, route } = this.props;

    navigation.setOptions({
      headerTitle: 'Гадуур хэрэглэсэн хүнс',
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

    const userToken = await AsyncStorage.getItem('user');
    if (userToken) {
      // this.setState({ id: JSON.parse(userToken) }, ()=> {
      let user = JSON.parse(userToken).user;
      let day = moment(user.startingDate).day();
      let dayId = day == 0 ? 7 : day
      const data = { ...this.state.data }
      data.hhId = user.id;
      data.dayId = dayId
      this.setState({
        erify: user.verify,
        selectedDate: moment(user.startingDate),
        startingDate: moment(user.startingDate),
        data: data
      }, () => {
        this.getData(this.state.data.hhId, this.state.data.dayId)
      });
      // });
    }
    this.props.navigation.addListener(
      'willFocus', async () => {
        const dayId = this.state.data.dayId;
        this.getData(this.state.data.hhId, dayId)
      })
  }

  getData = (hhId, dayId) => {
    this.setState({ loading: true })
    fetch(`${Utils.BASE_URL}/form2/${hhId}/${dayId == 0 ? 7 : dayId}`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status && res.data.length > 0) {
          this.setState({ data: res.data[0], new: false, loading: false })
        } else {
          const data = { ...this.state.data }
          data.hhId = hhId
          data.dayId = dayId == 0 ? 7 : dayId
          data.guest = 0
          data.d1 = 1
          data.d2 = 0
          data.d3 = 0
          data.d4 = 0
          data.d5 = 1
          data.d6 = 0
          data.d7 = 0
          data.d8 = 0
          data.d9 = 1
          data.d10 = 0
          data.d11 = 0
          data.d12 = 0
          data.d13 = 1
          data.d14 = 0
          data.d15 = 0
          data.d16 = 0
          data.d17 = 1
          data.d18 = 0
          data.d19 = 0
          data.d20 = 0
          data.d21 = 1
          data.d22 = 0
          data.d23 = 0
          data.d24 = 0
          data.d25 = 1
          data.d26 = 0
          data.d27 = 0
          data.d28 = 0
          this.setState({ data: data, new: true, loading: false })
        }
      })
      .catch(err => {
        this.setState({ loading: false })
        console.error(err)
      });
  }

  //ХАДГАЛАХ
  saveData() {
    this.setState({ loading: true })
    const { d2, d3, d4, d6, d7, d8, d10, d11, d12, d14, d15, d16, d18, d19, d20, d22, d23, d24, d26, d27, d28 } = this.state.data
    let a1 = parseInt(d2) + parseInt(d6) + parseInt(d10) + parseInt(d14) + parseInt(d18) + parseInt(d22) + parseInt(d26)
    let a2 = parseInt(d3) + parseInt(d7) + parseInt(d11) + parseInt(d15) + parseInt(d19) + parseInt(d23) + parseInt(d27)
    let a3 = parseInt(d4) + parseInt(d8) + parseInt(d12) + parseInt(d16) + parseInt(d20) + parseInt(d24) + parseInt(d28)

    if ((a2 + a3) / a1 < 100) {
      Alert.alert("Мэдээлэл", "Гадуур хооллосон тоо болон зардлаа шалгана уу")
      this.setState({ loading: false })
    } else {
      fetch(`${Utils.BASE_URL}/form2/add`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.data)
      })
        .then((response) => response.json())
        .then((res) => {
          this.setState({ loading: false })
          Alert.alert("Мэдээлэл", res.message)
        })
        .catch(err => {
          this.setState({ loading: false })
          console.error(err)
        });
    }
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "#005baa",
      },
      dataBody: {
        height: "90%",
      },
      gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    const onChange = (value) => {
      let data = { ...value }
      this.setState({ data })
    }

    const handleChangeTab = (day, i, setDay) => {
      this.setState({
        initTab: i,
        dayId: day,
        selectedDate: moment(this.state.startingDate).add(i, "day")
      })
      this.getData(this.state.data.hhId, day)
    }
    return (
      <View style={{ backgroundColor: "#F7F7F7" }}>
        {/* 7 хоногийн сонголт Tabs */}
        <Tabs state={this.state} handleChangeTab={handleChangeTab} />
        {/*  */}
        {
          this.state.loading ?
            <View style={styles.dataBody}>
              <Loaiding />
            </View> :
            <View style={styles.dataBody}>
              <ListScreen
                state={this.state}
                setState={this.setState}
                width={width}
                onChange={onChange}
                saveData={this.saveData}
              />
            </View>
        }
      </View>
    )
  }
}
