import spotlogo from "../assets/images/spotify_logo.svg"
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextWithHover from "../components/shared/TextWithHover";
import {Howl, Howler} from 'howler';
import { Children, useState } from "react";

const LoggedInContainer=({children})=>{
    const [soundPlayed, setsoundPlayed]=useState(null);
    const [isPaused, setisPaused]=useState(true);
    const playSound = (songSrc) =>{
        if(soundPlayed){
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true
          });
          setsoundPlayed(sound);
          sound.play();   
    };
    const pauseSound = () =>{
        soundPlayed.pause();
    }
    const togglePlayPause = ()=>{
        if(isPaused){
            playSound(
                "https://res.cloudinary.com/dxgw5fcod/video/upload/v1720526069/gny9of9fxgdkq2fo7253.mp4"
            );
            setisPaused(false);
        }
        else{
            pauseSound();
            setisPaused(true);
        }
    }
    return (
        
        <div className="w-full h-full bg-app-black">
            <div className="h-9/10 w-full flex">
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                    <div>
                        <div className="spotlogo p-6">
                            <img src={spotlogo} alt="spotify logo" width={125}/>
                        </div>
                        <div className="py-5">
                                <IconText
                                    iconName={"material-symbols:home"}
                                    displayText={"Home"}
                                    active
                                />
                                <IconText
                                    iconName={"material-symbols:search-rounded"}
                                    displayText={"Search"}
                                />
                                <IconText
                                    iconName={"marketeq:add-playlist-2"}
                                    displayText={"Library"}
                                />
                        </div>
                        <div className="pt-5">
                                <IconText
                                    iconName={"ph:plus-fill"}
                                    displayText={"Create Playlist"}
                                />
                                <IconText
                                    iconName={"fluent-emoji:heart-decoration"}
                                    displayText={"Liked Songs"}
                                />
                                <IconText
                                    iconName={"marketeq:microphone-music-2"}
                                    displayText={"My Music"}
                                />
                                
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="carbon:earth-europe-africa" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div>
                        </div>
                    </div>
                </div>    
                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                                <TextWithHover displayText={"Upload Song"} />
                                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                    MK 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            <div className="h-1/10 w-full bg-black bg-opacity-30 text-white flex items-center px-4">
                <div className="w-1/4 flex items-center ">
                    <img 
                    src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                    className="h-14 w-14"
                    />
                    <div className="pl-4">
                        <div className="text-sm hover:underline cursor-pointer"> Curtains</div>
                        <div className="text-xs text-gray-500 hover:underline cursor-pointer">Ed Sheeran</div>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center h-full flex-col items-center">
                    <div className="flex w-1/3 justify-between items-center">
                            {/* controls for the playing song go here */}
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                // icon="ic:baseline-play-circle"
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                                // onClick={()=>{
                                //     playSound(
                                //         "https://res.cloudinary.com/dxgw5fcod/video/upload/v1720526069/gny9of9fxgdkq2fo7253.mp4"
                                //     );
                                // }}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                </div>
                <div className="w-1/4 flex justify-end">hi</div>
            </div>
        </div>
    )
};

export default LoggedInContainer;
