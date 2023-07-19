import React, { useEffect, useState } from "react";
import image from'./photo.jpg';
import './weatherpage.css'
function WeatherPage(){
   const [search,Setsearch]=useState("Guntur");
   const [winfo,SetInfo]=useState({});
   const [mood,Setmood]=useState("");

  
   const GetWeather=async()=>{
      try{
       let url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=43f22786aa254e4b07b8c0d2f314efe1`;
       const res=await fetch(url);
       const data=await res.json();
       const {temp,humidity,pressure}=data.main;
       const {main:weathermood}=data.weather[0];
       const {name}=data;
       const {speed}=data.wind;
       const {country,sunset}=data.sys;

       const winfo={
        temp,humidity,pressure,weathermood,name,speed,country,sunset
       }
       SetInfo(winfo);
      }
      catch(error){
         console.log(error);
         window.alert("Enter Valid Name");
      }
   }

   const s=winfo.sunset;
   const nt=new Date(s*1000);
   const str=`${nt.getHours()}:${nt.getMinutes()}`
   useEffect(()=>{
    GetWeather();
    },[])
    useEffect(()=>{
        if(winfo.weathermood){
            switch(winfo.weathermood){
                case "Clouds":
                Setmood("wi-day-cloudy");
                break;
                case "Rain":
                Setmood("wi-day-rain");
                break;
                case "Haze":
                Setmood("wi-day-fog");
                break;
                case "Snow":
                Setmood("wi-snow");
                break;
                case "Drizzle":
                Setmood("wi-rain-wind");
                break;

                default:
                Setmood("wi-day-sunny");
                break;
            }
        }
       },[winfo.weathermood])
    return(
        <div >
           <div className="side1">
            <img src={image} alt="" className="img"/>
            <div className="article">
                <div className="con">
                <div className="inpdiv">
            <input type="search" placeholder="EnterCity" className="inp"
                value={search}
                onChange={(e)=>Setsearch(e.target.value)}/>

                 <button type="button" className="btn" onClick={GetWeather}>Search</button>
                </div>
                    <div className="dis">
                      <div className="weathericon">
                        <i className= {`wi ${mood} wic`}></i>
                      </div>
                      <div className="weatherinfo">
                        <div className="Temp">{winfo.temp}&deg;</div>
                      <div className="Desc">
                        <div className="Place">{winfo.name} {winfo.country}</div>
                        <div className="cond">{winfo.weathermood} </div>
                        </div>
                        <div className="Date">
                            {new Date().toLocaleString()}
                        </div>
                      </div>
                      <div className="extra-info">
                        <div className="humidity">
                            <div>humidity <i className={"wi wi-humidity"}></i></div>
                            <div>{winfo.humidity}</div>
                            </div>
                        <div className="pressure">
                            <div>pressure <i className={"wi wi-rain"}></i></div>
                            <div>{winfo.pressure}</div>
                        </div>
                        <div className="wind">
                            <div>wind  <i className={"wi wi-strong-wind"}></i></div>
                            <div>{winfo.speed}m/s</div>
                        </div>
                        <div className="sunset">
                            <div>sunset <i className={"wi wi-sunset"}></i></div>
                            <div>{str}</div>
                        </div>
                      </div>
                      </div>
                </div>
            
                </div>
           </div>
        </div>
    )
}

export {WeatherPage}