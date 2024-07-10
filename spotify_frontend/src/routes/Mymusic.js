import spotlogo from "../assets/images/spotify_logo.svg"
import { useEffect, useState } from "react";
import {Howl, Howler} from 'howler';
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextWithHover from "../components/shared/TextWithHover";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";
import LoggedInContainer from "../containers/LoggedInContainer";

const Mymusic=()=>{
    
    const [songData, setsongData] = useState([]);
    useEffect(()=>{
                const getData = async()=>{
                const response = await makeAuthenticatedGETRequest(
                    "/song/get/mysongs"
                );
                // console.log( response.data);
                setsongData(response.data);
                };
                getData();
            }, []);
    return(
    <LoggedInContainer>
        <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                         My Songs
                     </div>
                     <div className="space-y-3 overflow-auto">
                         {songData.map((item)=>{
                            return <SingleSongCard 
                            info={item}
                            playSound={() => {}}
                            />
                        })}
                    </div>
    </LoggedInContainer>
    )
}

// const Mymusic=()=>{
//     const [songData, setsongData] = useState([]);
//     const [soundPlayed, setsoundPlayed]=useState(null);
//     const playSound = (songSrc) =>{
//         if(soundPlayed){
//             soundPlayed.stop();
//         }
//         let sound = new Howl({
//             src: [songSrc],
//             html5: true
//           });
//           setsoundPlayed(sound);
//           sound.play();   
//     };

//     useEffect(()=>{
//         const getData = async()=>{
//         const response = await makeAuthenticatedGETRequest(
//             "/song/get/mysongs"
//         );
//         // console.log( response.data);
//         setsongData(response.data);
//         };
//         getData();
//     }, []);

//     return (

//         <div className="w-full h-full flex">
//             <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
//                 <div>
//                     <div className="spotlogo p-6">
//                         <img src={spotlogo} alt="spotify logo" width={125}/>
//                     </div>
//                     <div className="py-5">
//                             <IconText
//                                 iconName={"material-symbols:home"}
//                                 displayText={"Home"}
//                             />
//                             <IconText
//                                 iconName={"material-symbols:search-rounded"}
//                                 displayText={"Search"}
//                             />
//                             <IconText
//                                 iconName={"marketeq:add-playlist-2"}
//                                 displayText={"Library"}
//                             />
//                     </div>
//                     <div className="pt-5">
//                             <IconText
//                                 iconName={"ph:plus-fill"}
//                                 displayText={"Create Playlist"}
//                             />
//                             <IconText
//                                 iconName={"fluent-emoji:heart-decoration"}
//                                 displayText={"Liked Songs"}
//                             />
//                             <IconText
//                                 iconName={"marketeq:microphone-music-2"}
//                                 displayText={"My Music"}
//                                 active

//                             />
                            
//                     </div>
//                 </div>
//                 <div className="px-5">
//                     <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
//                         <Icon icon="carbon:earth-europe-africa" />
//                         <div className="ml-2 text-sm font-semibold">
//                             English
//                         </div>
//                     </div>
//                 </div>
//             </div>    
//             <div className="h-full w-4/5 bg-app-black overflow-auto">
//                 <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
//                     <div className="w-1/2 flex h-full">
//                         <div className="w-2/3 flex justify-around items-center">
//                             <TextWithHover displayText={"Premium"} />
//                             <TextWithHover displayText={"Support"} />
//                             <TextWithHover displayText={"Download"} />
//                             <div className="h-1/2 border-r border-white"></div>
//                         </div>
//                         <div className="w-1/3 flex justify-around h-full items-center">
//                             <TextWithHover displayText={"Upload Song"} />
//                             <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
//                                 MK 
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="content p-8 overflow-auto">
//                     <div className="text-white text-xl font-semibold pb-4 pl-2 ">
//                         My Songs
//                     </div>
//                     <div className="space-y-3 overflow-auto">
//                         {songData.map((item)=>{
//                             return <SingleSongCard 
//                             info={item}
//                             playSound={playSound}
//                             />
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

export default Mymusic;