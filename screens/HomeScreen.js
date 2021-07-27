import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../localdb';
import * as Speech from 'expo-speech';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            meaning: [],
            lexicography: [],
            pressSearch: false,
            loading: false,
            word: 'Receiving...'
        };
    }

    getWord = (text) => {
      var text = text.toLowerCase()
      try{
        var word = db[text]["word"]
        var lexicography = db[text]["lexicography"]
        var meaning = db[text]["meaning"]
        this.setState({
          "word" : word,
          "lexicography" : lexicography,
          "meaning" : meaning
        })
      }
      catch(err){
        alert("This word is unavailable")
        this.setState({
          'text':'',
          'pressSearch':false
        })
      }
    }

    speak = () => {
      Speech.speak(this.state.word)
    }    

    render() {
        return(
            <View style={styles.container}>
            <Header style= {styles.header} />
            <View style={styles.enterBox}>
              <TextInput style={styles.inputBox}
                onChangeText={text => {
                  this.setState({
                    text: text,
                    pressSearch: false,
                    word: "Receiving...",
                    lexicography :'',
                    examples : [],
                    meaning : ""
                  });
                }}
                value={this.state.text}
              />
    
              <TouchableOpacity style={styles.searchIcon}
                onPress={() => {
                  this.setState({ pressSearch: true });
                  this.getWord(this.state.text)
                }}>
                <Text style={styles.searchWord}>Search</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.outputBox}>
              <Text style={styles.text}>
                {
                  this.state.pressSearch && this.state.word === "Receiving..."
                  ? this.state.word
                  : ""
                }
              </Text>
                {
                  this.state.word !== "Receiving..." ?
                  (
                    <View style={{justifyContent:'center', marginLeft: 13}}>
                      <View style={styles.detailsBox}>
                        <Text style={styles.detailsTitle}>
                          Word :{" "}
                        </Text>
                        <Text style={{fontSize: 19, color: 'orange'}}>
                          {this.state.word}
                        </Text>
                      </View>
                      <View style={styles.detailsBox}>
                        <Text style={styles.detailsTitle}>
                          Type :{" "}
                        </Text>
                        <Text style={{fontSize: 18, fontStyle: 'bold'}}>
                          {this.state.lexicography}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.detailsTitle}>
                          Meaning:{" "}
                        </Text>
                        <Text style={{ fontSize:19}}>
                          {this.state.meaning}
                        </Text>
                        <TouchableOpacity style={styles.speechButton}
                        onPress = {
                          this.speak
                        }>
                          <Text>
                            {this.state.word}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                  :null
                }
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    header: {
        fontSize: 22,
        backgroundColor: 'purple'
    },

    enterBox: {
      flex: 0.25,
      alignItems: 'center',
      justifyContent: 'center'
      },

    inputBox: {
      width: '70%',
      alignSelf: 'center',
      height: 40,
      textAlign: 'center',
      borderWidth: 3,
      },

    searchIcon: {
      width: '50%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderWidth: 3,
      borderRadius: 11,
    },

    searchWord: {
        fontSize: 20,
        fontWeight: 'bold'
    },
      
    outputBox: {
      flex: 0.7,
      alignItems:'center'
    },
      
    detailsBox: {
      flexDirection: 'row',
      alignItems: 'center'
    },
      
    detailsTitle: {
        color: 'orange',
        fontSize: 18,
    },
    
    speechButton: {
      width: '40%',
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderWidth: 3,
      borderRadius: 11,
    }
});