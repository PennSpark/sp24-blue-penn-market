import React from 'react';
import './VideoTutorial.css';
//import Navbar from '../NavBar';
import Header from '../Header';

const VideoTutorial = () => {
    return (
        <div className="video-tutorial">
            <Header />
            <div className="title-container">
                <h2>User Information</h2>
            </div>
            <div className="content-box">
                <p>Need help with navigating the platform?</p>
                <p>Watch our tutorial video below!</p>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/rdVcT09dEf8?si=LLjQ0l5nyPsle05L&amp;start=6"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    );
};

export default VideoTutorial;
