import React,{useState} from 'react';
import { View,Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container, Header } from './styles'



// para instalar o date picker comando expo install @react-native-community/datetimepicker
// olhart a documentação  https://www.npmjs.com/package/@react-native-community/datetimepicker

export default function DatePicker({date, onClose, onChange}) { // recebendo o date, onChange e o onClose la da home 

  const [dateNow, setDateNow] = useState(new Date(date))

  return (
   <Container>

    {Platform.OS === 'ios' && (  // se for ios  renderiza isso aqui
      <Header>
        <TouchableOpacity onPress={ onClose }>
          <Text>Fechar</Text>
        </TouchableOpacity>
      </Header>

    )}

    <DateTimePicker 
      value={dateNow} // repassando valor de date
      mode='date' // tipo de mode no caso date
      display='default' // display padrão
      onChange={(event, date) => {
        
        const currentDate = date || dateNow // current recebendo a data do picker se caso não hover recebe a data de hj pelo state dateNow
        setDateNow(currentDate);
        onChange(currentDate);
      }}
      style={{ backgroundColor: '#FFF'}}

    />
   </Container>
  );
}