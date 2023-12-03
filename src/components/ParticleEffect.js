// src/ParticleEffect.js

import React, { useEffect } from 'react';
import './ParticleEffect.css';

const ParticleEffect = () => {
    useEffect(() => {
        const particleContainer = document.getElementById('particle-container');

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.width = particle.style.height = `${Math.random() * 10 + 5}px`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
            particle.style.animationName = 'move';

            particleContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 5000); // Remove particle after 5 seconds
        };

        const intervalId = setInterval(createParticle, 100);

        return () => clearInterval(intervalId);
    }, []);

    return <div id="particle-container"></div>;
};

export default ParticleEffect;
