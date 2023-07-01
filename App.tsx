import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { ENV_WEATHER_API_KEY } from "./env";
import { Fontisto } from "@expo/vector-icons";

const icons: { Clouds: "cloudy" } | any = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightening",
};

// 화면 크를 가와 준다.
const { width: SCREEN_WIDTH, height } = Dimensions.get("window");
const API_KEY = ENV_WEATHER_API_KEY;
export default function App() {
  const [city, setCity] = useState<string | null>("");
  const [ok, setOk] = useState<boolean>(true);
  const [errorMsa, setErrorMsg] = useState<string | null>(null);
  const [days, setDays] = useState<Array<any>>([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // foreground ~앱 사용 중에만 위 사용
    if (!granted) {
      setOk(false);
    }
    console.log(ENV_WEATHER_API_KEY, "api0");
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // 주소를 알려준다. 위도와 경도
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    console.log(location[0].city, "test---");
    console.log(location[0], "test22---");
    setCity(
      location[0].district != null
        ? location[0].district
        : `${location[0].region}`
    );
    //location 은 array로 반환하기 때문에, [0]으로 받아 사용한다.
    const response = await fetch(
      `http://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${ENV_WEATHER_API_KEY}&units=metric`
    );
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${ENV_WEATHER_API_KEY}`
    // );r
    //console.log(response, "---");
    const json = await response.json();
    //console.log(json, "--");
    setDays(json.daily);
  };

  React.useEffect(() => {
    getWeather();
    // async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //     return;
    //   }
    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    // };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              {/* <Text style={styles.temp}>27</Text>
              <Text style={styles.description}>Sunny</Text> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="white"
                />
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 100,
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "none",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "blue",
//   },
// });
