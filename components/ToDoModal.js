import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Animated, Platform} from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import colors from "../components/Colors";
import {Swipeable} from 'react-native-gesture-handler'


export default class ToDoModal extends React.Component {
  //specific functions
  state = {
    newTodo: ""
  };

  //updates the list to be completed when the box is pressed
  toggleTodoCompleted = index => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  }

  //adds a task inside the event
  addTodo = () => {
    let list = this.props.list;
    list.todos.push({title: this.state.newTodo, completed: false});

    this.props.updateList(list);
    this.setState({newTodo: ""});
  }

  //deletes a task in the event
  deleteTodo = index => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
}

  //renders the tasks
  //also has the swipe to the right for iOS users to be able to delete
  renderTodo = (todo, index) => {
    const list = this.props.list;
    return (
      <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
          <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline"}
          size={24}
          color={list.color}
          style={{ width: 32 }}
        />
        </TouchableOpacity>

        <Text
          style ={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? 'line-through' : "none",
              color: todo.completed ? list.color : colors.black
              },
          ]}
        >
              {todo.title}
          </Text>
      </View>
      </Swipeable>
    );
  };

  //configurations for the swipeable delete function
  rightActions = (dragX, index) => {
  const scale = dragX.interpolate({
      inputRange: [-100,0],
      outputRange: [1, 0.9],
      extrapolate: "clamp"
  })

  const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp"
  })

      return (
        <TouchableOpacity onPress={() => this.deleteTodo(index)}>
          <Animated.View style={[styles.rightAction, {opacity: opacity}]}>
            <Animated.Text style={{ color: "#fff", fontWeight: "600", padding: 20, transform: [{ scale }] }}>
              Delete
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      )
    }
  
  //renders the modal inside the Event
  //also shows the add task text input and button
  render(){
    const list = this.props.list;

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter(todo => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 50, right: 32, zIndex: 10}}
          onPress={this.props.closeModal}>
        <AntDesign name="close" size={24} color={list.color} />
        </TouchableOpacity>

        <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
          <View>
            <Text style={[styles.title, {color: list.color}]}>{list.name}</Text>
            <Text style={[styles.taskCount, {color: list.color}]}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

      <View style={[styles.section, {flex: 3}]}>
        <FlatList
          data={list.todos}
          renderItem={({item, index}) => this.renderTodo(item, index)}
          keyExtractor={item => item.title}
          contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 9}}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={[styles.section, styles.footer]}>
        <TextInput
          style={[styles.input, {borderColor: list.color}]}
          placeholder="Name of Task"
          onChangeText={text => this.setState({newTodo: text})}
          value={this.state.newTodo}
        />
        <TouchableOpacity
          style={[styles.addTodo, {backgroundColor: list.color}]}
          onPress={() => this.addTodo()}>
          <AntDesign name="plus" size={16} color={'#FFFFFF'} />
        </TouchableOpacity>
      </View>

      </SafeAreaView>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFF2EB"
    },
    section: {
      flex: 1,
      alignSelf: "stretch",
    },
    header: {
      justifyContent: "flex-end",
      marginLeft: 32,
      marginBottom: 10,
      borderBottomWidth: 4
    },
    title: {
      fontSize: Platform.OS === 'ios' ? 30 : 25,
      fontFamily: "productSansBold",
      paddingEnd: 40,
      width: "95%",
    },
    taskCount: {
      marginTop: 1,
      marginBottom: 16,
      fontFamily: "productSansRegular",
      fontSize: 15
    },
    footer: {
      paddingHorizontal: 32,
      flexDirection: "row",
      alignItems: "center"
    },
    input: {
      flex: 1,
      height: 48,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 6,
      marginRight: 8,
      paddingHorizontal: 12
    },
    addTodo: {
      borderRadius: 4,
      padding: 16,
      alignItems: "center",
      justifyContent: "center"
    },
    todoContainer: {
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    todo: {
      width: "90%",
      color: colors.darkPurple,
      fontFamily: "productSansBold",
      fontSize: 16,
      flexWrap: "wrap",
    },
    rightAction: {
      backgroundColor: "#C93F3F",
      marginLeft: 10,
      justifyContent: "center",
      flex: 1
    },
});