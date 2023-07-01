1. react native는 웹사이트가 아니여서, div 등 html의 태그를 사용할 수 없고, 대신에 'react-native'에서 제공하는 View를 사용해야 한다.
2. css의 경우도 일부 제한된다. ex. border:'1px black dashed'
3. StyleSheet는
4. react-native에서 제공하는 api나 컴포넌트로 충분하지 않은 경우 https://reactnative.directory/?search=storage 사용
5. expo docs도 참고 https://docs.expo.dev/versions/latest/?redirected
   [ component ]

- ScroolView
- : 사용자 위치 정보를 가져와 줌

6. 날씨 정보 가져오는 api: https://openweathermap.org/api
7. env 파일 사용

- yarn add react-native-dotenv
- -D @types/react-native-dotenv
- babel.config에 아래의 내용을 추가하여 준다.

```
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
```

- typescript의 경우 환경변수에 대한 타입도 지정하여 주어야 한다.
  // https://yong-nyong.tistory.com/46
- babel.config.json에 설정해준 내용을 tsconfig.json에서도 이용 가능하게? 설정해준다.
- babel.config.json, tsconfig.json 파일 참고, 또한 tsconfig.json 파일에 타입 관련 설정을 추가하여 준다. types 폴더 추가 후, types폴더 하위에 env.d.ts 파일 추가 후 아래와 같은 내용 추해줌

```
declare module "@env" {
  export const WEATHER_API_KEY: string;
}

```

tsconfig.json 파일에는 typs 경로를 찾는 파일의 위치를 알려주는 설정을 추가해줌

```
 "typeRoots": ["./types"]
```

// https://github.com/goatandsheep/react-native-dotenv/issues/52
환경변수 설정 관련 : https://www.daleseo.com/js-dotenv/

8. 아이콘: https://icons.expo.fyi/
