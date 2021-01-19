import React, {useState, useEffect} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
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
import AsyncStorage from '@react-native-community/async-storage';
import PickerLogin from '../components/Picker';
const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = ({route}) => {
  //useState del formulrio
  const [email, guardarEmail] = useState('');
  const [password, guardarPassword] = useState('');
  const [mensaje, guadarMensaje] = useState(null);
  const [cargando, guardarCargando] = useState(false);
  const [incio, guardarInicio] = useState(false);
  //React Navigation
  const navegacion = useNavigation();
  //Mutation de Apollo
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  //Cuanado el usuario inicia sesion
  const handleSubmit = async () => {
    if (email.trim() === '' || password.trim() === '') {
      //Mostrar Advertencia
      guadarMensaje('Todos los campos son obligatorios');
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
      return;
    }
    guardarInicio(true);
    try {
      const {data} = await autenticarUsuario({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const {token} = data.autenticarUsuario;
      console.log('Usuario', data);
      //Redireccionar a Proyectos
      setTimeout(() => {
        guardarInicio(false);
      }, 3000);
      navegacion.navigate('Proyectos', email.toLowerCase());
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      setTimeout(() => {
        guardarInicio(false);
      }, 3000);
      guadarMensaje(error.message);
      setTimeout(() => {
        guadarMensaje(null);
      }, 3000);
    }
  };

  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'De acuerdo',
      duration: 5000,
    });
  };

  const Spicker = () => {
    setTimeout(() => {
      guardarCargando(true);
    }, 3000);
  };

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#3c120c'}]}>
      <View style={globalStyles.contenido}>
        <View style={globalStyles.contenidoLogo}>
          <Image
            style={globalStyles.logo}
            source={require('../asset/img/logo.png')}
          />
        </View>

        {cargando === false ? (
          <>
            <PickerLogin />
            {Spicker()}
          </>
        ) : (
          <Form>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(email) => guardarEmail(email)}
                value={email}
              />
            </Item>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(pass) => guardarPassword(pass)}
              />
            </Item>
            <Button
              square
              block
              style={globalStyles.boton}
              onPress={() => handleSubmit()}>
              <Text style={globalStyles.botonTexto}>Iniciar sesión</Text>
            </Button>

            <Button
              bordered
              block
              style={
                (globalStyles.boton,
                {
                  backgroundColor: '#3c120c',
                  marginTop: 20,
                  borderColor: '#ff6600',
                })
              }
              onPress={() => navegacion.navigate('CrearCuenta')}>
              <Text style={globalStyles.botonTexto}>Crear cuenta</Text>
            </Button>

            <View style={{marginTop: 30}}>
              {incio === true ? <PickerLogin /> : <Text></Text>}
            </View>
          </Form>
        )}
        {mensaje && mostrarAlerta()}
      </View>
    </Container>
  );
};

export default Login;
