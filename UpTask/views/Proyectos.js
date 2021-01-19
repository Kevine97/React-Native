import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Activity from '../components/Activity';
import {
  Container,
  Button,
  Text,
  H2,
  Content,
  List,
  ListItem,
  Left,
  Right,
} from 'native-base';
import globalStyles from '../asset/styles/global';
import {gql, useQuery} from '@apollo/client';

const OBTENER_PROYECTOS = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const Proyectos = ({route}) => {
  const navegacion = useNavigation();
  const {data, loading, error} = useQuery(OBTENER_PROYECTOS);
  let IdProyecto = 0;
  let nombre = '';
  if (data !== undefined) {
    IdProyecto = data.obtenerProyectos[0].id;
    nombre = data.obtenerProyectos[0].nombre;
  }

  const administrador = route.params;
  const source = {admin: administrador, IdProyecto, nombreProyecto: nombre};
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

  return (
    <>
      <Container
        style={[globalStyles.contenedor, {backgroundColor: '#3c120c'}]}>
        {administrador === 'administrador@ingemann.com' ? (
          <Button
            style={[globalStyles.boton, {marginTop: 30}]}
            square
            block
            onPress={() => navegacion.navigate('NuevoProyecto')}>
            <Text style={globalStyles.botonTexto}>Nuevo centro de costo</Text>
          </Button>
        ) : (
          <Text></Text>
        )}

        {administrador === 'administrador@ingemann.com' || administrador !== 'administrador@ingemann.com' ? (
          <Button
            style={[globalStyles.boton, {marginTop: 20}]}
            square
            block
            onPress={() => navegacion.navigate('TareaRealizada')}>
            <Text style={globalStyles.botonTexto}>Tareas realizadas</Text>
          </Button>
        ) : (
          <Text></Text>
        )}
        <H2 style={[globalStyles.subtitulo, {marginBottom: 30, fontSize: 24}]}>
          Selecciona un centro de costo
        </H2>
        <Content>
          <List style={styles.contenido}>
            {data.obtenerProyectos.map((proyecto) => (
              <ListItem
                key={proyecto.id}
                onPress={() =>
                  navegacion.navigate(
                    'Proyecto',
                    Object.assign(proyecto, source),
                  )
                }>
                <Left>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    {proyecto.nombre}
                  </Text>
                </Left>
                <Right></Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: '2.5%',
  },
});
export default Proyectos;
