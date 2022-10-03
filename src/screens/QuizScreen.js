import React, { useEffect, useState, useContext } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated } from 'react-native'
import { COLORS, SIZES } from '../../constants';
import data from '../../data/QuizData.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {openDatabase} from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';
import { AuthContext } from "../context/AuthContext";

// db = SQLite.openDatabase(
//     {
//       name: 'Apprenticeships',
//       location: 'default',
//       // createFromLocation: '~apprenticeships.db',
//     },
//     () => {
//       console.log("Database Opened Success");
//     },
//     error => {
//       console.log("ERROR: " + error);
//     }
//   );

db = SQLite.openDatabase(
    {
      name: 'Apprenticeships',
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

const Quiz = ({navigation}) => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const {userData} = useContext(AuthContext);

    // const createTables = () => {
    //     db.transaction((txn) => {
    //       txn.executeSql(
    //         "CREATE TABLE IF NOT EXISTS Results (id INTEGER PRIMARY KEY AUTOINCREMENT, TestName TEXT, Score TEXT)", [],
    //         (sqlTxn, res) => { console.log('table created successfully')
    //         },
    //         error => {console.log('error on creating table') + error.message},
    //         )
    //     })
    //   }

    const createTables = () => {
        db.transaction((txn) => {
        txn.executeSql(
        "CREATE TABLE IF NOT EXISTS Result (id INTEGER PRIMARY KEY AUTOINCREMENT, User TEXT, TestName TEXT, Score TEXT)", [],
        (sqlTxn, res) => { console.log(userData.name)
        },
        error => {console.log('error on creating table') + error.message},
        )
        })
      }

      useEffect(() => {
        createTables()
    }, [])

    const addResult = () => {
        const scorePercentage = score/(allQuestions.length)*100 + '%'
        db.transaction((txn) => {
            txn.executeSql(
                "INSERT INTO Result (User, TestName, Score) VALUES (?, 'Software Developer', ?)", [userData.name, scorePercentage],
                (sqlTxn, res) => {console.log('Score has been saved')},
                error => {console.log(error)}
            )
        })
    }

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            // Set Score
            setScore(score+1)
        }
        // Show Next Button
        setShowNextButton(true)
    }
    const handleNext = () => {
        if(currentQuestionIndex== allQuestions.length-1){
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const restartQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }



    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.black, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: COLORS.black, fontSize: 18, opacity: 0.6}}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.black,
                    fontSize: 16
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity 
                        onPress={()=> validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: option==correctOption 
                            ? COLORS.success
                            : option==currentOptionSelected 
                            ? COLORS.error 
                            : COLORS.accent,
                            backgroundColor: option==correctOption 
                            ? COLORS.success +'20'
                            : option==currentOptionSelected 
                            ? COLORS.error +'20'
                            : COLORS.accent,
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.black}}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                            {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ): option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            }

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity
                onPress={handleNext}
                style={{
                    backgroundColor: '#028090', padding: 30, borderRadius: 16, alignItems: 'center', margin: 20,
                }}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#028090',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }


    return (
       <SafeAreaView style={{
           flex: 1
       }}>
           <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
           <View style={{
               flex: 1,
               paddingVertical: 40,
               paddingHorizontal: 16,
               backgroundColor: COLORS.background,
               position:'relative'
           }}>

               {/* ProgressBar */}
               { renderProgressBar() }

               {/* Question */}
               {renderQuestion()}
               <Text style={{color: 'black'}}>Please select an option to continue</Text>

               {/* Options */}
               {renderOptions()}

               {/* Next Button */}
               <View style={{marginBottom: 12, paddingVertical: 16, justifyContent: 'space-between', flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Apprenticeship")}
                    style={{backgroundColor: '#028090', padding: 30, borderRadius: 16, alignItems: 'center', margin: 20,
                    }}>
                        <Text style={{
                            textAlign: 'center', color: COLORS.white, fontSize: 20
                        }}>Back to Home</Text>
                </TouchableOpacity>
                {renderNextButton()}
               </View>

               {/* Score Modal */}
               <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                   <View style={{
                       flex: 1,
                       backgroundColor: '#028090',
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: COLORS.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>{ score> (allQuestions.length/2) ? 'Congratulations!' : 'Oops!' }</Text>

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 30,
                                   color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ { allQuestions.length }</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <TouchableOpacity
                           onPress={() => addResult()}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20, margin: 20,
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.black, fontSize: 20
                               }}>Save Result</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.black, fontSize: 20
                               }}>Retry Quiz</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                           onPress={() => navigation.navigate("Apprenticeship")}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20, margin: 20,
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.black, fontSize: 20
                               }}>Back to Home</Text>
                           </TouchableOpacity>

                       </View>

                   </View>
               </Modal>
           </View>
       </SafeAreaView>
    )
}

export default Quiz