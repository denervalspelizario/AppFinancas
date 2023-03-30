import React from "react";

// para instalar o picker o comando é npx expo install @react-native-picker/picker
// olhar https://docs.expo.dev/versions/latest/sdk/picker/

import { Picker as RNPickerSelect } from '@react-native-picker/picker'; // alterei o nome do picker pq estava dando conflito com o nome do component
import { PickerView } from './styles';

export default function Picker({ onChange, tipo }){
    return(
        <PickerView>
            <RNPickerSelect
            style={{
                width:'100%'
            }}
            selectedValue={tipo}
            onValueChange={ (valor) => onChange(valor) }
            >
              <RNPickerSelect.Item label="Escolha uma opção" value="escolha" />    
              <RNPickerSelect.Item label="Receita" value="receita" />  
              <RNPickerSelect.Item label="Despesa" value="despesa" />  
            </RNPickerSelect>
        </PickerView>
    )
}