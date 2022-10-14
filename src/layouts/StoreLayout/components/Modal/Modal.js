import classNames from 'classnames/bind';
import classes from './Modal.module.scss';
import Button from '~/components/Button';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '~/store/context';
import config from '~/config';

const cx = classNames.bind(classes);

const Modal = ({ message, closeMessage }) => {
    const messages = message.split('. ');
    const ctx = useContext(CartContext);
    const navigate = useNavigate();

    const handleCloseMessage = () => {
        navigate(config.routes.store.home);
        ctx.handleClearProduct();
        const bodyElement = document.querySelector('body');
        bodyElement.classList.remove('disable-scrollbar');
        closeMessage('');
        window.location.reload();
    };

    return (
        <div className={cx('backdrop')}>
            <div className={cx('modal-container')}>
                <div className={cx('modal-content')}>
                    <h3 className={cx('modal-title')}>{messages[0]}</h3>
                    <p className={cx('modal-subtitle')}>{messages[1]}</p>
                    <Button className={cx('modal-btn')} title="Ok" onClick={handleCloseMessage} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
