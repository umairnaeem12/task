import React, {useState, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const InputField = props => {
  const {
    inputContainer,
    onParentPress,
    inputStyle,
    fieldRef,
    value,
    placeholder,
    onChangeText,
    onSubmitEditing,
    onFocus,
    onKeyPress,
    leftIcon,
    rightIcon,
    rightText,
    leftIconStyle,
    rightIconStyle,
    onRightIconPress,
    rightIconContainerStyle,
    hideLabel,
    labelStyle,
    labelContainerStyle,
    placeholderTextColor,
    leftComponent,
    maxlength,
    keyboardType,
    password,
    multiLine,
    editable,
    label,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const textInputLocalRef = useRef(null);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (textInputLocalRef.current) textInputLocalRef.current.focus();
        if (onParentPress && typeof onParentPress === 'function')
          onParentPress();
      }}
      style={[styles.inputContainer, inputContainer]}
      {...restProps}>
      {leftComponent
        ? leftComponent
        : leftIcon && (
            <Image
              style={[styles.iconStyle, {marginRight: 5}, leftIconStyle]}
              source={leftIcon}
            />
          )}
      {!hideLabel && (isFocused || value?.length > 0) && (
        <View
          style={[
            {
              position: 'absolute',
              top: -10,
              marginLeft: 10,
              backgroundColor: '#FFF',
              paddingHorizontal: 5,
            },
            labelContainerStyle,
          ]}>
          <Text style={[{}, labelStyle]}>{placeholder}</Text>
        </View>
      )}
      <TextInput
        ref={textInputLocalRef}
        label={label}
        style={[styles.inputStyle, inputStyle]}
        maxLength={maxlength}
        secureTextEntry={password}
        multiline={multiLine}
        value={value}
        editable={editable}
        keyboardType={keyboardType}
        placeholder={isFocused ? '' : placeholder}
        placeholderTextColor={placeholderTextColor || 'gray'}
        onChangeText={text => {
          if (onChangeText && typeof onChangeText === 'function')
            onChangeText(text);
        }}
        onSubmitEditing={() => {
          if (onSubmitEditing && typeof onSubmitEditing === 'function')
            onSubmitEditing();
        }}
        onFocus={event => {
          setIsFocused(true);
          if (onFocus && typeof onFocus === 'function') onFocus(event);
        }}
        onBlur={event => {
          setIsFocused(false);
        }}
        onKeyPress={event => {
          if (onKeyPress && typeof onKeyPress === 'function') onKeyPress(event);
        }}
      />
      {rightIcon && (
        <TouchableOpacity
          style={[{padding: 10}, rightIconContainerStyle]}
          onPress={() => {
            if (onRightIconPress) onRightIconPress();
          }}>
          {rightText ? (
            <Text style={{}}>{rightText}</Text>
          ) : (
            <Image
              style={[styles.iconStyle, rightIconStyle]}
              source={rightIcon}
            />
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default InputField;
