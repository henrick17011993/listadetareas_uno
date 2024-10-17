const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { TODO_LIST } = require("./makeData");

function getRandomInt() {
  return Math.floor(Math.random() * 999);
}

const typeDefs = `#graphql
  type Item {
    id: Int
    name: String
    completed: Boolean
    urgency: String
    note: String
  }

  input ItemInput {
    id: Int
    name: String
    completed: Boolean
    urgency: String!
    note: String
  }

  type Query {
    todoList: [Item]
  }

  type Mutation {
    addItem(values: ItemInput): Boolean
    updateItem(values: ItemInput): Boolean
    deleteItem(id: Int!): Boolean
    toggleComplete(id: Int!): Boolean 
    updateNote(id: Int!, note: String!): Boolean
  }
`;

const resolvers = {
  Query: {
     todoList: (_, { filter }) => {
      
      if (filter) {
        return TODO_LIST.filter(item => {
          return (
            (filter.id !== undefined ? item.id === filter.id : true) &&
            (filter.name ? item.name.toLowerCase().includes(filter.name.toLowerCase()) : true)
          );
        });
      }
      return TODO_LIST;
    },
  },
  Mutation: {
    addItem: (_, { values }) => {
      
      if (!values.name) return false;
      
      const validUrgencies = ["urgente", "importante", "não urgente"];
      if (!validUrgencies.includes(values.urgency)) {
        throw new Error("Urgência inválida. Deve ser 'urgente', 'importante' ou 'não urgente'.");
      }
      
      TODO_LIST.push({
        id: getRandomInt(),
        name: values.name,
        completed: false,
        urgency: values.urgency,
        note: values.note || "",
      });
      return true;
    },
    updateItem: (_, { values }) => {
      const itemIndex = TODO_LIST.findIndex(item => item.id === values.id);
      
      if (itemIndex === -1 || !values.name) return false;
      
      TODO_LIST[itemIndex].name = values.name;
      TODO_LIST[itemIndex].urgency = values.urgency;
      TODO_LIST[itemIndex].note = values.note || "";
    
      return true; 
    },    
    deleteItem: (_, { id }) => {
      const itemIndex = TODO_LIST.findIndex(item => item.id === id);
      if (itemIndex === -1) return false;
      TODO_LIST.splice(itemIndex, 1);
      return true;
    },
    toggleComplete: (_, { id }) => {
      const itemIndex = TODO_LIST.findIndex(item => item.id === id);
      if (itemIndex === -1) return false;
      TODO_LIST[itemIndex].completed = !TODO_LIST[itemIndex].completed; 
      return true;
    },
    updateNote: (_, { id, note }) => {  
      const itemIndex = TODO_LIST.findIndex(item => item.id === id);
      if (itemIndex === -1) return false;

      TODO_LIST[itemIndex].note = note;  
      return true;
    },
  },
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();



