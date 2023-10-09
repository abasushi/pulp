import React from 'react';
import {AntDesign} from '@expo/vector-icons'
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, ScrollView, Image, Platform} from 'react-native';
import * as Font from 'expo-font';

import colors from './components/Colors';
import tempData from './components/tempData';
import ToDoList from './components/ToDoList';
import AddListModal from './components/AddListModal';

export default class ToDoListMainFunction extends React.Component { //main To Do List function
  //function for imported fonts to work
  // set the initial state
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    // load fonts
    await this.loadFonts();
  }

  loadFonts = async () => {
    // load the font 
    await Font.loadAsync({
      "productSansBlack": require('./assets/Fonts/ProductSans-Black.ttf'),
      "productSansBold": require('./assets/Fonts/ProductSans-Bold.ttf'),
      "productSansLight": require('./assets/Fonts/ProductSans-Light.ttf'),
      "productSansRegular": require('./assets/Fonts/ProductSans-Regular.ttf'),
      "productSansMedium": require('./assets/Fonts/ProductSans-Medium.ttf'),
    });
  }

  //specific functions
  state = {
    addToDoVisible: false,
    lists: tempData
  }
  
  //opens the add to do modal
  toggleAddTodoModal(){
    this.setState({addToDoVisible: !this.state.addToDoVisible});
  }

  //renders the list from ToDoList.js
  renderList = list => {
    return <ToDoList list={list} updateList={this.updateList} />;
  }

  //lets addList to be able to add to the list
  addList = list => {
    this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, todos: []}]})
  };

  //updates the list when adding events and in the tempData
  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    });
  };

  //renders the design
  render(){
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addToDoVisible}
          onRequestClose={() => this.toggleAddTodoModal}
        >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>

        <View style={{flexDirection: "row"}}>
          <Text style={styles.title}>
            Recent <Text style={{ fontFamily: "productSansBold",
            color: colors.purple}}>Tasks</Text>
          </Text>
        </View>
    
      <ScrollView style={{ marginTop: 10}}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="interactive">
        <FlatList
          data={this.state.lists}
          keyExtractor={item => item.name}
          vertical={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => this.renderList(item)}

          keyboardShouldPersistTaps="always"
        />
      </ScrollView>
      
      <View style={{  //Footer
                width: '100%',
                height: "8%",
                backgroundColor: "#3A2A47",
                justifyContent: 'center',
                alignItems: 'center',
              }}>
        <TouchableOpacity onPress={() => this.toggleAddTodoModal()}>
              <View style ={{
                flexDirection: "row",
              }}>
                <Image
                  style={styles.logo}
                  source={require('./assets/addEvent.png')}
                />
              </View>
        </TouchableOpacity>
        
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDFCA",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontFamily: "productSansBold",
    color: colors.darkPink,
    paddingTop: "10%",
  },
  logo: {
    height: 40,
    width: 30,
    resizeMode: "center"
  },
});