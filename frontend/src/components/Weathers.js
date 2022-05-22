import {useContext} from "react";
import {UserContext} from "../userContext";
import {useState} from "react";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {Avatar, Box, Container, Divider, Heading, StackDivider, Text, VStack} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Image } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Td,
    Tr,
    Th,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
  import { Link, useNavigate } from "react-router-dom";
  import { Button, ButtonGroup } from '@chakra-ui/react';
  import { MdBuild , MdCall, MdAddTask } from "react-icons/md";
  import { useLocation } from 'react-router-dom'



function Weathers(props) {
    const { id } = useParams();
    const location=id;
    const userContext = useContext(UserContext);
    const [locationKey, setLocationKey] = useState({});
    const [weatherForecast, setLocationForcast] = useState({});
   // const APIkey="a5lVWxybatxzps6ortFMGbKXdll7NF7z";
   // const APIkey= "tXaerq2s1UMKbchoascV5uiatYAmzVbu";
   // const APIkey= "sBnAl5ErUrgmbqZJLCywh8GDYnZ2VmBR";
   const APIkey= "xejIme8G5hBjzZZgpAKS7TGvVVGWFe5I";
   
    useEffect( function(){

        const getLocationKey = async function(){

            const res = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey="+APIkey+"&q="+location);
            const data = await res.json();
            console.log(data[0]);
            setLocationKey(data[0]);
        
        }

        const getLocationWeatherForcast = async function(){
         Promise.allSettled([getLocationKey()]);
            const res = await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/"+locationKey.Key+"?apikey="+APIkey+"&language=sl&metric=true");
            const data = await res.json();
            console.log(data);
            setLocationForcast(data)
           
        
        }
        getLocationWeatherForcast();
       
    }, []);

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

 if(!isEmpty(weatherForecast)){
    
    let srcurl0=weatherForecast.DailyForecasts[0].Day.Icon;
    let srcurl1=weatherForecast.DailyForecasts[1].Day.Icon;
    let srcurl2=weatherForecast.DailyForecasts[2].Day.Icon;
    let srcurl3=weatherForecast.DailyForecasts[3].Day.Icon;
    let srcurl4=weatherForecast.DailyForecasts[4].Day.Icon;
     
    if(weatherForecast.DailyForecasts[0].Day.Icon<10){
        srcurl0="0"+weatherForecast.DailyForecasts[0].Day.Icon;
  
    }
    if(weatherForecast.DailyForecasts[1].Day.Icon<10){
        srcurl1="0"+weatherForecast.DailyForecasts[1].Day.Icon;
    
    }
    if(weatherForecast.DailyForecasts[2].Day.Icon<10){
        srcurl2="0"+weatherForecast.DailyForecasts[2].Day.Icon;
       
    }
    if(weatherForecast.DailyForecasts[3].Day.Icon<10){
        srcurl3="0"+weatherForecast.DailyForecasts[3].Day.Icon;
      
    }
    if(weatherForecast.DailyForecasts[4].Day.Icon<10){
        srcurl4="0"+weatherForecast.DailyForecasts[4].Day.Icon;
     
    }
     

    return (
        <><>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
          
        </>
          
        <TableContainer>
       
        <Table variant='simple' size="lg">
                    <TableCaption>Napoved vremena za naslednih 5 dni</TableCaption>
                    <Thead>
                        <Tr >
                            <Th>Vreme</Th>
                            <Th>Opis</Th>
                            <Th>Temperatura</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    <Tr>
                        <Td><Image  src={"https://developer.accuweather.com/sites/default/files/"+srcurl0+"-s.png"}/></Td> 
                        <Td>{weatherForecast.DailyForecasts[0].Day.IconPhrase}</Td> 
                        <Td>{weatherForecast.DailyForecasts[0].Temperature.Minimum.Value}-{weatherForecast.DailyForecasts[0].Temperature.Maximum.Value}</Td>  
                  </Tr>
                  <Tr>
                        <Td><Image  src={"https://developer.accuweather.com/sites/default/files/"+ srcurl1+"-s.png"}/></Td> 
                        <Td>{weatherForecast.DailyForecasts[1].Day.IconPhrase}</Td> 
                        <Td>{weatherForecast.DailyForecasts[1].Temperature.Minimum.Value}-{weatherForecast.DailyForecasts[1].Temperature.Maximum.Value}</Td>  
                  </Tr>
                  <Tr>
                        <Td><Image  src={"https://developer.accuweather.com/sites/default/files/"+srcurl2+"-s.png"}/></Td> 
                        <Td>{weatherForecast.DailyForecasts[2].Day.IconPhrase}</Td> 
                        <Td>{weatherForecast.DailyForecasts[2].Temperature.Minimum.Value}-{weatherForecast.DailyForecasts[2].Temperature.Maximum.Value}</Td>  
                  </Tr>
                  <Tr>
                        <Td><Image  src={"https://developer.accuweather.com/sites/default/files/"+ srcurl3+"-s.png"}/></Td> 
                        <Td>{weatherForecast.DailyForecasts[3].Day.IconPhrase}</Td> 
                        <Td>{weatherForecast.DailyForecasts[3].Temperature.Minimum.Value}-{weatherForecast.DailyForecasts[3].Temperature.Maximum.Value}</Td>  
                  </Tr>
                  <Tr>
                        <Td><Image  src={"https://developer.accuweather.com/sites/default/files/"+ srcurl4+"-s.png"}/></Td> 
                        <Td>{weatherForecast.DailyForecasts[4].Day.IconPhrase}</Td> 
                        <Td>{weatherForecast.DailyForecasts[4].Temperature.Minimum.Value}-{weatherForecast.DailyForecasts[4].Temperature.Maximum.Value}</Td>  
                  </Tr>
                    </Tbody>
                   
                </Table>
            </TableContainer></>
        
    )
}else{
    return (
        <>
        <Box p={12}>
              <Link to={`/`}><Button  colorScheme='red'>Neveljavno mesto! pojdi nazaj</Button></Link>
           </Box>
</>
         )
}
}

export default Weathers;