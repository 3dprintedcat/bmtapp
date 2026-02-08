// src/ParticleEffect.js

import React, { useEffect } from 'react';
import './ParticleEffect.css';

const ParticleEffect = () => {
    useEffect(() => {
        const particleContainer = document.getElementById('particle-container');

        // Create static stars that twinkle
        const createStar = () => {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = star.style.height = `${Math.random() * 3 + 1}px`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            
            particleContainer.appendChild(star);
        };

        // Create floating nebula particles
        const createNebula = () => {
            const nebula = document.createElement('div');
            nebula.classList.add('nebula');
            const size = Math.random() * 150 + 50;
            nebula.style.width = nebula.style.height = `${size}px`;
            nebula.style.top = `${Math.random() * 100}%`;
            nebula.style.left = `${Math.random() * 100}%`;
            nebula.style.animationDuration = `${Math.random() * 20 + 15}s`;
            nebula.style.opacity = Math.random() * 0.3 + 0.1;
            
            particleContainer.appendChild(nebula);
        };

        // Create distant ships/objects
        const createDistantObject = () => {
            const obj = document.createElement('div');
            obj.classList.add('distant-object');
            obj.style.width = `${Math.random() * 4 + 2}px`;
            obj.style.height = `${Math.random() * 2 + 1}px`;
            obj.style.top = `${Math.random() * 100}%`;
            obj.style.left = '-10px';
            obj.style.animationDuration = `${Math.random() * 15 + 10}s`;
            
            particleContainer.appendChild(obj);
            
            setTimeout(() => {
                obj.remove();
            }, 30000);
        };

        // Generate static stars (reduced from 150 to 80)
        for (let i = 0; i < 80; i++) {
            createStar();
        }

        // Generate nebula clouds (reduced from 5 to 3)
        for (let i = 0; i < 3; i++) {
            createNebula();
        }

        // Occasional distant objects
        const distantObjectInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                createDistantObject();
            }
        }, 8000);

        return () => {
            clearInterval(distantObjectInterval);
        };
    }, []);

    return <div id="particle-container"></div>;
};

export default ParticleEffect;
