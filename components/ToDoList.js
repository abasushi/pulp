import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import ImagePlaceholder from 'react-native-img-placeholder';
import ToDoModal from "./ToDoModal";

export default class ToDoList extends React.Component{

//specific functions
state = {
  showListVisible: false
};

//opens the modal when the event is pressed
toggleListModal(){
  this.setState({showListVisible: !this.state.showListVisible});
}

  //renders the Event list in the main menu UI
  render(){
    const list = this.props.list;

    const completedCount = list.todos.filter(todo => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;
 
    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal}
        >
          <ToDoModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModal()}>
        
            <Text style={styles.listTitle} numberOfLines={2}>
                {list.name}
            </Text>

          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remainingCount}
              <Text style={styles.subtitle}>  Remaining</Text></Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}
              <Text style={styles.subtitle}>  Completed</Text></Text>
            </View>
          </View>

        </TouchableOpacity>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal:16,
        borderRadius: 6,
        marginVertical: 7,
        alignItems: "center",
        width: 310
    },
    listTitle: {
        fontSize: 23,
        fontFamily: "productSansBold",
        color: "#FFFFFF",
        marginBottom: 10,
        textAlign: "center"
    },
    count: {
      fontSize: 21,
      fontFamily: "productSansMedium",
      color: "#FFFFFF",
    },
    subtitle: {
      fontSize: 15,
      fontFamily: "productSansLight",
      color: "#FFFFFF",
    },
})