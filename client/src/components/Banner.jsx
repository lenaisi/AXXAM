import React from 'react';
import Image from '../assets/immo.jpg';

const Banner = () => {
    return (
        <section className='h-full max-h-[640px] mn-8 xl:mb-2' style={{ marginTop: '-50px' ,marginBottom:'-500px'}}> {/* Appliquer une marge négative */}
          <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-start'> 
          
            <div>
            <img src={Image} alt='' style={{ width: '4000px' }}/> 
            </div>
            <div className="ml-4 lg:ml-10" style={{ marginTop: '10px' }}>
            
              <h1>
              <span></span> <span style={{ fontWeight: 'bold', fontSize: '29px' }}>Votre havre de paix entre tradition et modernité.</span>
              </h1>
              <p style={{ fontSize: '19px' }}>
                
Tizi Ouzou, véritable joyau niché au cœur des montagnes majestueuses du Djurdjura, offre un cadre enchanteur pour l'achat et la location immobilière. Que vous soyez attiré par la tranquillité de ses paysages pittoresques, la richesse de son patrimoine culturel berbère, ou encore la dynamique de sa vie urbaine, Tizi Ouzou offre une qualité de vie incomparable. De charmants appartements aux ruelles animées du centre-ville aux somptueuses villas offrant une vue imprenable sur les montagnes environnantes, le marché immobilier de Tizi Ouzou regorge de possibilités pour répondre à tous les besoins et aspirations.
              </p>
            </div>
          </div>
        </section>
    );
};

export default Banner;
