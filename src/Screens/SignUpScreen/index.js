import React, {useEffect, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Image} from 'react-native';
import InputField from '../../Components/Common/InputField';
import {ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = email => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = password => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (!isEmailValid(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
    } else if (!isPasswordValid(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters and include letters, numbers, and special characters.',
      );
    } else {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('BottomTab');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            navigation.navigate('BottomTab');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error.Message);
        });
    }
  };

  return (
    <ScrollView style={styles.main}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.headerTitle}>Sign Up</Text>

        <View style={{margin: '15%'}}>
          <Image
            source={require('../../Assets/Images/login.png')}
            style={styles.logo}
          />
        </View>

        <InputField
          label={'Enter Email Address'}
          placeholder="Enter Email Address"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          inputContainer={styles.inputContainer}
        />
        <InputField
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputContainer}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}> */}
            <Text style={styles.signup}>{'Sign Up'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{margin: 15}}>
          <TouchableOpacity>
            <Text style={styles.forgot}>{'Forgot Password'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
