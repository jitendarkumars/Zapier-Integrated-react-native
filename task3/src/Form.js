import React from 'react';
import {View,Text,TextInput,StyleSheet,Button,Alert,ActivityIndicator} from 'react-native';
import {Spinner, Font} from 'native-base';
import {Picker} from 'react-native-picker-dropdown';
import {  insertDetail } from './hasuraApi';
import App from '../App';

export default class Form extends React.Component {
    constructor(props,context){
        super(props,context);
        this.state = {
          tableSelected:'user',
              EmailTextBox : '',
              MessageTextBox : '',
             isInserted: false,
             buttonPressed: false,
          }
         this.onValueChange = this.handleValueChange.bind(this)
      }
     handleValueChange(tableSelected){
       this.setState({tableSelected})
     }



     validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };



    handleEntry = async () => {
      this.setState({buttonPressed:true})
            if(this.state.EmailTextBox == ''  || !this.validateEmail(this.state.EmailTextBox))
      {
      Alert.alert('please enter correct email')
      this.setState({buttonPressed:false})
      }
      else{
      let resp = await insertDetail(this.state.EmailTextBox, this.state.MessageTextBox,this.state.tableSelected);
      if(resp.status !== 200){
        if (resp.status === 504) {
          Alert.alert("Network Error", "Check your internet connection" )
          this.setState({buttonPressed:false})
        } else {
          Alert.alert("Error")
          this.setState({buttonPressed:false})    
        }
      } else {   
        this.setState({isInserted:true})
        this.setState({buttonPressed:false})
        Alert.alert("Success", "Data inserted")      
            }
       }
      }
    


      handleEmailChange = EmailTextBox => {
        this.setState({
          ...this.state,
          EmailTextBox: EmailTextBox
        })
      }
    


      handleMessageChange = MessageTextBox => {
        this.setState({
          ...this.state,
          MessageTextBox: MessageTextBox
        })
      }
     


    render(){
        if(this.state.isInserted === true){
        return (
          <App/>
        );
      }
      else if(this.state.buttonPressed != true){
        return(       
        <View style={styles.container}>
        <Text style={styles.text}>
            select table
        </Text>  
        <Picker selectedValue={this.state.tableSelected} onValueChange={this.onValueChange} mode="dialog" style={{paddingLeft:100}}>
        <Picker.Item label="user" value="user"/>
        <Picker.Item label="details" value="details" />
        </Picker>
          <Text style={styles.text}>Enter your email id</Text>
          <TextInput  value= {this.state.EmailTextBox} onChangeText={this.handleEmailChange} placeholder="Email id" style={{width:200}}/>
          <Text style={styles.text}>Enter your Message</Text>
          <TextInput value={this.state.MessageTextBox} onChangeText={this.handleMessageChange} placeholder="message" style={{width:200}}/>
          <Button title="click here" onPress={this.handleEntry} >
          <Text style={styles.text}>Click Here </Text>
          </Button>
        </View>
        );
    }
    else{
      return(
        <View>
          <Spinner/>
          </View>
      );
    }
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      paddingTop:50,
    },
    text:{
      fontWeight:'bold',
      fontSize:20,
    }
    
  });
  