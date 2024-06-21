import React, { Component } from 'react';
import Utils from '../utils/Utils';
import Loaiding from '../components/Loading';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { View, Text, Alert, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Numbers } from '../libs/Numbers';
const { width } = Dimensions.get("window")

export default class HsesAddForm1Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {
        hhId: 0,
        productName: '',
        quantity: 0,
        unit: 0,
        source: 0,
        price: 0,
      },
      id: [],
      day: '',
    };
  }

  componentDidMount = async () => {
    const { navigation, route } = this.props;

    navigation.setOptions({
      headerTitle: 'Өрхийн хүнсний хэрэглээ нэмэх',
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
      this.setState({ id: JSON.parse(userToken) });
    }
    const id = route.params.id;
    const hhId = route.params.hhId;
    let data = { ...this.state.data };
    data.hhId = hhId;
    this.setState({ data, day: route.params.day });
  };

  saveData() {
    if (this.state.data.productName == '' || this.state.data.quantity == 0 || this.state.data.source == 0 || this.state.data.unit == 0) {
      Alert.alert("Мэдээлэл", 'Талбарын утгыг бүрэн оруулна уу!!!');
    } else if (this.state.data.source == 1 && this.state.data.price == 0) {
      Alert.alert("Мэдээлэл", 'Нэгжийн үнийг оруулна уу.');
    } else {
      fetch(`${Utils.BASE_URL}/form1/add`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.data),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status) {
            Alert.alert("Мэдээлэл", res.message);
            this.props.navigation.navigate('HsesEntryForm1');
          }
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    const Styles = StyleSheet.create({
      Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      Body: {
        height: "100%",
        backgroundColor: "#005baa",
      },
      Title: {
        flex: 1,
        // flexDirection: "row",
        fontSize: 30,
        color: "white",
        fontWeight: "700",
        textAlign: "left",
      },
      Top: {
        height: 200,
        marginTop: 30,
        marginLeft: 40,
        marginRight: 40,
      },
      Bottom: {
        padding: 30,
        elevation: 8,
        shadowRadius: 6,
        shadowOpacity: 0.90,
        shadowColor: "#005baa",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        height: "100%",
        borderRadius: 30,
        backgroundColor: "white",
      },
      Desc: {
        fontSize: 14,
        color: "white",
        color: "#b3c9ff94",
        paddingBottom: 15,
        textAlign: "justify",
        fontStyle: "italic",
      },
      Calendar: {
        width: 40,
        height: 40,
        marginBottom: 10,
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
      },
      itemText: {
        height: 50,
        width: width - 60,
        backgroundColor: '#F6F6F6',
        borderRadius: 9,
        padding: 10,
        fontSize: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
      },
      itemTextBold: {
        color: '#041F60',
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: -18,
        zIndex: 1,
        marginLeft: 10
      },
      saveButton: {
        height: 50,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 1,
        shadowRadius: 6,
        shadowOpacity: 0.90,
        shadowColor: "#005baa",
        backgroundColor: "#005baa",
        shadowOffset: {
          width: 0,
          height: 5,
        },
      },
    });

    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        height: 50,
        width: width - 60,
        backgroundColor: '#F6F6F6',
        borderRadius: 9,
        padding: 10,
        fontSize: 15,
        marginVertical: 10,
        paddingHorizontal: 20,
      },
      inputAndroid: {
        height: 50,
        width: width - 60,
        backgroundColor: '#F6F6F6',
        borderRadius: 9,
        padding: 10,
        fontSize: 15,
        marginVertical: 10,
        paddingHorizontal: 20,
        // fontSize: 16,
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        // borderWidth: 0.5,
        // borderColor: 'purple',
        // borderRadius: 8,
        // paddingHorizontal:20,
        // color: "#59637B",
        // paddingRight: 30, // to ensure the text is never behind the icon
      },
    });

    return this.state.loading ?
      <View style={Styles.Container}>
        <Loaiding />
      </View> : (
        <View style={Styles.Body}>
          <View style={Styles.Top}>
            <View style={Styles.Calendar}>
              <FontAwesomeIcon icon={faCalendar} style={{ color: "#005baa" }} />
            </View>
            <Text style={Styles.Title}>
              {this.state.day} гараг
              {/* гарагийн хүнсний хэрэглээ */}
            </Text>
            <Text style={Styles.Desc}>
              Та хэрэглэсэн зүйлийнхээ хэмжих нэгж,
              үнийн дүнг зөв нөхсөн эсэхийг анхааралтай шалгана уу.
            </Text>
          </View>
          <View style={Styles.Bottom}>
            <Text style={Styles.itemTextBold}>
              Хүнсний нэр төрөл:
            </Text>
            <TextInput
              onChange={(value) => {
                let data = { ...this.state.data }
                data.productName = value
                this.setState({ data })
              }}
              value={this.state.data.productName}
              style={Styles.itemText}
            />
            <Text style={Styles.itemTextBold}>
              Хэмжих нэгж сонгох:
            </Text>
            <View>
              <RNPickerSelect
                onValueChange={(value) => {
                  if (value == 4) {
                    Alert.alert("Мэдээлэл", "Таны нөхсөн мэдээлэл ШИНГЭН ЗҮЙЛ/УРГАМАЛ/ОЛИВЫН ТОС мөн үү, энд зөвхөн дээрх зүйлийг л ЛИТРЭЭР хэмжиж бичих ёстой")
                  }
                  if (value == 5) {
                    Alert.alert("Мэдээлэл", "Таны нөхсөн мэдээлэл янжуур тамхи мөн үү, энд зөвхөн янжуур тамхийг л хайрцагаар хэмжиж бичих ёстой")
                  }
                  let data = { ...this.state.data };
                  data.unit = value;
                  this.setState({ data });
                }}
                darkTheme={true}
                value={this.state.data.unit}
                placeholder={{
                  label: 'Хэмжих нэгжийг сонгоно уу',
                  value: null,
                  color: '#9EA0A4', // Optional: color for the placeholder text
                }}
                items={[
                  // { label: 'Хэмжих нэгжийг сонгоно уу', value: '0' },
                  { label: 'Грамм', value: '1' },
                  { label: 'Килограмм', value: '2' },
                  { label: 'Ширхэг', value: '3' },
                  { label: 'Литр', value: '4' },
                  { label: 'хайрцаг', value: '5' },
                ]}
                Icon={() => {
                  return (
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        borderTopWidth: 10,
                        borderTopColor: 'gray',
                        borderRightWidth: 10,
                        borderRightColor: 'transparent',
                        borderLeftWidth: 10,
                        borderLeftColor: 'transparent',
                        width: 0,
                        height: 0,
                      }}
                    />
                  );
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 30,
                    right: 10,
                  },
                  placeholder: {
                    color: 'gray',
                    fontSize: 12,
                    fontWeight: 'bold',
                  },
                }}
              />
            </View>
            <Text style={Styles.itemTextBold}>
              Тоо хэмжээ:
            </Text>
            <TextInput
              onChangeText={(value) => {
                const numericValue = value.replace(/[^0-9.]/g, '');
                let data = { ...this.state.data }
                data.quantity = numericValue
                this.setState({ data })
              }}
              value={this.state.data.quantity}
              keyboardType="decimal-pad"
              style={Styles.itemText}
            />
            <View>
              <Text style={Styles.itemTextBold}>
                Эх үүсвэр:
              </Text>
              <RNPickerSelect
                onValueChange={(value) => {
                  let data = { ...this.state.data }
                  data.source = value
                  this.setState({ data })
                }}
                darkTheme={true}
                value={this.state.data.source}
                placeholder={{
                  label: 'Эх үүсвэрийг сонгоно уу',
                  value: null,
                  color: '#9EA0A4',
                }}
                items={[
                  { label: 'Худалдан авсан', value: '1' },
                  { label: 'Бусдаас үнэгүй авсан', value: '2' },
                  { label: 'Өөрийн аж ахуйгаас', value: '3' },
                ]}
                Icon={() => {
                  return (
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        borderTopWidth: 10,
                        borderTopColor: 'gray',
                        borderRightWidth: 10,
                        borderRightColor: 'transparent',
                        borderLeftWidth: 10,
                        borderLeftColor: 'transparent',
                        width: 0,
                        height: 0,
                      }}
                    />
                  );
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 30,
                    right: 10,
                  },
                  placeholder: {
                    color: 'gray',
                    fontSize: 12,
                    fontWeight: 'bold',
                  },
                }}
              />
            </View>
            {
              this.state.data.source == 1 &&
              <View>
                <Text style={Styles.itemTextBold}>
                  Нэгжийн үнэ /₮/:
                </Text>
                <TextInput
                  onChangeText={(value) => {
                    const numericValue = value.replace(/[^0-9]/g, '');
                    let data = { ...this.state.data }
                    data.price = numericValue
                    this.setState({ data })
                  }}
                  // value={this.state.data.price}
                  value={Numbers(Number(this.state.data.price))}
                  style={Styles.itemText}
                />
              </View>
            }
            <TouchableOpacity
              style={Styles.saveButton}
              onPress={() => this.saveData()}>
              <Text style={{ color: "white", fontWeight: "bold" }}>ХАДГАЛАХ</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}
