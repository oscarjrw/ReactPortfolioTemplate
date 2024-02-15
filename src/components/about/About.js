import React, {useEffect, useState} from 'react';
import Style from './About.module.scss';
import Terminal from "./Terminal";
import {Box} from "@mui/material";
import {info} from "../../info/Info";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {LinearProgress} from "@mui/material";
import Typography from '@mui/material/Typography';


export default function About() {
    const firstName = info.firstName.toLowerCase()

    const SkillProgressBar = ({skill, percentage}) => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= percentage) {
                        clearInterval(interval);
                    }
                    return prevProgress + 1;
                });
            }, 20); // Vous pouvez ajuster la vitesse de la barre de progression ici

            return () => {
                clearInterval(interval);
            };
        }, [percentage]);

        return (
            <Box my={2}>
                <Typography variant="subtitle1" gutterBottom>
                    {skill} - {percentage}%
                </Typography>
                <LinearProgress variant="determinate" value={progress}/>
            </Box>
        );
    };

    function aboutMeText() {
        return <>
            <p>
                {info.bio}
            </p>
        </>;
    }

    function skillsText() {
        return <>
            <Box component="section" bgColor="white" py={4}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" mb={2}>
                                Proficient With
                            </Typography>
                            {info.skills.proficientWith.map((skill, index) => (
                                <SkillProgressBar key={index} skill={skill.skill} percentage={skill.percentage}/>
                            ))}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" mb={2}>
                                Exposed To
                            </Typography>
                            {info.skills.exposedTo.map((skill, index) => (
                                <SkillProgressBar key={index} skill={skill.skill} percentage={skill.percentage}/>
                            ))}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>;
    }

    function miscText() {
        return <>
            <Box mt={4}>
                <Grid container spacing={2}>
                    {info.hobbies.map((hobby, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Box
                                display="flex"
                                alignItems="center"
                                p={2}
                                border="1px solid #ccc"
                                borderRadius="8px"
                            >
                                <Box component={'span'} mr={2}>
                                    {hobby.emoji}
                                </Box>
                                <Box flex="1">{hobby.label}</Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>;
    }

    function formationText() {
        return <>
            {info.formation.map((paragraph, index) => (
                <div key={index}>
                    <p>{paragraph.paragraph}</p>
                    <br />
                </div>
            ))}
        </>;
    }

    function projectsText() {
        return <>
            <div>
                <ul>
                    {info.projects.map((project, index) => (
                        <li key={index} style={{ marginBottom: '1.5rem' }}>
                            <div>
                                <strong>{project.title}</strong>
                                <p style={{ margin: '0.5rem 0' }}>{project.description}</p>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#007BFF', textDecoration: 'none' }}
                                >
                                    {project.link}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </>;
    }

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <Terminal text={aboutMeText()} title={'About me'}/>
            <Terminal text={formationText()} title={'Formation'}/>
            <Terminal text={skillsText()} title={'Skills'}/>
            <Terminal text={projectsText()} title={'Some projects'}/>
            <Terminal text={miscText()} title={'Hobbies'}/>
        </Box>
    )
}