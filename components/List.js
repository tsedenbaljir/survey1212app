import React from 'react';
import { Numbers } from "../libs/Numbers";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

const List = ({ state, props }) => {

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

  const listStyles = StyleSheet.create({
    itemContainer: {
      padding: 10,
      borderRadius: 15,
      backgroundColor: "white",
      marginHorizontal: 10,
      marginVertical: 7,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#59637B",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.30,
      shadowRadius: 3,
      elevation: 50,
    },
    itemContent: {
      flexDirection: "row",
    },
    itemLeft: {
      width: "55%",
    },
    itemRight: {
      width: "45%",
    },
    itemText: {
      marginLeft: 15,
      fontSize: 14,
      color: "#59637B",
      marginBottom: 5,
      fontWeight: "bold",
    },
    itemTextBold: {
      color: '#041F60',
      marginLeft: 7,
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
    },
  });

  return (
    <FlatList
      data={state.data}
      renderItem={({ item, i }) => (
        <View style={listStyles.itemContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(
                'HsesEditForm1',
                { id: item.id, dayId: state.dayId}
              );
            }}
            style={listStyles.itemContent}
          >
            <View style={listStyles.itemLeft}>
              <Text style={listStyles.itemTextBold}>Хүнсний нэр төрөл:</Text>
              <Text style={listStyles.itemText}>{item.productName}</Text>
              <Text style={[listStyles.itemTextBold, { paddingTop: 10 }]}>Хэрэглэсэн хэмжээ:</Text>
              <Text style={listStyles.itemText}>
                {item.quantity} {this.getUnit(item.unit)}
              </Text>
            </View>
            <View style={listStyles.itemRight}>
              <Text style={listStyles.itemTextBold}>Эх үүсвэр:</Text>
              <Text style={listStyles.itemText}>
                {item.source == 1 ?
                  "Худалдан авсан"
                  : item.source == 2 ?
                    "Бусдаас үнэгүй авсан" :
                    "Өөрийн аж ахуйгаас"}
              </Text>
              {item.source == 1 && (
                <>
                  <Text style={[listStyles.itemTextBold, { paddingTop: 10 }]}>
                    Нэгжийн үнэ /₮/:
                  </Text>
                  <Text style={listStyles.itemText}>{Numbers(item.price)}</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default List;
