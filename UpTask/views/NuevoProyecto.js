import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Text,
  Container,
  Button,
  H1,
  Form,
  Item,
  Input,
  Toast,
} from 'native-base';
import globalStyles from '../asset/styles/global';
import {useNavigation} from '@react-navigation/native';
import {gql, useMutation} from '@apollo/client';

const NUEVO_PROYECTO = gql`
  mutation nuevoProyecto($input: ProyectoInput) {
    nuevoProyecto(input: $input) {
      nombre
      id
    }
  }
`;

//Actualizar el cache
const OBTENER_PROYECTOS = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const NuevoProyecto = () => {
  const [mensaje, guadarMensaje] = useState(null);
  const [proyecto, guardarProyecto] = useState('');
  const navegacion = useNavigation();

  const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
    update(cache, {data: {nuevoProyecto}}) {
      const {obtenerProyectos} = cache.readQuery({query: OBTENER_PROYECTOS});
      cache.writeQuery({
        query: OBTENER_PROYECTOS,
        data: {
          obtenerProyectos: obtenerProyectos.concat([nuevoProyecto]),
        },
      });
    },
  });

  const handleSubmit = async () => {
    //Validar
    if (proyecto.trim() === '') {
      guadarMensaje('El nombre del centro de costo es obligatorio ');
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);

      return;
    }

    try {
      const {data} = await nuevoProyecto({
        variables: {
          input: {
            nombre: proyecto,
          },
        },
      });
      console.log(data);
      guadarMensaje('Centro de costo creado correctamente');
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
      navegacion.navigate('Proyectos');
    } catch (error) {
      guadarMensaje(error.message);
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
      console.log(error);
    }
  };

  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'De acuerdo',
      duration: 5000,
    });
  };
  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#3c120c'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={[globalStyles.subtitulo, {marginBottom: 20}]}>
          Nuevo centro de costo
        </H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Nombre del centro de costo"
              onChangeText={(texto) => guardarProyecto(texto)}
            />
          </Item>
          <Button
            style={[globalStyles.boton, {marginTop: 20}]}
            square
            block
            onPress={() => handleSubmit()}>
            <Text style={globalStyles.botonTexto}>Crear centro de costo</Text>
          </Button>
        </Form>
        {mensaje && mostrarAlerta()}
      </View>
    </Container>
  );
};

export default NuevoProyecto;
