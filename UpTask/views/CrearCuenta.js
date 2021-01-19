import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../asset/styles/global';
import {gql, useMutation} from '@apollo/client';

const NUEVA_CUENTA = gql`
  mutation crearUsuario($input: UsuarioInput) {
    crearUsuario(input: $input)
  }
`;

const CrearCuenta = () => {
  //useState del formulrio
  const [nombre, guardarNombre] = useState('');
  const [apellido, guardarApellido] = useState('');
  const [salario, guardarSalario] = useState('');
  const [email, guardarEmail] = useState('');
  const [password, guardarPassword] = useState('');

  const [mensaje, guadarMensaje] = useState(null);
  //Crear cuenta
  const handleSunmit = async () => {
    //Validar
    if (
      nombre.trim() === '' ||
      apellido.trim() === '' ||
      salario.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      //Mostrar Advertencia
      guadarMensaje('Todos los campos son obligatorios');
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
      return;
    }

    //Password de 6 caracteres
    if (password.length < 6) {
      guadarMensaje('El password debe ser de al menos 6 caracteres');
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
      return;
    }

    //Guardar el usuario

    try {
      const {data} = await crearUsuario({
        variables: {
          input: {
            nombre: nombre,
            apellido: apellido,
            salario: parseFloat(salario),
            email: email,
            password: password,
          },
        },
      });
      guadarMensaje(data.crearUsuario);
      setTimeout(() => {
        navegacion.navigate('Login');
      }, 2000);
    } catch (error) {
      guadarMensaje(error.message);
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
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

  //React Navigation
  const navegacion = useNavigation();

  //Apollo Mutation
  const [crearUsuario] = useMutation(NUEVA_CUENTA);

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#3c120c'}]}>
      <ScrollView>
        <View style={globalStyles.contenido}>
          <View style={globalStyles.contenidoLogo}>
            <Image
              style={[globalStyles.logo, {marginTop: 50}]}
              source={require('../asset/img/logo.png')}
            />
          </View>

          <Form>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Nombre"
                keyboardType="name-phone-pad"
                onChangeText={(nombre) => guardarNombre(nombre)}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Apellido"
                onChangeText={(apellido) => guardarApellido(apellido)}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                keyboardType="numeric"
                placeholder="Salario"
                onChangeText={(salario) => guardarSalario(salario)}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={(email) => guardarEmail(email)}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(pass) => guardarPassword(pass)}
              />
            </Item>
          </Form>
          <Button
            square
            block
            style={globalStyles.boton}
            onPress={() => handleSunmit()}>
            <Text style={globalStyles.botonTexto}>Crear cuenta</Text>
          </Button>

          {mensaje && mostrarAlerta()}
        </View>
      </ScrollView>
    </Container>
  );
};

export default CrearCuenta;
