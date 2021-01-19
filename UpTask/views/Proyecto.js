import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Button,
  Text,
  H2,
  Content,
  List,
  Form,
  Item,
  Input,
  Toast,
} from 'native-base';
import globalStyles from '../asset/styles/global';
import {gql, useMutation, useQuery} from '@apollo/client';
import Tarea from '../components/Tarea';
import {Picker} from '@react-native-picker/picker';
import Activity from '../components/Activity';
//Crear nuevas tareas

const NUEVA_TAREA = gql`
  mutation nuevaTarea($input: TareaInput) {
    nuevaTarea(input: $input) {
      nombre
      producto
      zona
      id
      proyecto
      estado
    }
  }
`;

//Consult las tareas del proyecto
const OBTENER_TAREAS = gql`
  query obtenerTareas($input: ProyectoIDInput) {
    obtenerTareas(input: $input) {
      id
      producto
      zona
      nombre
      estado
    }
  }
`;

const Proyecto = ({route}) => {
  const {id, admin, IdProyecto, nombreProyecto} = route.params;

  const source = {IdProyec: IdProyecto, nombreProyecto};
  const [nombre, guardarNombre] = useState('');
  const [producto, guardarProducto] = useState('');
  const [zona, guardaZona] = useState('');
  const [mensaje, guadarMensaje] = useState(null);
  const navegacion = useNavigation();

  //APOLLO
  // Apollo crear tareas
  const [nuevaTarea] = useMutation(NUEVA_TAREA, {
    update(cache, {data: {nuevaTarea}}) {
      const {obtenerTareas} = cache.readQuery({
        query: OBTENER_TAREAS,
        variables: {
          input: {
            proyecto: id,
          },
        },
      });

      cache.writeQuery({
        query: OBTENER_TAREAS,
        variables: {
          input: {
            proyecto: id,
          },
        },
        data: {
          obtenerTareas: [...obtenerTareas, nuevaTarea],
        },
      });
    },
  });

  // apollo obtener tareas
  const {data, loading, error} = useQuery(OBTENER_TAREAS, {
    variables: {
      input: {
        proyecto: id,
      },
    },
  });

  const handleSubmit = async () => {
    if (nombre.trim() === '' || producto.trim() === '' || zona.trim() === '') {
      //Mostrar Advertencia
      guadarMensaje('Todos los campos son obligatorios');
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
      return;
    }

    try {
      const {data} = await nuevaTarea({
        variables: {
          input: {
            nombre: nombre,
            producto: producto,
            zona: zona,
            proyecto: id,
          },
        },
      });
      console.log(data);
      guadarMensaje('Tarea creada correctamente');
      guardarNombre('');
      guardarProducto('');
      guardaZona('');
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  //Muestra una alerta
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'De acuerdo',
      duration: 5000,
    });
  };

  const obtenerNombre = (nombre) => {
    guardarNombre(nombre);
  };
  const obtenerProducto = (nombre) => {
    guardarProducto(nombre);
  };

  const obtenerZona = (nombre) => {
    guardaZona(nombre);
  };

  //Si apolo esta consultando
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
    <Container style={[globalStyles.contenedor, {backgroundColor: '#3c120c'}]}>
      <Form style={{marginHorizontal: '2.5%', marginTop: 20}}>
        {admin === 'administrador@ingemann.com' ? (
          <Picker
            style={globalStyles.input}
            onValueChange={(nombre) => obtenerNombre(nombre)}
            selectedValue={nombre}>
            <Picker.Item label="- Selecciones una tarea -" value="" />
            <Picker.Item label="Secado" value="secado" />
            <Picker.Item label="Selpeción" value="selpecion" />
            <Picker.Item label="Almacen" value="almacen" />
          </Picker>
        ) : (
          <Text></Text>
        )}

        {admin === 'administrador@ingemann.com' ? (
          <Picker
            style={globalStyles.input}
            onValueChange={(nombre) => obtenerProducto(nombre)}
            selectedValue={producto}>
            <Picker.Item label="- Selecciones un producto -" value="" />
            <Picker.Item label="Organico" value="organico" />
            <Picker.Item label="Con-Fino" value="con-fino" />
            <Picker.Item label="Con-Nugo" value="con-nugo" />
            <Picker.Item label="Con-Tenor" value="con-tenor" />
            <Picker.Item label="Rojo" value="rojo" />
            <Picker.Item label="Organico-UTZ" value="organico-UTZ" />
            <Picker.Item label="UTZ" value="UTZ" />
          </Picker>
        ) : (
          <Text></Text>
        )}

        {admin === 'administrador@ingemann.com' ? (
          <Picker
            style={globalStyles.input}
            onValueChange={(nombre) => obtenerZona(nombre)}
            selectedValue={zona}>
            <Picker.Item label="- Selecciones una zona -" value="" />
            <Picker.Item label="Waslala" value="waslala" />
            <Picker.Item label="Bocay" value="bocay" />
            <Picker.Item label="EL cua" value="elcua" />
          </Picker>
        ) : (
          <Text></Text>
        )}

        {admin === 'administrador@ingemann.com' ? (
          <Button
            style={globalStyles.boton}
            square
            block
            onPress={() => handleSubmit()}>
            <Text style={globalStyles.botonTexto}>Crear tarea</Text>
          </Button>
        ) : (
          <Text></Text>
        )}
      </Form>

      <H2
        style={[
          globalStyles.subtitulo,
          {
            marginBottom: 30,
            marginTop: admin === 'administrador@ingemann.com' ? 40 : -50,
          },
        ]}>
        Tareas: {route.params.nombre}
      </H2>
      <Content>
        <List style={styles.contenido}>
          {data.obtenerTareas.map((tarea) => (
            <Tarea
              key={tarea.id}
              tarea={Object.assign(tarea, source)}
              onPress={() => navegacion.navigate('Proyectos')}
            />
          ))}
        </List>
      </Content>
      {mensaje && mostrarAlerta()}
    </Container>
  );
};
const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: '2.5%',
  },
});
export default Proyecto;
