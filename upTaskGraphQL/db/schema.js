const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Token {
    token: String
  }

  type Proyecto {
    nombre: String
    id: ID
  }

  type Tarea {
    nombre: String
    producto: String
    zona: String
    id: ID
    proyecto: String
    estado: Boolean
  }

  type TareaDetalle {
    nombre: String
    producto: String
    zona: String
    inicio: String
    fin: String
    id: ID
    proyecto: String
    nombreProyecto: String
    estado: Boolean
  }

  type Query {
    obtenerProyectos: [Proyecto]
    obtenerTareas(input: ProyectoIDInput): [Tarea]
    obtenerTareasDetalles: [TareaDetalle]
  }

  input ProyectoIDInput {
    proyecto: String!
  }
  input ProyectoIDDetalleInput {
    proyecto: String!
  }

  input UsuarioInput {
    nombre: String!
    apellido: String!
    salario: Float!
    email: String!
    password: String!
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  input ProyectoInput {
    nombre: String!
  }

  input TareaInput {
    nombre: String!
    producto: String!
    zona: String!
    proyecto: String
  }
  input TareaDetalleInput {
    nombre: String!
    producto: String!
    zona: String!
    inicio: String
    fin: String
    proyecto: String
    nombreProyecto: String
  }

  type Mutation {
    # Usuarios
    crearUsuario(input: UsuarioInput): String
    autenticarUsuario(input: AutenticarInput): Token

    # Proyectos
    nuevoProyecto(input: ProyectoInput): Proyecto
    actualizarProyecto(id: ID!, input: ProyectoInput): Proyecto
    eliminarProyecto(id: ID!): String

    # Tareas
    nuevaTarea(input: TareaInput): Tarea
    actualizarTarea(id: ID!, input: TareaInput, estado: Boolean): Tarea
    eliminarTarea(id: ID!): String

    # Tarea Detalle
    nuevaTareaDetalle(input: TareaDetalleInput): TareaDetalle
    actualizarTareaDetalle(
      id: ID!
      input: TareaDetalleInput
      fin: String
    ): TareaDetalle
    eliminarTareaDetalle(id: ID!): String
  }
`;

module.exports = typeDefs;
