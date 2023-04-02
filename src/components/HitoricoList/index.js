import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Container } from '../Header/styles';
import { Ionicons } from '@expo/vector-icons';
import { ContainerHistorico, Tipo, IconView, ValorText, TipoText} from './styles'


export default function HitoricoList({data, deleteItem}) { // acessando data e a funcao deleteItem
 return (
   <TouchableWithoutFeedback 
      onLongPress={() => deleteItem(data) // quando der um longo click acessa  funcao deleteItem que contem todo o data
    }>
    <ContainerHistorico>
      <Tipo>
        <IconView tipo={data.tipo}>
          <Ionicons name={ data.tipo === 'despesa' ? "arrow-up-outline" : 'arrow-down-outline'} 
            size={24} color="#FFF" 
          />
          <TipoText>{data.tipo}</TipoText>
        </IconView>
      </Tipo>  
        <ValorText>
          R$: {data.valor} 
        </ValorText>
      
    </ContainerHistorico>
    </TouchableWithoutFeedback>
  );
}