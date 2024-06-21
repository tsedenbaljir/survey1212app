import React from 'react';
import { Numbers } from "../libs/Numbers";
import RadioButtonComponents from "./RadioButton";
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ViewList = ({ name, state, onChange, onChange2, onChange3, onChange4, width, data, data2, data3, data4 }) => {
  
  const styles = StyleSheet.create({
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
    InputText: {
      color: '#041F60',
      width: width / 2,
      fontWeight: "600",
      textAlign: "left",
    },
    ViewStyle: {
      borderColor: "#041F60",
      borderWidth: 0.3,
      marginVertical: 5,
      paddingLeft: 15,
      paddingBottom: 25,
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
    }
  });

  return (
    <View style={styles.ViewStyle}>
      <Text style={{ fontWeight: "700", marginTop: 10, color: '#041F60', }}>{name}</Text>
      <RadioButtonComponents
        state={state}
        width={width}
        data={data}
        buttonOuterColor={data}
        onChange={onChange} />
      {
        data != 2 &&
        <View style={{ marginLeft: 30 }}>
          <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.InputText}>Гадуур хооллосон нийт тоо</Text>
            <TextInput
              type="only-numbers"
              style={styles.InputStyle}
              onChangeText={onChange2}
              placeholder='тоо'
              includeRawValueInChangeText={true}
              value={Numbers(Number(data2))} />
          </View>
          <View style={{ marginTop: 15, flexDirection: "row" }}>
            <Text style={styles.InputText}>Өрхийн гишүүдээс гарсан нийт зардал, төгрөгөөр</Text>
            <TextInput
              style={styles.InputStyle}
              type="money"
              value={Numbers(Number(data3))}
              placeholder='тоо'
              includeRawValueInChangeText={true}
              onChangeText={onChange3}
            />
          </View>
          <View style={{ marginTop: 15, flexDirection: "row" }}>
            <Text style={styles.InputText}>Бусдаас үнэгүй авсан нийт үнийн дүн, төгрөгөөр</Text>
            <TextInput
              style={styles.InputStyle}
              type="money"
              value={Numbers(Number(data4))}
              placeholder='тоо'
              includeRawValueInChangeText={true}
              onChangeText={onChange4}
            />
          </View>
        </View>
      }
    </View>
  );
}

export default ViewList;
