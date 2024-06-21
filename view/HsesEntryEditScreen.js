import React, { Component } from 'react'
import moment from 'moment';
import Utils from '../utils/Utils';
import { WeekName } from "../libs/Week";
import { Numbers } from '../libs/Numbers';
import Loaiding from '../components/Loading';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { StyleSheet, TouchableOpacity, View, Text, Alert, Platform, Dimensions, TextInput } from 'react-native'

const { width } = Dimensions.get("window")
export default class ToastExample extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      verify: 0,
      id: null,
      day: "",
      dayId: 0,
      data: {
        // id: undefined,
        // hhId: undefined,
        // dayId: undefined,
        productName: undefined,
        quantity: undefined,
        unit: undefined,
        source: undefined,
        price: undefined,
        updatedAtUser: moment().format("YYYY-MM-DD, H:mm:ss"),
      },
    }
  }

  componentDidMount = async () => {
    const { navigation, route } = this.props;

    navigation.setOptions({
      headerTitleStyle: {
        color: 'white',  // Replace with your desired title color
      },
      headerStyle: {
        backgroundColor: '#005baa',
      },
      headerTitle: 'Хүнсний хэрэглээ засах',
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexWrap: "nowrap", flexDirection: "row" }}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} style={{
            color: "white",
            fontWeight: "bold"
          }}
          />
          <Text style={{ color: "white", fontWeight: "bold" }}>Буцах</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('Login')
        }}>
          <FontAwesomeIcon icon={faSignOut} style={{ color: "white" }} />
        </TouchableOpacity>
      ),
    });

    const userToken = await AsyncStorage.getItem('user');
    if (userToken) {
      let user = JSON.parse(userToken).user;
      this.setState({ verify: user.verify })
    }
    const id = route.params.id;
    const dayId = route.params.dayId;
    this.setState({ id: id, dayId: dayId, day: WeekName(dayId) },
      () => this.getData(this.state.id))
  }

  getData = async (id) => {
    this.setState({ loading: true })
    await fetch(`${Utils.BASE_URL}/form1/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status) {
          let data = { ...this.state.data }
          // data.id = res.data.id
          // data.hhId = res.data.hhId
          // data.dayId = res.data.dayId
          data.productName = res.data.productName
          data.quantity = res.data.quantity.toString()
          data.unit = res.data.unit
          data.source = res.data.source
          data.price = res.data.price.toString()
          this.setState({ data, loading: false })
        }
      })
      .catch(err => {
        this.setState({ loading: false })
        console.error(err)
      });
  }

  saveData(id) {
    this.setState({ loading: true })
    if (this.state.data.productName == '' || this.state.data.quantity == 0 || this.state.data.source == 0 || this.state.data.unit == 0) {
      Alert.alert('Талбарын утгыг бүрэн оруулна уу!!!');
      this.setState({ loading: false })
    } else if (this.state.data.source == 1 && this.state.data.price == 0) {
      Alert.alert('Нэгжийн үнийг оруулна уу.');
      this.setState({ loading: false })
    } else {
      fetch(`${Utils.BASE_URL}/form1/id/${id}`, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.data)
      })
        .then((response) => response.json())
        .then((res) => {
          this.setState({ loading: false })
          if (res.status) {
            Alert.alert("Мэдээлэл", res.message);
            // this.props.navigation.navigate("HsesEntryForm1Screen")
            this.props.navigation.navigate('HsesEntryForm1', { dayId: this.state.dayId });
          }
        })
        .catch(err => {
          this.setState({ loading: false })
          console.error(err)
        });
    }
  }

  //Устгах 
  deleteNote = (id) => {
    Alert.alert(
      'Анхааруулга',
      'Та энэ бүтээгдэхүүнийг устгахыг зөвшөөрч байна уу.',
      [
        {
          text: 'Цуцлах',
          onPress: () => console.log('Цуцлах'),
          style: 'cancel',
        },
        {
          text: 'Устгах', onPress: () => {
            this.setState({ loading: true })
            fetch(`http://202.131.245.67/api/v1/form1/id/${id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
              },
            }).then((response) => response.json())
              .then((res) => {
                Alert.alert("Мэдээлэл", res.message);
                if (res.status) {
                  this.setState({ loading: false })
                  this.props.navigation.goBack(null)
                }
                else {
                  this.setState({ loading: false })
                  Alert.alert("Алдаа", res.message);
                }

              })
              .catch((error) => {
                this.setState({ loading: false });
                alert("DELETE: " + error);
              });
          }
        },
      ],
      { cancelable: false },
    );

  };

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
        width: "50%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 1,
        shadowRadius: 6,
        shadowOpacity: 0.90,
        shadowColor: "#005baa",
        shadowOffset: {
          width: 0,
          height: 5,
        },
      },
      deleteButton: {
        width: "50%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "#F6F6F6",
        borderWidth: 1
      }
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

    return (
      this.state.loading ?
        <View style={Styles.Container}>
          <Loaiding />
        </View> :
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
                  value={Numbers(Number(this.state.data.price))}
                  style={Styles.itemText}
                />
              </View>
            }
            <View style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "nowrap",
              marginLeft: -2
            }}>
              {
                (this.state.verify == 0 || this.state.verify == null) &&
                <TouchableOpacity style={[
                  Styles.saveButton,
                  {
                    marginRight: 2,
                    backgroundColor: "#005baa"
                  }
                ]}
                  onPress={() => this.saveData(this.state.id)}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>ХАДГАЛАХ</Text>
                </TouchableOpacity>
              }
              {
                (this.state.verify == 0 || this.state.verify == null) &&
                <View style={[Styles.deleteButton, { marginLeft: 2, backgroundColor: "white" }]}>
                  <TouchableOpacity style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }} danger block onPress={() => this.deleteNote(this.state.id)}>
                    <FontAwesomeIcon icon={faTrash} style={{ marginLeft: -10, color: "#dc3545" }} />
                    <Text style={{ marginLeft: 5, color: "#dc3545" }}>УСТГАХ</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </View>
    );
  }
}