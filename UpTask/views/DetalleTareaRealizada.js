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

const DetalleTareaRealizada = ({route}) => {
  console.log(route.params);

  const {
    estado,
    fin,
    inicio,
    nombre,
    nombreProyecto,
    producto,
    zona,
  } = route.params;
  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#3c120c'}]}>
      <Content style={{marginTop: 40}}>
      <List style={styles.contenido}>
        <ListItem>
            <Left>
                <Text  style={styles.Text}>Nombre:  {nombre.toUpperCase()}</Text>
            </Left>
        </ListItem>
        <ListItem>
            <Left>
                <Text  style={styles.Text}>Producto:  {producto.toUpperCase()}</Text>
            </Left>
        </ListItem>
        <ListItem>
            <Left>
                <Text  style={styles.Text}>Zona:  {zona.toUpperCase()}</Text>
            </Left>
        </ListItem>
        <ListItem>
            <Left>
                <Text  style={styles.Text}>Centro de costo:  {nombreProyecto.toUpperCase()}</Text>
            </Left>
        </ListItem>
        <ListItem>
            <Left>
                <Text  style={styles.Text}>Hora y fecha de inicio:  {inicio.replace('th', '')}</Text>
            </Left>
        </ListItem>
        <ListItem>
            <Left>
                <Text  style={styles.Text}>Hora y fecha de finalización:  {fin.replace('th', '')}</Text>
            </Left>
        </ListItem>
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
  Text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default DetalleTareaRealizada;
