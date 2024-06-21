import React from 'react';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const RadioButtonComponents = ({ data, onChange, buttonOuterColor }) => {

  var radio_props = [
    { label: 'Тийм', value: 1 },
    { label: 'Үгүй', value: 2 }
  ];
  return (
    <RadioForm formHorizontal={true}>
      {
        radio_props.map((v, i) => (
          <RadioButton labelHorizontal={true} key={i} >
            <RadioButtonInput
              obj={v}
              index={i}
              isSelected={data === v.value}
              onPress={onChange}
              borderWidth={1}
              buttonInnerColor={'#041F60'}
              buttonOuterColor={buttonOuterColor === v.value ? '#041F60' : '#000'}
              buttonSize={10}
              buttonOuterSize={16}
              buttonStyle={{}}
              buttonWrapStyle={{ marginLeft: 10, marginTop: 7 }}
            />
            <RadioButtonLabel
              obj={v}
              index={i}
              labelHorizontal={true}
              onPress={onChange}
              labelStyle={{ fontSize: 14, marginTop: 5, color: '#041F60' }}
            />
          </RadioButton>
        ))
      }
    </RadioForm>
  );
}

export default RadioButtonComponents;
