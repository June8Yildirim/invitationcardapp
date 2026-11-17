// /**
//  * Learn more about Light and Dark modes:
//  * https://docs.expo.io/guides/color-schemes/
//  */
// /**
//  * Learn more about Light and Dark modes:
//  * https://docs.expo.io/guides/color-schemes/
//  */
//
// import {
//   StyleSheet,
//   Text as DefaultText,
//   TextInput as DefaultTextInput,
//   View as DefaultView,
//   TextInputProps,
// } from 'react-native';
//
// import Colors from '@/constants/Colors';
// import { useTheme } from '@/context/ThemeContext';
//
// export type TextProps = DefaultText['props'];
// export type ViewProps = DefaultView['props'];
//
// type ThemedTextProps = TextProps & {
//   type?:
//     | 'default'
//     | 'title'
//     | 'semiBold'
//     | 'subtitle'
//     | 'link'
//     | 'miniText'
//     | 'cardTitle'
//     | 'cardSubtitle'
//     | 'cardBody'
//     | 'error';
//   size?: 'xs' | 'small' | 'medium' | 'large' | 'xlarge'; // Add this line
// };
//
// export function Text({ style, size = 'medium', type = 'default', ...rest }: ThemedTextProps) {
//   const { effectiveTheme } = useTheme();
//   const textColour = Colors[effectiveTheme].text;
//   const errorColor = Colors[effectiveTheme].accent;
//
//   return (
//     <DefaultText
//       style={[
//         { color: type === 'error' ? errorColor : textColour },
//         type === 'default' ? styles.default : undefined,
//         type === 'title' ? styles.title : undefined,
//         type === 'semiBold' ? styles.semiBold : undefined,
//         type === 'subtitle' ? styles.subtitle : undefined,
//         type === 'link' ? styles.link : undefined,
//         type === 'miniText' ? styles.miniText : undefined,
//         type === 'cardTitle' ? styles.cardTitle : undefined,
//         type === 'cardSubtitle' ? styles.cardSubtitle : undefined,
//         type === 'cardBody' ? styles.cardBody : undefined,
//         type === 'error' ? styles.error : undefined,
//         // Handle Sizes
//         size === 'xs' && styles.xs,
//         size === 'small' && styles.small,
//         size === 'medium' && styles.medium,
//         size === 'large' && styles.large,
//         size === 'xlarge' && styles.xlarge,
//         style,
//       ]}
//       {...rest}
//     />
//   );
// }
//
// type ThemedViewProps = ViewProps & {
//   lightColor?: string;
//   darkColor?: string;
// };
//
// export function View({ style, ...otherProps }: ThemedViewProps) {
//   const { effectiveTheme } = useTheme();
//   const backgroundColor = Colors[effectiveTheme].background;
//
//   return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
// }
//
// type ThemedTextInputProps = TextInputProps & {
//   lightColor?: string;
//   darkColor?: string;
//   errorMessage?: string;
//   isValid?: boolean;
// };
//
// export function TextInput({
//   errorMessage,
//   isValid,
//   value,
//   style,
//   onBlur,
//   keyboardType = 'email-address',
//   onFocus,
//   placeholder,
//   onChangeText,
//   ...otherProps
// }: ThemedTextInputProps) {
//   const { effectiveTheme } = useTheme();
//   const backgroundColor = Colors[effectiveTheme].background;
//   const textColor = Colors[effectiveTheme].text;
//   const shadowColor = Colors[effectiveTheme].shadow;
//   const borderColor = Colors[effectiveTheme].border;
//   const placeholderColor = Colors[effectiveTheme].tabIconDefault;
//   return (
//     <View
//       style={{
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexDirection: 'column',
//       }}
//     >
//       <DefaultTextInput
//         placeholder={placeholder}
//         value={value}
//         onChangeText={onChangeText}
//         placeholderTextColor={placeholderColor}
//         autoCapitalize="none"
//         multiline={true}
//         keyboardType={keyboardType}
//         onBlur={onBlur}
//         onFocus={onFocus}
//         style={[
//           styles.textInput,
//           { backgroundColor, color: textColor, borderColor, shadowColor },
//           style,
//         ]}
//         {...otherProps}
//       />
//       {!isValid && <Text type="error">{errorMessage}</Text>}
//     </View>
//   );
// }
// // export function Text(props: TextProps) {
// //   const { style, lightColor, darkColor, ...otherProps } = props;
// //   const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
// //
// //   return <DefaultText style={[{ color }, style]} {...otherProps} />;
// // }
// // export function View(props: ViewProps) {
// //   const { style, lightColor, darkColor, ...otherProps } = props;
// //   const backgroundColor = useThemeColor(
// //     { light: lightColor, dark: darkColor },
// //     "background",
// //   );
// //
// //   return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
// // }
//
// const styles = StyleSheet.create({
//   buttonPrimary: {
//     // color: Colors.white,
//   },
//   buttonAlt: {
//     // color: Colors.light['500'],
//   },
//   cardTitle: {
//     fontSize: 18,
//     lineHeight: 28,
//     fontWeight: 700,
//     // color: Colors.black,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     lineHeight: 20,
//     fontWeight: 400,
//     // color: Colors.black,
//   },
//   cardBody: {
//     fontSize: 14,
//     lineHeight: 20,
//     fontWeight: 400,
//     // color: Colors.gray,
//   },
//   default: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   semiBold: {
//     fontSize: 16,
//     lineHeight: 24,
//     fontWeight: '600',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     lineHeight: 32,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   link: {
//     lineHeight: 30,
//     fontSize: 16,
//   },
//   error: {
//     fontSize: 14,
//     lineHeight: 21,
//     color: 'red',
//   },
//   miniText: {
//     fontSize: 14,
//     lineHeight: 21,
//   },
//   textInput: {
//     height: 50, // Standard height for elegance and simplicity
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     width: '90%', // Full width for a more expansive feel
//     borderWidth: 2,
//     borderRadius: 15, // Softly rounded corners for a modern, friendly touch
//     marginVertical: 15,
//     // paddingHorizontal: 25, // Generous padding for ease of text entry
//     fontSize: 16, // Comfortable reading size
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4, // Slightly elevated for a subtle 3D effect
//   },
//   xs: {
//     fontSize: 10,
//   },
//   small: {
//     fontSize: 12,
//   },
//   medium: {
//     fontSize: 16,
//   },
//   large: {
//     fontSize: 20,
//   },
//   xlarge: {
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
// });
