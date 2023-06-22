import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskText }]);
      setTaskText('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={styles.tacheText}>
        <Text numberOfLines={1} style={styles.taskText}>{item.text }</Text>
      </View>
      <View style={styles.taskContainerBtn}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => toggleTaskCompletion(item.id)}
        >
        <Text style={styles.completeButtonText}>
          {item.completed ? 'Annuler' : 'Terminé'}
        </Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Liste des tâches</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter une tâche"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>  
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Aucune tâche pour le moment</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
    textAlign : "center",
  },
  taskContainer: {
    alignItems: 'center',
    justifyContent  : 'space-between',
    flexDirection: 'row',
    marginTop: 15,
  },
  tacheText: {
    width: '50%',
  },
  taskText: {
    flex : 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    flexWrap: 'wrap',
  },
  taskContainerBtn: {
    flexDirection: 'row',
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FF0000',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  completeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'column',
    marginTop: 8,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    width: '100%',
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    width: '100%',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    color: 'red',
  },
});