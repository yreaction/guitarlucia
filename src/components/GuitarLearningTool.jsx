import React, { useState } from 'react';
import './GuitarLearningTool.css';

const GuitarLearningTool = () => {
  // Canciones disponibles con sus acordes y sus progresiones
  const songs = [
    {
      id: 1,
      title: "Have You Ever Seen The Rain",
      artist: "Creedence Clearwater Revival",
      difficulty: "Principiante",
      chordProgression: ["Am", "F", "C", "G", "C", "G", "C"]
    },
    {
      id: 2,
      title: "Valerie",
      artist: "Amy Winehouse",
      difficulty: "Principiante",
      chordProgression: ["E", "A", "Bm", "D", "A", "E"]
    },
    {
      id: 3,
      title: "Back to Black",
      artist: "Amy Winehouse",
      difficulty: "Intermedio",
      chordProgression: ["Dm", "Gm", "Bb", "A", "Dm"]
    },
    {
      id: 4,
      title: "Malagueña",
      artist: "Tradicional Española",
      difficulty: "Principiante",
      chordProgression: ["Em", "B7", "Em", "Am", "Em", "B7", "Em"]
    }
  ];

  // Definición de acordes con posiciones de dedos
  const chords = {
    "C": [
      { string: 5, fret: 3 },
      { string: 4, fret: 2 },
      { string: 2, fret: 1 },
    ],
    "G": [
      { string: 6, fret: 3 },
      { string: 5, fret: 2 },
      { string: 1, fret: 3 },
    ],
    "D": [
      { string: 4, fret: 0 },
      { string: 3, fret: 2 },
      { string: 2, fret: 3 },
      { string: 1, fret: 2 },
    ],
    "Am": [
      { string: 5, fret: 0 },
      { string: 4, fret: 2 },
      { string: 3, fret: 2 },
      { string: 2, fret: 1 },
    ],
    "E": [
      { string: 6, fret: 0 },
      { string: 5, fret: 2 },
      { string: 4, fret: 2 },
      { string: 3, fret: 1 },
      { string: 2, fret: 0 },
      { string: 1, fret: 0 },
    ],
    "A": [
      { string: 5, fret: 0 },
      { string: 4, fret: 2 },
      { string: 3, fret: 2 },
      { string: 2, fret: 2 },
    ],
    "Bm": [
      { string: 5, fret: 2 },
      { string: 4, fret: 4 },
      { string: 3, fret: 4 },
      { string: 2, fret: 3 },
      { string: 1, fret: 2 },
    ],
    "F": [
      { string: 6, fret: 1 },
      { string: 5, fret: 3 },
      { string: 4, fret: 3 },
      { string: 3, fret: 2 },
      { string: 2, fret: 1 },
      { string: 1, fret: 1 },
    ],
    "Dm": [
      { string: 4, fret: 0 },
      { string: 3, fret: 2 },
      { string: 2, fret: 3 },
      { string: 1, fret: 1 },
    ],
    "Gm": [
      { string: 6, fret: 3 },
      { string: 5, fret: 5 },
      { string: 4, fret: 5 },
      { string: 3, fret: 3 },
      { string: 2, fret: 3 },
      { string: 1, fret: 3 },
    ],
    "Bb": [
      { string: 6, fret: 1 },
      { string: 5, fret: 3 },
      { string: 4, fret: 3 },
      { string: 3, fret: 3 },
      { string: 2, fret: 3 },
      { string: 1, fret: 1 },
    ],
    "B7": [
      { string: 5, fret: 2 },
      { string: 4, fret: 1 },
      { string: 3, fret: 2 },
      { string: 2, fret: 0 },
      { string: 1, fret: 2 },
    ],
    "Em": [
      { string: 6, fret: 0 },
      { string: 5, fret: 2 },
      { string: 4, fret: 2 },
      { string: 3, fret: 0 },
      { string: 2, fret: 0 },
      { string: 1, fret: 0 },
    ],
  };

  const [selectedSong, setSelectedSong] = useState(null);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentChord, setCurrentChord] = useState(null);

  // Seleccionar canción
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentChordIndex(0);
    setCurrentChord(song.chordProgression[0]);
  };

  // Ir al acorde siguiente
  const handleNextChord = () => {
    if (selectedSong && currentChordIndex < selectedSong.chordProgression.length - 1) {
      const nextIndex = currentChordIndex + 1;
      setCurrentChordIndex(nextIndex);
      setCurrentChord(selectedSong.chordProgression[nextIndex]);
    }
  };

  // Ir al acorde anterior
  const handlePrevChord = () => {
    if (selectedSong && currentChordIndex > 0) {
      const prevIndex = currentChordIndex - 1;
      setCurrentChordIndex(prevIndex);
      setCurrentChord(selectedSong.chordProgression[prevIndex]);
    }
  };

  // Generar el diapasón de la guitarra
  const renderFretboard = () => {
    const strings = 6;
    const frets = 5;
    const fretboard = [];

    for (let s = 1; s <= strings; s++) {
      const stringLine = [];
      for (let f = 0; f <= frets; f++) {
        let hasFinger = false;
        let position = null;

        if (currentChord && chords[currentChord]) {
          const finger = chords[currentChord].find(
            dot => dot.string === s && dot.fret === f
          );
          if (finger) {
            hasFinger = true;
            position = finger;
          }
        }

        stringLine.push(
          <div 
            key={`fret-${s}-${f}`} 
            className={`fret ${f === 0 ? 'nut' : ''}`}
          >
            {hasFinger && (
              <div className="finger-dot">
                •
              </div>
            )}
          </div>
        );
      }
      fretboard.push(
        <div key={`string-${s}`} className="string">
          {stringLine}
        </div>
      );
    }

    return (
      <div className="fretboard">
        {fretboard}
      </div>
    );
  };

  return (
    <div className="guitar-app">
      <h1 className="app-title">Aprende Guitarra Española</h1>
      
      {/* Selector de canciones */}
      <div className="song-selector">
        <h2 className="section-title">Selecciona una canción:</h2>
        <div className="song-grid">
          {songs.map(song => (
            <button
              key={song.id}
              onClick={() => handleSongSelect(song)}
              className={`song-button ${selectedSong?.id === song.id ? 'selected' : ''}`}
            >
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
              <div className="song-difficulty">{song.difficulty}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedSong && (
        <div className="song-display">
          <div className="song-header">
            <h2 className="song-display-title">{selectedSong.title}</h2>
            <p className="song-display-artist">{selectedSong.artist}</p>
          </div>

          {/* Información del acorde actual */}
          <div className="chord-info">
            <div className="chord-name">{currentChord}</div>
            <div className="chord-position">
              Acorde {currentChordIndex + 1} de {selectedSong.chordProgression.length}
            </div>
          </div>

          {/* Diapasón de la guitarra */}
          {renderFretboard()}

          {/* Controles de navegación */}
          <div className="navigation-controls">
            <button
              onClick={handlePrevChord}
              disabled={currentChordIndex === 0}
              className={`nav-button ${currentChordIndex === 0 ? 'disabled' : ''}`}
            >
              ← Anterior
            </button>
            <button
              onClick={handleNextChord}
              disabled={currentChordIndex === selectedSong.chordProgression.length - 1}
              className={`nav-button ${currentChordIndex === selectedSong.chordProgression.length - 1 ? 'disabled' : ''}`}
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {!selectedSong && (
        <div className="select-prompt">
          Por favor, selecciona una canción para empezar a practicar
        </div>
      )}

      <div className="app-footer">
        <p>Herramienta de aprendizaje para guitarra española</p>
        <p>Selecciona una canción y practica los acordes</p>
      </div>
    </div>
  );
};

export default GuitarLearningTool;