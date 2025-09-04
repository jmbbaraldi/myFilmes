import './ErrorMessage.css';

const ErrorMessage = ({ message = "Ocorreu um erro inesperado." }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Algo deu errado</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;