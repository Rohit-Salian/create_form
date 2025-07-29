import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Drawer,
  Typography,
  Paper,
  TextField,
  Checkbox,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const FIELD_TYPES = ["Text", "Email", "Number"];

const Sidebar = ({ onDragStart }) => {
  const [formName, setFormName] = useState("");

  return (
    <Drawer variant="permanent" anchor="left">
      <Box p={2} width="200px">
        <Typography variant="h6">Name for Form</Typography>
        <TextField
          onChange={(e) => setFormName(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="h6">Field Types</Typography>
        {FIELD_TYPES.map((type) => (
          <Paper
            key={type}
            onClick={() => onDragStart(type)}
            sx={{ my: 1, p: 1, textAlign: "center", cursor: "pointer" }}
          >
            {type}
          </Paper>
        ))}
      </Box>
    </Drawer>
  );
};

const SortableField = ({ id, type, setFields }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
  };

  const handleChange = () => {};

  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "default",
        ...style,
      }}
    >
      <Box {...listeners} sx={{ cursor: "grab" }}>
        <DragIndicatorIcon />
      </Box>
      <TextField fullWidth size="small" label={type} />
      <TextField fullWidth size="small" label={"Change Label"} />
      <Checkbox
        onChange={(e) => {
          const value = e.target.checked;
          setFields((prev) =>
            prev.map((old) =>
              old.id === id ? { ...old, required: value } : old
            )
          );
        }}
      />
      Required?
    </Paper>
  );
};

export default function FormCreator() {
  const [fields, setFields] = useState([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (type) => {
    const newField = { id: uuidv4(), type, required: false };
    setFields((prev) => [...prev, newField]);
  };
  console.log(fields);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over?.id);
      setFields((fields) => arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <Box display="flex">
      <Sidebar onDragStart={handleDragStart} />
      <Box flexGrow={1} p={3} ml="200px">
        <Typography variant="h5" mb={2}>
          Feedback Form
        </Typography>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field) => (
              <>
                <SortableField
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  setFields={setFields}
                />
              </>
            ))}
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
}
