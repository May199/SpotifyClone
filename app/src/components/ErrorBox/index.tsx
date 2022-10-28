import './index.css';

const ErrorBox: React.FC = (props) => {
  return (
    <span {...props} id="ErrorBox">
      {props.children}
    </span>
  );
};

export default ErrorBox;
