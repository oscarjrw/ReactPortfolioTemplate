import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {LangProvider} from './i18n';
import {TourProvider} from './tour/Tour';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Journey from './pages/Journey';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Console from './pages/Console';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <LangProvider>
            <BrowserRouter>
                <TourProvider>
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/journey" element={<Journey/>}/>
                            <Route path="/skills" element={<Skills/>}/>
                            <Route path="/projects" element={<Projects/>}/>
                            <Route path="/projects/:slug" element={<Project/>}/>
                            <Route path="/console" element={<Console/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/portfolio" element={<Navigate to="/projects" replace/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </TourProvider>
            </BrowserRouter>
        </LangProvider>
    );
}
