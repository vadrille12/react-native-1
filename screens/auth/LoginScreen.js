import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";

SplashScreen.preventAutoHideAsync();

const INITIAL_STATE = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [state, setState] = useState(INITIAL_STATE);

  const dispatch = useDispatch();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const hideKeyboard = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    dispatch(login(state));
    hideKeyboard();
    setState(INITIAL_STATE);
  };

  const passwordShowToggler = () => {
    setIsPasswordShown((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.imageBg}
          source={require("../../assets/images/background-img.jpg")}
        >
          <View style={styles.registrationWrapper}>
            <Text style={styles.title}>Войти</Text>
            <View
              style={{
                ...styles.form,
                marginBottom: isKeyboardShown ? 20 : 62,
              }}
            >
              <TextInput
                style={styles.input}
                value={state.email}
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                onFocus={() => setIsKeyboardShown(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.input}
                  value={state.password}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isPasswordShown}
                  onFocus={() => setIsKeyboardShown(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <Text
                  style={styles.showPasswordTxt}
                  onPress={passwordShowToggler}
                >
                  {isPasswordShown ? "Показать" : "Скрыть"}
                </Text>
              </View>
              {!isKeyboardShown && (
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.77}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTxt}>Войти</Text>
                </TouchableOpacity>
              )}
              {!isKeyboardShown && (
                <Text
                  onPress={() => navigation.navigate("Registration")}
                  style={styles.infoTxt}
                >
                  Нет аккаунта? Зарегистрироваться
                </Text>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  registrationWrapper: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  form: {
    gap: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 33,
    lineHeight: 35,
    letterSpacing: 0.1,
    fontFamily: "Roboto-Medium",
  },
  passwordWrapper: {
    position: "relative",
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  showPasswordTxt: {
    fontFamily: "Roboto-Regular",
    position: "absolute",
    top: 16,
    right: 16,
    marginHorizontal: 16,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    marginTop: 27,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTxt: {
    fontFamily: "Roboto-Regular",
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
  },
  infoTxt: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
