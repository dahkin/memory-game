import React, { FC, useEffect } from 'react';
import './Card.scss';
import logo from '../../images/logo.svg';

interface Props {
    name: string;
    isActive?: boolean;
    isRemoved?: boolean;
    onCardClick: () => void;
}

export const Card: FC<Props> = ({ name, isActive, isRemoved, onCardClick }) => {
    return (
        <div
            className={`card${isActive ? ' card--active' : ''}${isRemoved ? ' card--removed' : ''}`}
        >
            <div
                className="card__wrap"
                onClick={onCardClick}
                onKeyDown={
                    onCardClick
                        ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  onCardClick();
                              }
                          }
                        : undefined
                }
                tabIndex={isRemoved ? -1 : 0}
                role="button"
            >
                <div className="card__front">
                    <img className="card__image" src={logo} alt="Karpov school" />
                </div>
                <div className="card__back">
                    <img src={name} className="card__image" />
                </div>
            </div>
        </div>
    );
};
