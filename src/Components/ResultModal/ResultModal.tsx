import React, { FC } from 'react';
import './ResultModal.scss';

interface Props {
    success: boolean;
    counter?: number;
    onBtnClick: () => void;
}

export const ResultModal: FC<Props> = ({ success, counter, onBtnClick }) => {
    const [removed, setRemoved] = React.useState<boolean>(false);

    return (
        <div className={`result-modal${removed ? ' result-modal--removed' : ''}`}>
            <div className="result-modal__header">
                <h2 className="result-modal__title">
                    {success ? 'Ура, вы выиграли!' : 'Увы, вы проиграли'}
                </h2>
                <p className="result-modal__description">
                    {success ? 'Это заняло ' + counter + ' ходов' : 'У вас кончились ходы'}
                </p>
            </div>
            <button
                className="result-modal__button"
                onClick={() => {
                    setRemoved(true);
                    setTimeout(() => {
                        onBtnClick();
                    }, 800);
                }}
            >
                Сыграть еще
            </button>
        </div>
    );
};
