import { ButtonContainer } from "./styles";

const Button = ({text, click}) => {
    return <ButtonContainer onClick={click}>{text}</ButtonContainer>
}
 
export default Button;