import React, { useState, useEffect, useRef } from 'react';

const DEFAULT_MINUTES = '25';
const DEFAULT_SECONDS = parseInt(DEFAULT_MINUTES, 10) * 60;

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1e', 
    display: 'flex',
    minHeight: '100vh',
    color: '#fff',
    fontFamily: 'sans-serif',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    boxSizing: 'border-box',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  timerContainer: {
    marginBottom: 30,
    padding: 20,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff', 
    fontFamily: 'monospace',
  },
  timerTextWarning: {
    color: '#ff4d4d', 
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 18,
    color: '#aaa',
    marginRight: 10,
  },
  input: {
    border: 'none',
    borderBottom: '2px solid #007aff',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    width: 70,
    textAlign: 'center',
    padding: '5px 0',
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    maxWidth: '400px',
    marginBottom: 40,
  },
  button: {
    padding: '12px 30px',
    borderRadius: 25,
    minWidth: 120,
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
    transition: 'opacity 0.2s',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonStart: {
    backgroundColor: '#34c759', 
  },
  buttonPause: {
    backgroundColor: '#ff9500', 
  },
  buttonReset: {
    backgroundColor: '#5e5ce6', 
  },
  statsContainer: {
    marginTop: 20,
    alignItems: 'center',
    borderTop: '1px solid #3a3a3c',
    paddingTop: 20,
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  statsText: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 10,
  },
  
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#2c2c2e',
    padding: 30,
    borderRadius: 15,
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: '#007aff',
    color: 'white',
    padding: '10px 25px',
    borderRadius: 20,
    border: 'none',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default function App() {
  const [initialMinutes, setInitialMinutes] = useState(DEFAULT_MINUTES);
  
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_SECONDS);
  
  const [isActive, setIsActive] = useState(false);

  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalStudiedMinutes, setTotalStudiedMinutes] = useState(0);
  
  const [showModal, setShowModal] = useState(false);

  const sessionMinutesRef = useRef(parseInt(DEFAULT_MINUTES, 10));

  useEffect(() => {
    let interval = null;

    if (isActive && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive || remainingSeconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds === 0 && isActive) {

      setIsActive(false);

      setCompletedSessions((sessions) => sessions + 1);

      setTotalStudiedMinutes((total) => total + sessionMinutesRef.current);

      setShowModal(true); 
    }
  }, [remainingSeconds, isActive]);

  const handleMinutesChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ''); 
    setInitialMinutes(numericValue);

    if (!isActive) {
      const newSeconds = (parseInt(numericValue, 10) || 0) * 60;
      setRemainingSeconds(newSeconds);
    }
  };

  const handleStartPause = () => {
    if (!isActive) {
      let secondsToStart = remainingSeconds;
      if (secondsToStart === 0) {
         secondsToStart = (parseInt(initialMinutes, 10) || parseInt(DEFAULT_MINUTES, 10)) * 60;
         setRemainingSeconds(secondsToStart);
      }
      sessionMinutesRef.current = Math.floor(secondsToStart / 60);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    const newSeconds = (parseInt(initialMinutes, 10) || parseInt(DEFAULT_MINUTES, 10)) * 60;
    setRemainingSeconds(newSeconds);
    setShowModal(false); 
  };

  const isWarningTime = remainingSeconds < 60 && remainingSeconds > 0;

  const timerTextStyle = {
    ...styles.timerText,
    ...(isWarningTime && styles.timerTextWarning),
  };

  return (
    <div style={styles.safeArea}>
      <div style={styles.container}>
        <h1 style={styles.title}>Temporizador de Estudo</h1>

        {/* Display do Timer */}
        <div style={styles.timerContainer}>
          <span style={timerTextStyle}>{formatTime(remainingSeconds)}</span>
        </div>

        {/* Configuração de Tempo */}
        <div style={styles.inputContainer}>
          <span style={styles.inputLabel}>Minutos:</span>
          <input
            style={styles.input}
            type="text" 
            inputMode="numeric" 
            value={initialMinutes}
            onChange={handleMinutesChange}
            maxLength={3}
            disabled={isActive} 
          />
        </div>

        {/* Controles */}
        <div style={styles.controlsContainer}>
          <button
            onClick={handleStartPause}
            style={{
              ...styles.button,
              ...(isActive ? styles.buttonPause : styles.buttonStart),
            }}
          >
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>
          <button
            onClick={handleReset}
            style={{ ...styles.button, ...styles.buttonReset }}
          >
            Resetar
          </button>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsContainer}>
          <p style={styles.statsText}>
            Sessões Completas: {completedSessions}
          </p>
          <p style={styles.statsText}>
            Tempo Total de Estudo: {totalStudiedMinutes} min
          </p>
        </div>
      </div>

      {/* Modal de Conclusão */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Sessão Concluída!</h2>
            <p style={styles.modalText}>Ótimo trabalho!!!</p>
            <button onClick={handleReset} style={styles.modalButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

