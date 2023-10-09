import React from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import colors from "../components/Colors"

export default class AddListModal extends React.Component{
  backgroundColors = ["#9B759E", "#6EB7B1", "#EC9385", "#F48282", "#F49964", "#B4A1DB"];

  //sets the background color
  state = {
    name: "",
    color: this.backgroundColors[0]
  };

  //to be able to add an event to the main menu through touchableopacity and text input
  createTodo= () => {
    const {name, color} = this.state

    const list = {name, color};

    this.props.addList(list);

    this.setState({ name: "" })
    this.props.closeModal();
  };

  //renders the optional bg colors to the add event button
  renderColors(){
  return this.backgroundColors.map(color => {
    return (
      <TouchableOpacity
        key={color}
        style={[styles.colorSelect, {backgroundColor: color}]}
        onPress={() => this.setState({color})}/>
    );
  });
}

//renders the design for the Create Event modal
  render(){
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
            <AntDesign name="close" size={24} color={colors.purple} />
          </TouchableOpacity>

          <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
            <Text style={styles.title}>Create Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Name of Event"
              onChangeText={text => this.setState({name: text})}/>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16}}>
              {this.renderColors()}
            </View>

            <TouchableOpacity
              style={[styles.create, {backgroundColor: this.state.color}]}
              onPress={this.createTodo}
            >
              <Text style={{color: colors.white, fontFamily: "productSansMedium"}}>Add Event</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    fontSize: 28,
    fontFamily: "productSansBold",
    color: colors.purple,
    alignSelf: "center",
    marginBottom: 16
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.purple,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: "productSansLight"
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4
  }
});