import { StyleSheet, Text, View, Image, TouchableOpacity, Button, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import data from '../../data/QuizData.js'
import {openDatabase} from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';
import { COLORS } from '../../constants/theme.js';
import { AuthContext } from "../context/AuthContext";
import Title from '../components/title.js';

db = SQLite.openDatabase(
  {
    name: 'rn_sqlite',
    location: 'default',
  },
  () => {
    console.log("Result database opened");
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
        <Text style={{marginRight: 9}}>{item.name + '       ' + item.score}</Text>
      </View>
    )
  }

  useEffect( () => {
    let allResults = [];
     db.transaction((txn) => {
     txn.executeSql("SELECT TestName, score from Result WHERE User = ?", [userData.name],
      (sqlTxn, res) => {console.log("Results received for user");
    let len = res.rows.length;

    if (len > 0) {
      for (let i = 0; i < len; i++) {
        let item=res.rows.item(i);
        allResults.push({name: item.TestName, score: item.Score})
      }
    }
    setResults(allResults)

  },
      (error) => {console.log(error)}
      )
    })
  },[])

  const lastFiveResults = results.splice(-5)
  console.log(lastFiveResults)
  return (
    <View>
        <View style = {styles.imageContainer}>
            <Image style={styles.image} source={require('../images/3.jpg')} />
      </View>
      {results.length > 0 ?
        <View>
          <FlatList 
          data={lastFiveResults} 
          renderItem={renderResult}/>
        </View> : <Text>Loading</Text>}
      <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Apprenticeship")}
        style={{backgroundColor: '#028090', padding: 30, borderRadius: 16, alignItems: 'center', margin: 20,
        }}>
            <Text style={{
                textAlign: 'center', color: COLORS.white, fontSize: 20
            }}>Back to Home</Text>
      </TouchableOpacity>
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