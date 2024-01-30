import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Image, TextInput, FlatList, Switch, ActivityIndicator, TouchableOpacity, Animated, RefreshControl } from 'react-native';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc'); // Added sort order state

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = filteredData.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://devapi.getgoally.com/v1/api/reminders/all', {
        headers: {
          Authorization: 'ddc58e6a-2e69-4f44-97e8-1454eb352069',
        },
      });
      setData(response.data.docs);
      console.log("This is the API DATA", response.data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => {
      const newSortOrder = prevSortOrder === 'asc' ? 'desc' : 'asc';
      console.log('New Sort Order:', newSortOrder);
      return newSortOrder;
    });
  };

  const handleDeleteItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const renderRightActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RectButton style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }} onPress={() => handleDeleteItem(id)}>
          <Animated.Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: 'bold',
              transform: [{ scale }],
            }}
          >
            Delete
          </Animated.Text>
        </RectButton>
      </GestureHandlerRootView>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={{ backgroundColor: '#182545', width: '100%', height: 100, justifyContent: 'flex-end' }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10 }}>
            <Image source={require('./src/Assets/Images/home.png')} style={{ width: 36, height: 36, backgroundColor: 'white', borderRadius: 30 }}></Image>
            <Text style={{ fontSize: 20, lineHeight: 24, color: 'white' }}>Routines</Text>
            <View style={{ backgroundColor: 'white', borderRadius: 30, padding: 7 }}>
              <Image source={require('./src/Assets/Images/setting.png')} style={{ width: 20, height: 20 }}></Image>
            </View>
          </View>
        </View>

        {/* Routines */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 5 }}>Morning Routine</Text>
            <View style={{ backgroundColor: '#CFE4FF', width: 160, borderRadius: 10, height: 100 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                  <Text style={{ color: 'black' }}>Weekdays</Text>
                  <Text style={{ color: 'black' }}>7:00 AM</Text>
                </View>
                <Image source={require('./src/Assets/Images/sun.png')} style={{ width: 40, height: 40, marginRight: 5 }}></Image>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, marginHorizontal: 10 }}>
                <Switch
                  trackColor={{ false: '#767577', true: '#72CEBC' }}
                  thumbColor={isEnabled ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Image source={require('./src/Assets/Images/arrow.png')} style={{ width: 24, height: 18 }}></Image>
              </View>
            </View>
          </View>

          <View style={{}}>
            <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 5 }}>Night Routine</Text>
            <View style={{ backgroundColor: '#103C58', width: 160, borderRadius: 10, height: 100, paddingHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                  <Text style={{ color: 'white' }}>Weekdays</Text>
                  <Text style={{ color: 'white' }}>7:00 AM</Text>
                </View>
                <Image source={require('./src/Assets/Images/moon.png')} style={{ width: 25, height: 40 }}></Image>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                <Switch
                  trackColor={{ false: '#767577', true: '#72CEBC' }}
                  thumbColor={isEnabled ? 'white' : 'white'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Image source={require('./src/Assets/Images/arrow.png')} style={{ width: 24, height: 18, tintColor: 'white' }}></Image>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom bar */}
        <View style={{ borderBottomWidth: 0.7, borderColor: 'grey' }}></View>

        {/* Search Bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 10, justifyContent: 'space-between', width: '85%', height: 50 }}>
            <TextInput
              placeholder="Search by name..."
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <View style={{ backgroundColor: '#49B0AB', width: 35, height: 50, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('./src/Assets/Images/search.png')} style={{ width: 20, height: 20 }} />
            </View>
          </View>
          <TouchableOpacity onPress={toggleSortOrder} style={{marginLeft: 10}}>
            <Image source={require('./src/Assets/Images/AceBtn.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>


        {/* Flatlist */}
        {/* <View style={{ flex: 1 }}>
        <FlatList
          data={sortedData}
          scrollEnabled={true}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => {
            return (
              <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
              <View style={{ flexDirection: 'row', margin: 10 }} key={item.id}>
                <Text style={{ width: 100, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ width: 220, marginLeft: 20 }}>Schedule: {JSON.stringify(item.schedule)}</Text>
              </View>
            </Swipeable>
            )
          }}
        ></FlatList>
      </View> */}

        {loading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        {/* Flatlist with RefreshControl */}
        <FlatList
          data={sortedData}
          scrollEnabled={true}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
              <View style={{ flexDirection: 'row', margin: 10 }} key={item.id}>
                <Text style={{ width: 100, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ width: 220, marginLeft: 20 }}>Schedule: {JSON.stringify(item.schedule)}</Text>
              </View>
            </Swipeable>
          )}
        />



      </View>
    </GestureHandlerRootView>
  )
};

export default App;
