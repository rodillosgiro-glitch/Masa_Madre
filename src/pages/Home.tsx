import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import './Home.css';

const MasaMadre3D = lazy(() => import('../components/MasaMadre3D'));

// Importar videos
const videoMasa = '/videos/comohacerMasa.mp4';
const videoPan = '/videos/comoHacerPan.mp4';

const Home: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [currentTime, setCurrentTime] = useState({ video1: 0, video2: 0 });
  const [duration, setDuration] = useState({ video1: 0, video2: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const videoWrapper1Ref = useRef<HTMLDivElement>(null);
  const videoWrapper2Ref = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const togglePlay = (videoId: string) => {
    const video = videoId === 'video1' ? video1Ref.current : video2Ref.current;
    
    if (!video) return;
    
    if (video.paused) {
      video.play();
      setPlayingVideo(videoId);
      setShowPlayButton(false);
      
      // Iniciar el seguimiento del progreso
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      progressIntervalRef.current = window.setInterval(() => {
        if (video) {
          setCurrentTime(prev => ({
            ...prev,
            [videoId]: video.currentTime
          }));
        }
      }, 1000);
      
    } else {
      video.pause();
      setPlayingVideo(null);
      setShowPlayButton(true);
      
      // Limpiar el intervalo cuando se pausa
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  };

  const handleVideoClick = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    togglePlay(videoId);
  };

  const handleVideoEnd = () => {
    setPlayingVideo(null);
    setShowPlayButton(true);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const toggleFullscreen = (videoId: string) => {
    const videoWrapper = videoId === 'video1' ? videoWrapper1Ref.current : videoWrapper2Ref.current;
    if (!videoWrapper) return;

    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen().catch(err => {
        console.error(`Error al intentar entrar en pantalla completa: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleTimeUpdate = (videoId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    setCurrentTime(prev => ({
      ...prev,
      [videoId]: video.currentTime
    }));
  };

  const handleLoadedMetadata = (videoId: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    setDuration(prev => ({
      ...prev,
      [videoId]: video.duration
    }));
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>, videoId: string) => {
    const video = videoId === 'video1' ? video1Ref.current : video2Ref.current;
    const progressBar = e.currentTarget;
    if (!video || !progressBar) return;
    
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  // Limpiar intervalos al desmontar el componente
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleVideoWrapperHover = () => {
    if (playingVideo) {
      setShowPlayButton(true);
      
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      hoverTimeoutRef.current = setTimeout(() => {
        if (playingVideo) {
          setShowPlayButton(false);
        }
      }, 2000);
    }
  };
  // Función para formatear el tiempo en minutos:segundos
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="home">
      <Navbar />
      <Header />

      {/* Sección 3D interactiva */}
      <section className="masa-3d-section">
        <div className="masa-3d-content">
          <h2 className="masa-3d-title">MIRA CÓMO CRECE</h2>
          <p className="masa-3d-subtitle">Observa la fermentación en vivo — mueve el mouse para explorarla en 3D ✨</p>
        </div>
        <div className="masa-3d-canvas">
          <Suspense fallback={<div className="masa-3d-loading">Cargando...</div>}>
            <MasaMadre3D />
          </Suspense>
        </div>
      </section>

      {/* Aquí se pueden agregar más secciones de la página home */}
      <section className="home-content">
        <div className="container">
          <div className="masa-madre-section">
            <div className="masa-madre-content">
              <div className="title-with-icon">
                <div className="section-title-container">
                  <h2 className="section-title-line1">¿QUÉ ES LA</h2>
                  <h2 className="section-title-line2">MASA MADRE?</h2>
                </div>
              </div>
              <p className="masa-madre-description">
                La masa madre es un fermento compuesto por harina y agua que no contiene ningún tipo de 
                levadura añadida sino que es la propia harina, en la que hay contenidas un sinfín de levaduras 
                y bacterias, la que provoca la fermentación de la masa de manera espontánea.
              </p>
            </div>
            <div className="masa-madre-image-container">
              <img src="/image/masaMadre.jpeg" alt="Masa Madre" className="masa-madre-main-img" />
              
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Cómo hacer masa madre */}
      <section className="como-hacer-section">
        <div className="como-hacer-content">
          {/* Video a la izquierda */}
          <div className="video-container">
            <div 
              ref={videoWrapper1Ref}
              className={`video-wrapper ${playingVideo === 'video1' ? 'playing' : ''} ${isFullscreen ? 'fullscreen' : ''}`}
              onClick={() => togglePlay('video1')}
              onMouseEnter={handleVideoWrapperHover}
              onMouseLeave={() => playingVideo && setShowPlayButton(false)}
            >
              <video 
                ref={video1Ref}
                className="video-player"
                onClick={(e) => handleVideoClick(e, 'video1')}
                onEnded={handleVideoEnd}
                onTimeUpdate={(e) => handleTimeUpdate('video1', e)}
                onLoadedMetadata={(e) => handleLoadedMetadata('video1', e)}
              >
                <source src={videoMasa} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
              <div className="video-controls">
                <div className="progress-bar" onClick={(e) => handleProgressBarClick(e, 'video1')}>
                  <div 
                    className="progress" 
                    style={{ width: `${(currentTime.video1 / (duration.video1 || 1)) * 100}%` }}
                  ></div>
                </div>
                <div className="time-display">
                  {formatTime(currentTime.video1)} / {formatTime(duration.video1)}
                </div>
                <div className="control-buttons">
                  <div 
                    className={`play-pause-btn ${playingVideo === 'video1' && showPlayButton ? 'visible' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay('video1');
                    }}
                  >
                    <div className="play-icon">
                      {playingVideo === 'video1' ? '❚❚' : '▶'}
                    </div>
                  </div>
                  <button 
                    className="fullscreen-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen('video1');
                    }}
                    aria-label="Pantalla completa"
                  >
                    ⛶
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Título y descripción a la derecha */}
          <div className="description-wrapper">
            <div className="title-container">
              <h2 className="como-hacer-title-line1">¿CÓMO HACER</h2>
              <h2 className="como-hacer-title-line2">MASA MADRE?</h2>
            </div>
            
            <div className="description-container">
              <p className="como-hacer-description">
                Hacer una masa madre en casa es muy sencillo
              </p>
              <p className="como-hacer-detalle">
                La masa madre es un fermento natural compuesto por harina y agua que no contiene ningún tipo de levadura añadida. 
                Es un ser vivo que necesita cuidados y atención, pero que te recompensará con un pan con un sabor y textura inigualables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Pan con masa madre */}
      <section className="pan-masa-madre-section">
        <div className="container">
          <div className="pan-masa-madre-content">
            <div className="pan-masa-madre-title-container">
              <h2 className="pan-masa-madre-title-line1">PAN CON</h2>
              <h2 className="pan-masa-madre-title-line2">MASA MADRE</h2>
            </div>
            <p className="pan-masa-madre-description">
              Así se puede hacer un pan con masa madre
            </p>
            <div className="video-container">
              <div 
                ref={videoWrapper2Ref}
                className={`video-wrapper ${playingVideo === 'video2' ? 'playing' : ''} ${isFullscreen ? 'fullscreen' : ''}`}
                onClick={() => togglePlay('video2')}
                onMouseEnter={handleVideoWrapperHover}
                onMouseLeave={() => playingVideo && setShowPlayButton(false)}
              >
                <video 
                  ref={video2Ref}
                  className="video-player"
                  onClick={(e) => handleVideoClick(e, 'video2')}
                  onEnded={handleVideoEnd}
                  onTimeUpdate={(e) => handleTimeUpdate('video2', e)}
                  onLoadedMetadata={(e) => handleLoadedMetadata('video2', e)}
                >
                  <source src={videoPan} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
                <div className="video-controls">
                  <div className="progress-bar" onClick={(e) => handleProgressBarClick(e, 'video2')}>
                    <div 
                      className="progress" 
                      style={{ width: `${(currentTime.video2 / (duration.video2 || 1)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="time-display">
                    {formatTime(currentTime.video2)} / {formatTime(duration.video2)}
                  </div>
                  <div className="control-buttons">
                    <div 
                      className={`play-pause-btn ${playingVideo === 'video2' && showPlayButton ? 'visible' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay('video2');
                      }}
                    >
                      <div className="play-icon">
                        {playingVideo === 'video2' ? '❚❚' : '▶'}
                      </div>
                    </div>
                    <button 
                      className="fullscreen-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFullscreen('video2');
                      }}
                      aria-label="Pantalla completa"
                    >
                      ⛶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
