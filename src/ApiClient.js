//axios handles api operation get set delete on the database
import axios from "axios";

export class ApiClient {
  status(response) {
    //code in this range are typically good responses
    if (response.status >= 200 && response.status < 300) {
      //say it is resovled
      return Promise.resolve(response);
    } else {
      //returns Error object as text i.e 404 Not found
      return Promise.reject(new Error(response.statusText));
    }
  }

  getLocation(cityInput) {
    //get response from api using axios this needed as we are usign objects
    return this.getRequest(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.city},GB&appid=${process.env.REACT_APP_API_KEY}`
      //`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.city},GB&appid=${process.env.REACT_APP_API_KEY2}`
    );
  }

  getSevenDayWeather(location) {
    //not setting a default state before api response you could if you want
    //string interpolation to only display correct "page" ? needed for parameters 20 is default
    return this.getRequest(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      // `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY2}`
    );
  }

  getRequest(url) {
    return axios
      .get(url)
      .then(this.status)
      .catch(function (error) {
        // handle error
        console.error(error);
        // alert(error)
      });
  }
}
