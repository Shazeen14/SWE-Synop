import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>We Train Apprentices</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontSize: 28, 
    fontWeight: "60",
    color: 'black'
  }, 
  container: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
})