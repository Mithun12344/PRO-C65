import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

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

    getWord=(word)=>{
        var url = "https://whitehat-dictionary.glitch.me/?word=" + word
        return fetch(url)
        .then((data)=>{
          return data.json()
        })
        .then((response)=>{
          var responseObject = JSON.parse(response);
          var word = responseObject.word
          var lexicography = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
          var meaning = responseObject.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
          this.setState({
            "word" : word.trim(),
            "lexicography" : lexicography === undefined? "" : lexicography.trim(),
            "meaning" : meaning === undefined? "" : meaning.trim(),
          })
        })
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
                    defination : ""
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
        flex: 1,
        justifyContent:'center'
      },

    inputBox: {
        width: '91%',
        height: 50,
        borderWidth: 4,
      },

    searchIcon: {
        width: '50%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },

    searchWord: {
        fontSize: 20,
        fontWeight: 'bold'
    },
      
    outputBox: {
        alignItems: 'center'
    },
      
    detailsBox: {
        alignItems: 'center'
    },
      
    detailsTitle: {
        color: 'orange',
        fontSize: 18,
        fontWeight: 'bold'
    }   
});