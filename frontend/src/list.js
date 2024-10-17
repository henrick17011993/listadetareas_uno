import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button, TextField, Checkbox, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled } from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_ITEM_MUTATION, DELETE_ITEM_MUTATION, UPDATE_ITEM_MUTATION, GET_TODO_LIST, TOGGLE_COMPLETE_MUTATION, UPDATE_NOTE_MUTATION } from "./queries"; 
import { Delete, Edit, NoteAdd } from "@mui/icons-material"; 
import { useState } from "react";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #212b36;
  min-height: 100vh;
  color: #fff;
`;

const ContainerList = styled.div`
  display: flex;
  width: 600px;
  background-color: #1e1e1e;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  color: #ff5722;
`;

const ContainerTop = styled.form`
  display: flex;
  background-color: #282828;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  gap: 15px;
  border-radius: 10px;
`;

const ContainerButton = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

const ContainerListItem = styled.div`
  background-color: #2e2e2e;
  padding: 10px;
  border-radius: 5px;
  max-height: 400px;
  overflow: auto;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #ff5722;
    color: white;
    transition: background-color 0.3s, transform 0.3s;
    &:hover {
      background-color: #e64a19;
      transform: scale(1.05);
    }
  }
`;

const StyledListItemButton = styled(ListItemButton)`
  && {
    transition: background-color 0.3s, transform 0.3s;
    &:hover {
      background-color: #ff5722;
      transform: scale(1.02);
    }
  }
`;

const IconButton = styled.div`
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.3s;
  &:hover {
    color: #ff5722;
  }
`;

const NoteButton = styled(IconButton)`
  && {
    color: white;
    transition: background-color 0.3s, transform 0.3s;
    transform: scale(1.05);
  }
`;

export default function CheckboxList() {
  const [item, setItem] = useState("");
  const [filter, setFilter] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedUrgency, setSelectedUrgency] = useState("não urgente");
  const [openModal, setOpenModal] = useState(false);
  const [note, setNote] = useState("");
  const [currentItemId, setCurrentItemId] = useState(null); 
  const { data, refetch } = useQuery(GET_TODO_LIST);
  const [addItem] = useMutation(ADD_ITEM_MUTATION, { onCompleted: refetch });
  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, { onCompleted: refetch });
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, { onCompleted: refetch });
  const [toggleComplete] = useMutation(TOGGLE_COMPLETE_MUTATION, { onCompleted: refetch });
  const [updateNote] = useMutation(UPDATE_NOTE_MUTATION, { onCompleted: refetch }); 

  const getUrgencyColor = (urgency, completed) => {
    if (completed) return "green";
    switch (urgency) {
      case "urgente":
        return "#e306139e";
      case "importante":
        return "#fb6106d9";
      case "não urgente":
        return "#d2df07bf";
      default:
        return "transparent";
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!item.trim()) {
      Swal.fire({
        title: "Erro!",
        text: "Item não pode ser vazio.",
        icon: "error",
      });
      return;
    }

    const itemExists = data?.todoList?.some(
      (todo) => todo.name.toLowerCase() === item.toLowerCase() && todo.id !== editId
    );

    if (itemExists) {
      Swal.fire({
        title: "Erro!",
        text: "Item já existe na lista.",
        icon: "error",
      });
      return;
    }

    if (editId) {
      await updateItem({
        variables: {
          values: { id: editId, name: item, urgency: selectedUrgency },
        },
      });
      setEditId(null);
    } else {
      await addItem({
        variables: {
          values: { name: item, urgency: selectedUrgency },
        },
      });
    }

    setItem("");
    setSelectedUrgency("não urgente");
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff5722",
      cancelButtonColor: "#757575",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteItem({ variables: { id } });
        Swal.fire({
          title: "Excluído!",
          text: "O item foi removido.",
          icon: "success",
          confirmButtonColor: "#ff5722"
        });
      }
    });
  };

  const onUpdate = (id, name, urgency) => {
    setEditId(id);
    setItem(name);
    setSelectedUrgency(urgency);
  };

  const onToggleComplete = async (id) => {
    await toggleComplete({ variables: { id } });
  };

  const handleOpenModal = (id, currentNote) => {
    setCurrentItemId(id); 
    setNote(currentNote || ""); 
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNote("");
  };

  const handleSaveNote = async () => {
    if (currentItemId) {
      await updateNote({
        variables: {
          id: currentItemId,
          note: note,
        },
      });
      refetch(); 
    }
    handleCloseModal();
  };

  const onCancelEdit = () => {
    setEditId(null);
    setItem("");
    setSelectedUrgency("não urgente");
  };

  const onFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container>
      <ContainerList>
        <Title>TODO LIST</Title>
        <ContainerTop onSubmit={onSubmit}>
        <TextField
            id="filter"
            label="Filtrar por nome"
            type="text"
            variant="outlined"
            onChange={onFilter}
            InputLabelProps={{ style: { color: '#ff5722' } }} 
            sx={{ "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: '#ff5722' } }} 
          />
          <TextField
            id="item"
            label="Digite aqui"
            value={item}
            type="text"
            variant="outlined"
            onChange={(e) => setItem(e?.target?.value)}
            InputLabelProps={{ style: { color: '#ff5722' } }}
            sx={{ "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: '#ff5722' } }}
          />
          <TextField
            id="urgency"
            label="Nível de Urgência"
            select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: '#ff5722' } }}
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: '#ff5722' },
            }}
          >
            <MenuItem value="urgente" style={{ color: '#e306139e' }}>
              Urgente
            </MenuItem>
            <MenuItem value="importante" style={{ color: '#fb6106d9' }}>
              Importante
            </MenuItem>
            <MenuItem value="não urgente" style={{ color: '#d2df07bf' }}>
              Não Urgente
            </MenuItem>
          </TextField>
          <ContainerButton>
            <StyledButton variant="contained" sx={{ width: "100%" }} type="submit">
              {editId ? "Atualizar" : "Salvar"}
            </StyledButton>
            {editId && (
              <StyledButton
                variant="contained"
                sx={{ width: "100%", backgroundColor: "#757575" }} 
                onClick={onCancelEdit}
              >
                Cancelar
              </StyledButton>
            )}
          </ContainerButton>
        </ContainerTop>
        <List sx={{ width: "100%" }}>
          <ContainerListItem>
            {data?.todoList
              ?.filter((todo) => todo.name.toLowerCase().includes(filter.toLowerCase()))
              .map((value) => (
                <ListItem key={value.id} disablePadding sx={{ borderRadius: "5px", marginTop: "5px", marginBottom: "5px", backgroundColor: getUrgencyColor(value.urgency, value.completed) }}>
                  <StyledListItemButton dense>
                    <Checkbox
                      checked={value.completed}
                      onClick={() => onToggleComplete(value.id)}
                      color="primary"
                    />
                    <ListItemText primary={value.name} style={{ textDecoration: value.completed ? "line-through" : "none", color: value.completed ? "#ff5722" : "#fff" }} />
                    <IconButton onClick={() => onUpdate(value.id, value.name, value.urgency)}>
                      <Edit sx={{ color: '#fff' }} />
                    </IconButton>
                    <IconButton onClick={() => onDelete(value.id)}>
                      <Delete sx={{ color: '#fff' }} />
                    </IconButton>
                    {/* Botão para adicionar ou editar uma anotação */}
                    <NoteButton onClick={() => handleOpenModal(value.id, value.note)}>
                      <NoteAdd /> {/* Ícone de anotações */}
                    </NoteButton>
                  </StyledListItemButton>
                </ListItem>
              ))}
          </ContainerListItem>
        </List>
      </ContainerList>

      {/* Modal para Anotações */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Adicionar Anotação</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Sua Anotação"
            type="text"
            fullWidth
            variant="outlined"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveNote} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
