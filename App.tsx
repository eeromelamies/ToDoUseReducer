import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const { state, dispatch } = useTodos();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO</Text>
      
      <TextInput
        style={styles.input}
        value={state.inputValue} 
        onChangeText={(text) => dispatch({ type: 'inputValue', payload: text })}
        placeholder="Add a new task"
        placeholderTextColor="#666"
      />
      
      <Button 
        title="Add" 
        onPress={() => dispatch({ type: 'add' })} 
        color="#2e4d2e"
      />
    
      <ScrollView style={styles.listContainer}>
        {state.todos.map(todo => (
          <Text 
            key={todo.id} 
            onPress={() => dispatch({ type: 'toggle', payload: todo.id })}
            style={[
              styles.listItem, 
              todo.done && styles.listItemDone
            ]}
          >
            {todo.name} {todo.done}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 40,
    flex: 1,
    backgroundColor: '#659070' 
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000'
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#000',
    padding: 15, 
    marginBottom: 10, 
    color: '#000',
    backgroundColor: '#fff', 
    borderRadius: 5,
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    padding: 15, 
    fontSize: 18,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5,
    color: '#000',
  },
  listItemDone: {
    textDecorationLine: 'line-through',
    color: '#659070',
  }
});