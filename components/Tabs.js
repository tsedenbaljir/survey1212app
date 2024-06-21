import React, { Component } from 'react';
import { Week, WeekName } from "../libs/Week";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class Tabs extends Component {
  render() {
    const { state, handleChangeTab } = this.props;
    const startingDate = state.startingDate;

    const styles = StyleSheet.create({
      container: {
        backgroundColor: "white",
        borderBottomColor: "#DEDEDE",
        borderBottomWidth: 2,
        paddingHorizontal: 10
      },
      textDate: {
        fontSize: 12,
        color: "#59637B",
        paddingVertical: 6,
        textAlign: "center",
        justifyContent: "center",
      },
      text: {
        margin: 3,
        padding: 6,
        fontSize: 15,
        color: "white",
        borderRadius: 15,
        paddingHorizontal: 13,
        textAlign: "center",
        justifyContent: "center",
      },
      textWeek: {
        fontSize: 15,
        textAlign: "center",
        justifyContent: "center",
      },
    });

    return (
      <ScrollView horizontal style={styles.container}>
        {Week(startingDate).map((vDay, i) => {
          let day = vDay.day === 0 ? 7 : vDay.day;
          return (
            <TouchableOpacity key={i} onPress={() => handleChangeTab(day, i, WeekName(day))}>
              <Text style={styles.textDate}>
                {vDay.date}
                </Text>
              <View style={[styles.text, {
                backgroundColor: state.initTab === i ? "#e1f2ff" : "#005baa",
              }]}>
                <Text style={[styles.textWeek, {
                fontWeight: "bold",
                color: state.initTab === i ? "#005baa" : "white"
              }]}>
                {WeekName(day)}
              </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}