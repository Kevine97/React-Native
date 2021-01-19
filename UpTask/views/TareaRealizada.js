import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {
  Container,
  Button,
  Text,
  H2,
  H3,
  Content,
  List,
  Form,
  Item,
  Input,
  Toast,
  ListItem,
  Left,
  View,
  Right,
} from 'native-base';
import globalStyles from '../asset/styles/global';
import {useNavigation} from '@react-navigation/native';
import {gql, useQuery} from '@apollo/client';
import Activity from '../components/Activity';
const OBTENER_TAREAS = gql`
  query obtenerTareasDetalles {
    obtenerTareasDetalles {
      nombre
      producto
      zona
      inicio
      fin
      id
      proyecto
      nombreProyecto
      estado
    }
  }
`;

const TareaRealizada = () => {
  const {data, loading, error} = useQuery(OBTENER_TAREAS);
  const navegacion = useNavigation();
  if (loading)
    return (
      <Container
        style={[
          globalStyles.contenedor,
          {backgroundColor: '#3c120c', justifyContent: 'center'},
        ]}>
        <Text style={{marginLeft: 80}}>
          <Activity />
        </Text>
      </Container>
    );

  console.log(data);
  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#3c120c'}]}>
      <Content style={{marginTop: 40}}>
        <List style={styles.contenido}>
          {data.obtenerTareasDetalles.map((tarea) => (
            <ListItem
              key={tarea.id}
              onPress={() =>
                navegacion.navigate('DetalleTareaRealizada', Object.assign(tarea))
              }>
              <Left>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  {tarea.nombre.toUpperCase()} | {tarea.producto.toUpperCase()}{' '}
                  | {tarea.inicio.replace('th', '')}
                </Text>
              </Left>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: '2.5%',
  },
});
export default TareaRealizada;
