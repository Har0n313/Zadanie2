import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';

type Person = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;

};

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Person[]>([]);

  const getPerson = async () => {
    try {
      const response = await fetch('https://gorest.co.in/public/v2/users.json');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);
  

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => (
            <View style = {{padding: 9, borderColor:"green", borderBottomWidth:2}}>
          <Text style = {styles.txt} >
            Name: {item.name}🎄🎅🎁
          </Text>
          <Text style = {styles.txt} >
            Emale: {item.email}
          </Text>
          <Text style = {styles.txt} >
            Id: {item.id}
          </Text>
          <Text style = {styles.txt} >
            Gender: {item.gender}
          </Text>
          <Text style = {styles.txt} >
            Status: {item.status}
          </Text>
        </View>
      )}
    />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  txt:{
    flexWrap:"wrap",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
