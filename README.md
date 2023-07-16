# Spooding

![Spooding_thumbnail_wide](https://github.com/jangjia01234/spooding/assets/71865277/13b16902-bee5-47db-b76d-4e6862258e83)

<br/><br/>

## 해당 웹앱의 구조

- _스푸딩(Spooding)_ 은 React와 Recoil을 기반으로 구현한 웹서비스입니다.
- `common.ts`: Recoil 상태(atom)들을 정의한 파일로, 도시 목록, 검색 결과, 검색 입력값, 날씨 정보 등을 관리합니다.
- `Header.tsx`: 검색 기능과 세션 스토리지를 활용하여 검색 결과를 유지하는 헤더 컴포넌트입니다.
- `Home.tsx`: 메인 화면을 담당하는 컴포넌트로, 도시 목록과 날씨 정보를 표시하고 새로고침 시에도 검색 결과를 유지합니다.

<br/>

## 동작 방법 및 설명

### 1. 도시 목록 보기

- 웹 앱이 로드되면 `Home` 컴포넌트를 표시합니다.
- 도시 목록을 가져와서 `cityList` 상태에 저장합니다.
- `CityListComponent`에서 `filteredCityList`를 사용해 도시 목록을 표시합니다.
- 사용자는 도시를 클릭해 해당 도시의 상세 페이지로 이동할 수 있습니다.

### 2. 해당 도시의 날씨 보기

- 사용자가 도시 목록 중 한 가지를 클릭하면 해당 도시의 상세 페이지로 이동합니다.
- 상세 페이지에서는 `weatherInfo` 상태를 사용해 선택된 도시의 날씨 정보를 가져와서 보여줍니다.
- 실시간 날씨 정보는 OpenWeatherMap API를 통해 가져오며, 온도(°C), 습도(%) 등을 포함하고 있습니다.

### 3. 검색 기능 및 새로고침시 유지 기능 구현

- Header에는 검색 기능이 구현되어 있습니다.
- 사용자가 도시명을 입력하면 입력된 도시명과 일치하는 도시를 `cityList`에서 필터링하여 `filteredCityList`에 저장합니다.
- 검색 결과는 실시간으로 표시되며, 검색 결과가 없을 경우 "데이터가 없습니다."라는 메시지가 표시됩니다.
- 검색 결과는 세션 스토리지에 저장되어 새로고침해도 유지됩니다. 새로고침 시에는 세션 스토리지에서 저장된 결과를 가져와서 보여줍니다.

## 코드 스니펫

1. 세션 스토리지에 검색 결과 저장 및 유지

```tsx
// Header.tsx

// 검색 결과 보여주기
const showSearchResult = (e: any) => {
  e.preventDefault();

  if (input) {
    const result = cities.filter((city) => city.name.toLowerCase().includes(input));
    setFilteredCities(result);
    window.sessionStorage.setItem("resultCities", JSON.stringify(result));
  } else console.log("검색 결과가 없습니다.");
};

// useEffect를 통해 새로고침 시 세션 스토리지에서 검색 결과 가져오기
useEffect(() => {
  const searchResultSession = window.sessionStorage.getItem("resultCities");
  const searchResultSessionJSON = JSON.parse(searchResultSession || "[]");

  if (searchResultSessionJSON.length > 0) setFilteredCities(searchResultSessionJSON);
  else setFilteredCities(cities);
}, [cities, setFilteredCities]);
```

<br/>

2. 도시 목록과 날씨 정보 가져오기

```tsx
// Home.tsx

// 도시 목록 가져오기
const getCityList = async () => {
  const res: any = await fetcher("get", `/data/citylist.json`, {});
  if (res.data.length === 0) console.log("no data");
  else setCities(res.data);
};

// 선택된 도시의 날씨 정보 가져오기
const getWeather = async () => {
  try {
    if (randomCity && randomCity.coord) {
      const { lat, lon } = randomCity.coord;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;

      const res: any = await fetcher("get", url, {});
      if (res.data.length === 0) console.log("no data");
      else setWeather(res.data);
    }
  } catch (error) {
    console.error("날씨 정보를 받아오지 못했습니다.", error);
  }
};

useEffect(() => {
  getCityList();
}, []);

useEffect(() => {
  const selectedRandomCity = cities[Math.floor(Math.random() * cities.length)];
  setRandomCity(selectedRandomCity || null);
}, [cities]);

useEffect(() => {
  if (randomCity) {
    getWeather();
  }
}, [randomCity]);
```
