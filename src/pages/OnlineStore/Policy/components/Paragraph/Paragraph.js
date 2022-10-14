import classNames from 'classnames/bind';
import classes from './Paragraph.module.scss';

const cx = classNames.bind(classes);

const Paragraph = ({ index, title, paragraph, sub_paragraph, list }) => {
    return (
        <div className={cx('wrapper')}>
            <h5 className={cx('title')}>
                {index}. {title}
            </h5>
            <span className={cx('paragraph')}>{paragraph}</span>
            {list && (
                <ul className={cx('list')}>
                    {list.map((item) => (
                        <li key={Math.random()} className={cx('list-item')}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
            {sub_paragraph && (
                <ul className={cx('sub-paragraph')}>
                    {sub_paragraph.map((item) => (
                        <li key={Math.random()} className={cx('sub-paragraph-item')}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Paragraph;
