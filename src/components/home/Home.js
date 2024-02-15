import React, {useState, useEffect} from 'react';
import Style from './Home.module.scss';
import me from '../../img/self.png';
import classNames from 'classnames';
import EmojiBullet from "./EmojiBullet";
import SocialIcon from "./SocialIcon";
import {Box} from "@mui/material";
import {info} from "../../info/Info";

const TypingEffect = ({titles}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const title = titles[currentTitleIndex];
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            setDisplayedText((prevText) => prevText + title[currentIndex]);
            currentIndex++;

            if (currentIndex === title.length) {
                clearInterval(intervalId);
                setTimeout(() => {
                    // Clear the text and move to the next title after a delay
                    setDisplayedText('');
                    setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
                }, 1000);
            }
        }, 100); // Interval between letters (adjust as needed)

        const cursorIntervalId = setInterval(() => {
            setCursorVisible((prevVisible) => !prevVisible);
        }, 400); // Interval for cursor blinking (adjust as needed)

        return () => {
            clearInterval(intervalId);
            clearInterval(cursorIntervalId);
        }
    }, [titles, currentTitleIndex]);

    return (
        <p>
            <span> &nbsp; {displayedText}</span>
            {cursorVisible && ' |'}
        </p>
    );
};

export default function Home() {

    return (
        <Box>
            <Box component={'main'} display={'flex'} flexDirection={{xs: 'column', md: 'row'}} alignItems={'center'}
                 justifyContent={'center'} minHeight={'calc(100vh - 175px)'}>
                <Box className={classNames(Style.avatar, Style.shadowed)} alt={'image of developer'}
                     style={{background: info.gradient}} component={'img'} src={me} width={{xs: '35vh', md: '40vh'}}
                     height={{xs: '35vh', md: '40vh'}}
                     borderRadius={'50%'} p={'0.75rem'} mb={{xs: '1rem', sm: 0}} mr={{xs: 0, md: '2rem'}}/>
                <Box>
                    <h1 style={{fontSize: '2.5rem'}}>Hi, I'm <span>{info.firstName + ' ' + info.lastName + '.'}</span>
                    </h1>
                    <h3 style={{ fontSize : '2em', marginTop: '1em', marginBottom: '1em'}}><TypingEffect titles={info.position}/></h3>
                    <Box component={'ul'} p={'0.8rem'}>
                        {info.miniBio.map((bio, index) => (
                            <EmojiBullet key={index} emoji={bio.emoji} text={bio.text}/>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box display={'flex'} gap={'1rem'} justifyContent={'center'} fontSize={{xs: '1rem', md: '2rem'}}>
                {info.socials.map((social, index) => (
                    <SocialIcon key={index} link={social.link} icon={social.icon} label={social.label}/>
                ))}
            </Box>
        </Box>
    )
}