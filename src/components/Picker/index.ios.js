import React from "react";

import {PickerView} from './styles.js'
import {Picker as PickerSelect} from '@react-native-picker/picker' // alterei o nome do picker pq estava dando conflito com o nome do component

// para instalar o picker o comando é npx expo install @react-native-picker/picker
// olhar https://docs.expo.dev/versions/latest/sdk/picker/

export default function Picker({onChange, tipo}){

  return(
    <PickerView> 
      <PickerSelect 
        style={{
            with: '100%'
        }}
        selectedValue={tipo}
        onValueChange={(valor) => onChange(valor) }
      >    
        <PickerSelect.Item  label="Receita"  value="receita"  />
        <PickerSelect.Item  label="Despesa"  value="despesa"  />
        
      </PickerSelect>

       
       
    </PickerView>

  )

}