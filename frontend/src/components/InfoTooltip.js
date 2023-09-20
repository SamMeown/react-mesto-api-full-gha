import MessagePopup from "./MessagePopup";
import message_success_img from "../images/message_success.png"
import message_fail_img from "../images/message_fail.png"

function InfoTooltip({success, onClose, isOpen}) {
  const msgTitle = success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";
  const msgIcon = success ? message_success_img : message_fail_img;
  return (
    <MessagePopup title={msgTitle} icon={msgIcon} onClose={onClose} isOpen={isOpen}/>
  );
}

export default InfoTooltip;