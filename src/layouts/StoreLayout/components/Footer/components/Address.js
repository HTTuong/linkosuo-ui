import React from 'react';
import classNames from 'classnames/bind';
import classes from '../Footer.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(classes);

function Address() {
    return (
        <div className={cx('address')}>
            <div className={cx('address__region')}>
                <p className={cx('address__region-info')}>PO Box 77</p>
                <p className={cx('address__region-code-city')}>33101 TAMPERE</p>
                <p className={cx('address__region-country')}>FINLAND</p>
            </div>
            <div className={cx('address__visiting')}>
                <p className={cx('address__visiting-title')}>Visiting address</p>
                <p className={cx('address__visiting-address')}> Mannakorventie 1, 36420 Kangasala</p>
            </div>
            <div className={cx('security')}>
                <p className={cx('security-title')}>Social security number</p>
                <p className={cx('security-number')}>0154374-4</p>
            </div>
            <Button
                className={cx('report')}
                title="Our Oiva report"
                href="https://www.oivahymy.fi/hae-yrityksia/"
                target="_blank"
            />
            <div className={cx('social-network')}>
                <a className={cx('link')} href="https://www.facebook.com/linkosuonkahvilat">
                    <FontAwesomeIcon className={cx('facebook-icon')} icon={faFacebookF} />
                </a>
                <a className={cx('link')} href="https://www.instagram.com/linkosuonkahvilat/">
                    <FontAwesomeIcon className={cx('instagram-icon')} icon={faInstagram} />
                </a>
            </div>
        </div>
    );
}

export default React.memo(Address);
