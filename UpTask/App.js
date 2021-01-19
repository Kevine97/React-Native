import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import {Root} from 'native-base';
const Stack = createStackNavigator();
import Proyectos from './views/Proyectos';
import NuevoProyecto from './views/NuevoProyecto';
import Proyecto from './views/Proyecto';
import Tarea from './views/Tarea';
import TareaRealizada from './views/TareaRealizada';
import DetalleTareaRealizada from './views/DetalleTareaRealizada';
const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Iniciar Sesión', headerShown: false}}
            />

            <Stack.Screen
              name="CrearCuenta"
              component={CrearCuenta}
              options={{
                title: 'Crear cuenta',
                headerStyle: {
                  backgroundColor: '#ff6600',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}
            />

            <Stack.Screen
              name="Proyectos"
              component={Proyectos}
              options={{
                title: 'Centro de costos',
                headerStyle: {
                  backgroundColor: '#ff6600',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}
            />

            <Stack.Screen
              name="NuevoProyecto"
              component={NuevoProyecto}
              options={{
                title: 'Nuevo centro de costo',
                headerStyle: {
                  backgroundColor: '#ff6600',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}
            />

            <Stack.Screen
              name="Proyecto"
              component={Proyecto}
              options={({route}) => ({
                title: route.params.nombre,
                headerStyle: {
                  backgroundColor: '#ff6600',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              })}
            />

            <Stack.Screen
              name="Tarea"
              component={Tarea}
              options={({route}) => ({
                title: route.params.nombre,
                headerStyle: {
                  backgroundColor: '#ff6600',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              })}
            />
            <Stack.Screen
              name="TareaRealizada"
              component={TareaRealizada}
              options={{
                title: 'Tareas realizadas',
                headerStyle: {
                  backgroundColor: '#ff6600',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}
            />

            <Stack.Screen
              name="DetalleTareaRealizada"
              component={DetalleTareaRealizada}
              options={{
                title: 'Detalle de tarea',
                headerStyle: {
                  backgroundColor: '#ff6600',
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
