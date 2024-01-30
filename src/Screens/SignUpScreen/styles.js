import {StyleSheet} from 'react-native';
import {Colors} from '../../Constant/Colors';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: 10,
  },
  logo: {
    height: 300,
    width: 300,
  },
  inputContainer: {
    height: 55,
    width: '90%',
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    shadowColor: Colors.app,
    elevation: 2,
  },
  buttonContainer: {
    height: 55,
    width: '80%',
    marginTop: '10%',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: Colors.app,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    shadowColor: Colors.app,
    elevation: 2,
  },
  signup: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgot: {
    fontSize: 16,
    color: Colors.app,
  },
});

export default styles;
