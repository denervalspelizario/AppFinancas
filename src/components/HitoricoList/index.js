import React from 'react';
import { View, Text } from 'react-native';
import { Container } from '../Header/styles';
import { Ionicons } from '@expo/vector-icons';
import { ContainerHistorico, Tipo, IconView, ValorText, TipoText} from './styles'


export default function HitoricoList({data}) {
 return (
   
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
  );
}