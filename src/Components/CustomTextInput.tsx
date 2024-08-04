import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React, {FC} from 'react';
  import {moderateScale, moderateVerticalScale, scale} from 'react-native-size-matters';

  interface Proptypes {
    value: any;
    containerStyles?: object;
    leftImg?: any;
    rightImg?: any;
    isLeft?: boolean;
    isRight?: boolean;
    placeholder?: string;
    placeHolderColor?: string;
    textInputStyles?: object;
    keyboardType?: string;
    onChangeText?: (val: any) => void;
    rightImageStyle?: object;
    leftImageStyle?: object;
    secureTextEntry?: boolean;
    onPressRight?: () => void;
    maxLength?: number;
    editable?: boolean;
    label?: string;
    labelStyles?: object;
    maxHeight?: number;
    multiline?:boolean;
    onBlur?:(e?:any)=>void
  }
  export const CustomTextInput: FC<Proptypes> = ({
    value,
    containerStyles = {},
    leftImg,
    rightImg,
    isLeft = !!leftImg ? true : false,
    isRight = !!rightImg ? true : false,
    placeholder,
    placeHolderColor = 'grey',
    textInputStyles = {},
    keyboardType = 'default',
    onChangeText = () => {},
    rightImageStyle = {},
    leftImageStyle = {},
    secureTextEntry = false,
    onPressRight = () => {},
    maxLength,
    editable = true,
    label = '',
    labelStyles,
    maxHeight = moderateVerticalScale(50),
    multiline= false,
    onBlur=(e)=>{},
    ...props
  }: Proptypes) => {
    return (
      <View>
        {!!label && (
          <Text style={{...styles.labelStyle, ...labelStyles}}>{label}</Text>
        )}
        <View style={{...styles.container, ...containerStyles}}>
          {!!isLeft && (
            <TouchableOpacity>
              <Image
                style={{...styles.leftstyle, ...leftImageStyle} as any}
                source={leftImg}
              />
            </TouchableOpacity>
          )}
          <TextInput
            multiline={multiline}
            textAlignVertical='top'
            placeholder={placeholder}
            editable={editable}
            style={{
              ...styles.textinputStyles,
              ...textInputStyles,
              maxHeight: maxHeight,
            }}
            value={value}
            keyboardType={keyboardType as any}
            placeholderTextColor={placeHolderColor}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            onBlur={onBlur}
            {...props}
          />
          {!!isRight && (
            <TouchableOpacity onPress={onPressRight}>
              <Image
                style={{...styles.rightstyle, ...rightImageStyle} as any}
                source={rightImg}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: "grey",
      backgroundColor:'white',
      justifyContent: 'center',
      borderRadius: moderateScale(6),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(12),
    },
    textinputStyles: {
      fontSize: scale(14),
      flex: 1,
      padding: moderateScale(12),
      color: "grey",
    },
    rightstyle: {
      height:moderateScale(20),
      width:moderateVerticalScale(20)
    },
    leftstyle: {},
    labelStyle: {
      marginVertical: moderateVerticalScale(12),
      fontSize: scale(14),
      color:"black"
    },
  });
  