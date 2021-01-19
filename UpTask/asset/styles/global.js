import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '2.5%',
    flex: 1,
  },
  contenidoLogo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    //width: 340,
    //height: 150,
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    fontSize: 20,
  },
  boton: {
    backgroundColor: '#ff6600',
    marginTop: 10,
  },
  botonTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  enlace: {
    color: '#FFF',
    marginTop: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  subtitulo: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default globalStyles;
