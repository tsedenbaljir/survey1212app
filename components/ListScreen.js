import React, { useMemo, useState } from 'react';
import ViewList from './ViewList';
import { StyleSheet, Alert, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { moment } from "moment";
import { Numbers } from '../libs/Numbers';
const ListScreen = ({ state, saveData, setState, width, onChange }) => {

  getUnit = (unit) => {
    switch (unit) {
      case '1':
        return 'гр'
      case '2':
        return 'кг'
      case '3':
        return 'ш'
      case '4':
        return 'л'
      case '5':
        return 'хайрцаг'
      default:
        return ''
    }
  }

  alertD = () => {
    Alert.alert('Тодорхойлолт', 'Өрхийн гишүүд өөрсдөө мөнгөө төлсөн, худалдаж авсан')
  }

  alertB = () => {
    Alert.alert('Тодорхойлолт', 'Өрхийн гишүүн биш хэн нэгнээр төлүүлсэн (даалгасан, бэлгэнд авсан гэх мэт)')
  }

  alertZochin = () => {
    Alert.alert('Тодорхойлолт', 'Өрхөд тухайн өдөр хоносон зочинг асууж байгаа ба зочны хэрэглэсэн хүнсний хэрэглээг "ӨРХИЙН ХҮНСНИЙ ХЭРЭГЛЭЭ" бүлэгт нэмж оруулна. Хэрэв өрхөд ирсэн зочин хоноогүй бол зочныг хооллосон хүнсний зардлыг "ӨРХИЙН ХҮНСНИЙ ХЭРЭГЛЭЭ" бүлэгт оруулахгүй.')
  }

  const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 2,
      paddingHorizontal: 15,
      backgroundColor: "white",
      borderBottomColor: "#DEDEDE",
    },
    InputStyle: {
      height: 35,
      marginLeft: 5,
      borderWidth: 1,
      width: width / 4,
      borderRadius: 10,
      paddingRight: 10,
      textAlign: "right",
      borderColor: "#ccc",
    },
    ViewStyle: {
      borderColor: "#041F60",
      borderWidth: 0.3,
      marginVertical: 5,
      paddingLeft: 15,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: "white",
      shadowColor: "#59637B",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 10,
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center"
    }

  }
  );

  return (
    <ScrollView style={styles.container}>
      {
        state.loading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View> :
          state.selectedDate !== null && state.selectedDate.diff(state.currentDate, "day") > 0 ?
            <View>
              <View style={{ justifyContent: "center", alignItems: "center", padding: 30 }}>
                <Text style={{ textAlign: "center" }}>Та тухайн өдрийн мэдээллийг
                  {moment(state.selectedDate).utc(false).format('YYYY-MM-DD')}
                  өдөр оруулах боломжтой.
                </Text>
              </View>
            </View> :
            <View>
              <View style={{marginTop:10}}>
                <View style={styles.ViewStyle}>
                  <View>
                    <Text style={{ color: "#041F60", fontWeight: "700", width: width / 1.7, textAlign: "left" }}>
                      Энэ өдөр хоносон
                      <Text style={{ fontWeight: "700", marginTop: 10, textAlign: 'justify', color: "#00ccff" }}
                        onPress={(e) => this.alertZochin()}> зочны тоо</Text>
                    </Text>
                    <Text style={{ color: "#041F60", fontSize: 12, fontStyle: "italic", width: width / 2 }}>
                      Тухайн зочин энэ өдөр бүтэн хоносон байх ёстой.
                    </Text>
                  </View>
                  <TextInput
                    style={styles.InputStyle}
                    type="only-numbers"
                    value={Numbers(state.data.guest)}
                    includeRawValueInChangeText={true}
                    onChangeText={(value) => {
                      const numericValue = value.replace(/[^0-9.]/g, '');
                      let data = { ...state.data }
                      if (numericValue > 30) {
                        Alert.alert("Мэдээлэл", "Нэг өдөрт гадуур хооллосон өдрийн тоо хэт их байна, шалгана уу")
                      } else {
                        data.guest = numericValue
                        onChange(data)
                      }
                    }}
                  />
                </View>
              </View>
              <Text style={{ marginVertical:15,color: "#041F60", fontWeight: "700", marginTop: 10, textAlign: 'justify' }}>
                Танай өрхийн гишүүд энэ өдөр дараах нэр төрөлд гэрээсээ гадуур хооллож
                <Text style={{ fontWeight: "700", marginTop: 10, textAlign: 'justify', color: "#00ccff" }}
                  onPress={(e) => this.alertD()}> зардал гаргасан уу </Text>
                <Text style={{ fontWeight: "700", marginTop: 10, textAlign: 'justify' }}> эсвэл </Text>
                <Text style={{ fontWeight: "700", marginTop: 10, textAlign: 'justify', color: "#ff3399" }}
                  onPress={(e) => this.alertB()}>бусдаас үнэгүй авсан уу?</Text>
              </Text>
              <View>
                <ViewList
                  name="1. ӨГЛӨӨНИЙ ЦАЙ"
                  state={state}
                  width={width}
                  data={state.data.d1}
                  data2={state.data.d2}
                  data3={state.data.d3}
                  data4={state.data.d4}
                  onChange={(value) => {
                    let data = { ...state.data }
                    data.d1 = value
                    onChange(data)
                  }}
                  onChange2={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d2 = numericValue
                    onChange(data)
                  }}
                  onChange3={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d3 = numericValue
                    onChange(data)
                  }}
                  onChange4={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d4 = numericValue
                    onChange(data)
                  }}
                />
                <ViewList
                  name="2. ӨДРИЙН ХООЛ"
                  state={state}
                  width={width}
                  data={state.data.d5}
                  data2={state.data.d6}
                  data3={state.data.d7}
                  data4={state.data.d8}
                  onChange={(value) => {
                    let data = { ...state.data }
                    data.d5 = value
                    onChange(data)
                  }}
                  onChange2={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d6 = numericValue
                    onChange(data)
                  }}
                  onChange3={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d7 = numericValue
                    onChange(data)
                  }}
                  onChange4={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d8 = numericValue
                    onChange(data)
                  }}
                />
                <ViewList
                  name="3. ОРОЙН ХООЛ"
                  state={state}
                  width={width}
                  data={state.data.d9}
                  data2={state.data.d10}
                  data3={state.data.d11}
                  data4={state.data.d12}
                  onChange={(value) => {
                    let data = { ...state.data }
                    data.d9 = value
                    onChange(data)
                  }}
                  onChange2={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d10 = numericValue
                    onChange(data)
                  }}
                  onChange3={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d11 = numericValue
                    onChange(data)
                  }}
                  onChange4={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d12 = numericValue
                    onChange(data)
                  }}
                />
                <ViewList
                  name="4. ЗУУШ"
                  state={state}
                  width={width}
                  data={state.data.d13}
                  data2={state.data.d14}
                  data3={state.data.d15}
                  data4={state.data.d16}
                  onChange={(value) => {
                    let data = { ...state.data }
                    data.d13 = value
                    onChange(data)
                  }}
                  onChange2={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d14 = numericValue
                    onChange(data)
                  }}
                  onChange3={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d15 = numericValue
                    onChange(data)
                  }}
                  onChange4={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d16 = numericValue
                    onChange(data)
                  }}
                />
                <ViewList
                  name="5. УУХ ЗҮЙЛС (ус, ундаа, кофе, цай... гэх мэт)"
                  state={state}
                  width={width}
                  data={state.data.d17}
                  data2={state.data.d18}
                  data3={state.data.d19}
                  data4={state.data.d20}
                  onChange={(value) => {
                    let data = { ...state.data }
                    data.d17 = value
                    onChange(data)
                  }}
                  onChange2={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d18 = numericValue
                    onChange(data)
                  }}
                  onChange3={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d19 = numericValue
                    onChange(data)
                  }}
                  onChange4={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d20 = numericValue
                    onChange(data)
                  }}
                />
                <ViewList
                  name="6. УУХ ЗҮЙЛС (архи, согтууруулах ундаа)"
                  state={state}
                  width={width}
                  data={state.data.d21}
                  data2={state.data.d22}
                  data3={state.data.d23}
                  data4={state.data.d24}
                  onChange={(value) => {
                    let data = { ...state.data }
                    data.d21 = value
                    onChange(data)
                  }}
                  onChange2={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d22 = numericValue
                    onChange(data)
                  }}
                  onChange3={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d23 = numericValue
                    onChange(data)
                  }}
                  onChange4={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d24 = numericValue
                    onChange(data)
                  }}
                />
                <ViewList
                  name="7. БЭЛЭН ХООЛ, ХҮНС (гэрээсээ өөр газарт бэлтгэсэн хоол, дуудлагын хоол, хүнсийг худалдан авч гэртээ хооллосныг оруулна.)"
                  state={state}
                  width={width}
                  data={state.data.d25}
                  data2={state.data.d26}
                  data3={state.data.d27}
                  data4={state.data.d28}
                  onChange={(value) => {
                    let data = { ...state.data }
                    data.d25 = value
                    onChange(data)
                  }}
                  onChange2={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d26 = numericValue
                    onChange(data)
                  }}
                  onChange3={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d27 = numericValue
                    onChange(data)
                  }}
                  onChange4={(value) => {
                    const numericValue = value.replace(/[^0-9.]/g, '');
                    let data = { ...state.data }
                    data.d28 = numericValue
                    onChange(data)
                  }}
                />
              </View>
              {
                (state.verify == 0 || state.verify == null) &&
                <TouchableOpacity block success style={{ marginTop: 20 }} onPress={() => saveData()}>
                  <Text style={{ color: "white" }}>ХАДГАЛАХ</Text>
                </TouchableOpacity>
              }
            </View>
      }
    </ScrollView>
  );
}

export default ListScreen;
