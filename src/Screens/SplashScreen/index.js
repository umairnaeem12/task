import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from '../../Navigation/Navigator';
import AnimatedSplash from 'react-native-animated-splash-screen';

const SplashScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }, []);

  const TestTask = () => {
    return (
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    );
  };

  return (
    <AnimatedSplash
      isLoaded={isLoaded}
      backgroundColor={'#fff'}
      logoImage={require('../../Assets/Images/logo.png')}>
      <TestTask />
    </AnimatedSplash>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
