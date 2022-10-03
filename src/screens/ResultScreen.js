import { StyleSheet, Text, View, Image, TouchableOpacity, Button, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import data from '../../data/QuizData.js'
import {openDatabase} from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';
import { COLORS } from '../../constants/theme.js';
import { AuthContext } from "../context/AuthContext";

db = SQLite.openDatabase(
  {
    name: 'rn_sqlite',
    location: 'default',
    // createFromLocation: '~apprenticeships.db',
  },
  () => {
    console.log("Database Opened Success");
  },
  error => {
    console.log("ERROR: " + error);
  }
);

const ResultScreen = ({navigation}) => {
  const [userResults, setUserResults] = useState()
  const [results, setResults] = useState([])
  const {userData} = useContext(AuthContext);

  const renderResult = ({item}) => {
    return(
      <View style={{
        flexDirection: 'row',
        paddingVertical: 12, 
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "black",
      }}>
        <Text style={{marginRight: 9}}>{item.name}</Text>
        <Text>{item.Score}</Text>
      </View>
    )
  }

  useEffect( () => {
    db.transaction((txn) => {
      txn.executeSql("SELECT TestName, score from Result WHERE User = ?", [userData.name],
      (sqlTxn, res) => {console.log("Results received for user");
    let len = res.rows.length;

    if (len > 0) {
      let results = [];
      for (let i = 0; i < len; i++) {
        let item=res.rows.item(i);
        results.push({name: item.TestName, score: item.Score})
        console.log(results)
      }
      //setResults(results);
    }
  },
      (error) => {console.log(error)}
      )
    })
  })


  // useEffect(() => {
  //   db.transaction((txn) => {
  //     txn.executeSql("CREATE TABLE ")

  //   })
  //   console.log('ON THE RESULTS SCREEN')
  // }, [])
  const addUserResults = () => {}
  return (
    <View>
        <View>
          <FlatList 
          data={results} 
          renderItem={renderResult}></FlatList>
        </View>
        <View style = {styles.imageContainer}>
            <Image style={styles.image} source={require('../images/3.jpg')} />
      </View>
      <View>
        <Text>{results}</Text>
      </View>
      <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Apprenticeship")}
        style={{backgroundColor: '#028090', padding: 30, borderRadius: 16, alignItems: 'center', margin: 20,
        }}>
            <Text style={{
                textAlign: 'center', color: COLORS.white, fontSize: 20
            }}>Back to Home</Text>
      </TouchableOpacity>
      {/* <Button title="Save result" onPress={console.log('Saved results')}></Button> */}
      </View>
    </View>
  )
}

export default ResultScreen

const styles = StyleSheet.create({
    container: {
      paddingTop: 25, 
      paddingHorizontal: 16,
      height: '100%',
    },
    image: {
      height: 400,
      width: 400,
      resizeMode: 'contain',
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  });