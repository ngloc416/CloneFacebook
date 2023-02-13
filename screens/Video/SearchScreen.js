import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, TextInput, SafeAreaView, Dimensions, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

function SearchScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchToolWrapper}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.navigate('VideoScreen');
          }}
        >
          <FontAwesome5Icon size={20} name="arrow-left"></FontAwesome5Icon>
        </TouchableOpacity>
        <TextInput placeholder="Tìm kiếm trong Watch" style={styles.searchInput}>

        </TextInput>
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
},
  searchToolWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.3,
      borderBottomColor: '#ddd'
  },
  btnBack: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center'
  },
  searchInput: {
      borderRadius: 48,
      backgroundColor: '#ddd',
      width: screenWidth - 60,
      height: 35,
      paddingHorizontal: 15
  }
})