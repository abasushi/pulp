import * as React from 'react';
import { Pressable, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoListMainFunction from './Main';

function TitleScreen({ navigation }) { //title screen for pulp
  return (
    <View style={{
      backgroundColor: "#30213A",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image
        style={styles.pageOne}
        source={require('./assets/pageOne.png')}
      />
    <View style={{
      flexDirection: "row",
      flexWrap: "wrap",
    }}>
    <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={() => navigation.navigate('About')}>
            <Text style={styles.titleScreenText}>
                NEXT
            </Text>
    </TouchableOpacity>
    </View>
    </View>
  );
}

function AboutScreen({ navigation }) { //about screen for pulp
  return (
    <View style={{
      backgroundColor: "#EC9385",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image
        style={styles.pageTwo}
        source={require('./assets/pageTwo.png')}
      />
      <View style={{
      flexDirection: "row",
      flexWrap: "wrap",
    }}>
    <TouchableOpacity
          style={[styles.buttonContainerTwo]}
          onPress={() => navigation.navigate('Title')}>
            <Text style={styles.titleScreenText}>
                BACK
            </Text>
    </TouchableOpacity>

    <TouchableOpacity
          style={[styles.buttonContainerTwo]}
          onPress={() => navigation.navigate('Main')}>
            <Text style={styles.titleScreenTextTwo}>
                NEXT
            </Text>
    </TouchableOpacity>
    </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() { //main function for navigation container that stacks and sets the screens
  return (
     <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Title"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Main" component={ToDoListMainFunction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  pageOne: {
    height: 250,
    width: 225,
    resizeMode: "center"
  },
  pageTwo: {
    height: 450,
    width: 190,
    resizeMode: "center"
  },
  buttonContainer: {
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    width: 140,
    backgroundColor: "#C93F3F"
  },
  titleScreenText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFDFCA"
  },
  buttonContainerTwo: {
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    width: 140,
    backgroundColor: "#C93F3F"
  },
  titleScreenTextTwo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFDFCA"
  }
});