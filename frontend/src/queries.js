import { gql } from "@apollo/client";

export const GET_TODO_LIST = gql`
  query todoList {
    todoList {
      id
      name
      completed
      urgency
      note
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($values: ItemInput) {
    addItem(values: $values)
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem($values: ItemInput!) {
    updateItem(values: $values)
  }
`;

export const TOGGLE_COMPLETE_MUTATION = gql`
  mutation ToggleComplete($id: Int!) {
    toggleComplete(id: $id)
  }
`;

export const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNote($id: Int!, $note: String!) {
    updateNote(id: $id, note: $note)
  }
`;
