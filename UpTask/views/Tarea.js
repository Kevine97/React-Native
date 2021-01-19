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
} from 'native-base';
import globalStyles from '../asset/styles/global';
import {useNavigation} from '@react-navigation/native';
import {gql, useMutation, useQuery} from '@apollo/client';
import Activity from '../components/Activity';
import moment from 'moment';
moment.locale('es');

const ACTUALIZAR_TAREA = gql`
  mutation actualizarTareaDetalle(
    $id: ID!
    $input: TareaDetalleInput
    $fin: String
  ) {
    actualizarTareaDetalle(id: $id, input: $input, fin: $fin) {
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

const NUEVA_TAREA = gql`
  mutation nuevaTareaDetalle($input: TareaDetalleInput) {
    nuevaTareaDetalle(input: $input) {
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

const ELIMINAR_TAREA = gql`
  mutation eliminarTareaDetalle($id: ID!) {
    eliminarTareaDetalle(id: $id)
  }
`;

//Consult las tareas del proyecto
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

const Tarea = ({route}) => {
  const {
    id,
    nombre,
    producto,
    zona,
    estado,
    IdProyec,
    nombreProyecto,
  } = route.params;
  //APOLLO
  // Apollo crear tareas

  const [nuevaTarea] = useMutation(NUEVA_TAREA, {
    update(cache, {data: {nuevaTareaDetalle}}) {
      const {obtenerTareasDetalles} = cache.readQuery({query: OBTENER_TAREAS});
      cache.writeQuery({
        query: OBTENER_TAREAS,
        data: {
          obtenerTareasDetalles: obtenerTareasDetalles.concat([
            nuevaTareaDetalle,
          ]),
        },
      });
    },
  });
  // apollo obtener tareas
  console.log(route.params);

  /*const {data, loading, error} = useQuery(OBTENER_TAREAS, {
    variables: {
      input: {
        proyecto: IdProyec,
      },
    },
  });*/

  const [idTarea, guardarIdTarea] = useState('');
  const navegacion = useNavigation();
  const [cargando, guardarCargando] = useState(false);
  const [diplay, guardarDisplay] = useState(false);
  // Apollo
  const [actualizarTarea] = useMutation(ACTUALIZAR_TAREA);
  const [eliminarTareaDetalle] = useMutation(ELIMINAR_TAREA);
  const [mensaje, guadarMensaje] = useState(null);
  // Cambia el estado de una tarea a completo o incompleto
  const cambiarEstado = async () => {
    try {
      const {data} = await nuevaTarea({
        variables: {
          input: {
            nombre: nombre,
            producto: producto,
            zona: zona,
            inicio: moment().format('MMMM Do YYYY, h:mm:ss a'),
            fin: moment().format('MMMM Do YYYY, h:mm:ss a'),
            proyecto: IdProyec,
            nombreProyecto: nombreProyecto,
          },
        },
      });
      console.log(data);
      guardarDisplay(true);
      guardarCargando(true);
      guardarIdTarea(data.nuevaTareaDetalle.id);
    } catch (error) {
      console.log(error);
    }
  };

  const finalizarTarea = async () => {
    guardarDisplay(true);
    try {
      const {data} = await actualizarTarea({
        variables: {
          id: idTarea,
          input: {
            nombre: nombre,
            producto: producto,
            zona: zona,
          },
          fin: moment(Date.now())
            .locale('es')
            .format('MMMM Do YYYY, h:mm:ss a'),
        },
      });
      guadarMensaje('Taraea realizada correctamente ');

      setTimeout(() => {
        navegacion.navigate('Proyecto');
        guardarDisplay(false);
      }, 1000);
      guardarCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTareaDB = async () => {
    if (idTarea !== '') {
      try {
        const {data} = await eliminarTareaDetalle({
          variables: {
            id: idTarea,
          },
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    navegacion.navigate('Proyecto');
  };

  //Muestra una alerta
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'De acuerdo',
      duration: 5000,
    });
  };

  const Spicker = cargando === true ? <Activity /> : <Text></Text>;
  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#3c120c'}]}>
      <H2 style={[globalStyles.subtitulo, {marginBottom: 30, fontSize: 24}]}>
        Caracteristica de la tarea
      </H2>

      <List style={styles.contenido}>
        <ListItem>
          <Left>
            <Text style={styles.Text}>Nombre: {nombre}</Text>
          </Left>
        </ListItem>
        <ListItem>
          <Left>
            <Text style={styles.Text}>Producto: {producto}</Text>
          </Left>
        </ListItem>
        <ListItem>
          <Left>
            <Text style={styles.Text}>Zona: {zona}</Text>
          </Left>
        </ListItem>
      </List>
      <View style={{marginTop: 40}}>{Spicker}</View>
      <Form
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Button
          style={[
            globalStyles.boton,
            {
              marginTop: 20,
              marginHorizontal: '2.5%',
              display: diplay === false ? 'flex' : 'none',
            },
          ]}
          square
          onPress={() => cambiarEstado()}
          //disabled={estado === true ? true : false}
        >
          <Text style={globalStyles.botonTexto}>
            {estado === false ? 'Iniciar tarea' : 'Tarea finalizada'}
          </Text>
        </Button>
        <Button
          style={[
            globalStyles.boton,
            {
              marginTop: 20,
              marginHorizontal: '2.5%',
              display: diplay === true ? 'flex' : 'none',
            },
          ]}
          square
          onPress={() => finalizarTarea()}
          //disabled={estado === true ? true : false}
        >
          <Text style={globalStyles.botonTexto}>
            {estado === false ? 'Finalizar tareaa' : 'Tarea finalizada'}
          </Text>
        </Button>
        <Button
          style={[globalStyles.boton, {marginTop: 20}]}
          onPress={() => eliminarTareaDB()}>
          <Text style={globalStyles.botonTexto}>Cancelar tarea</Text>
        </Button>
      </Form>
      {mensaje && mostrarAlerta()}
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
export default Tarea;
