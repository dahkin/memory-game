import { ResultModal } from '../ResultModal/ResultModal';
import { Card } from '../Card/Card';
import React, { useEffect } from 'react';
import { maxSteps, cardsImages } from '../../utils';
import './App.scss';

export const App = () => {
    const [imagesArray, setImagesArray] = React.useState<string[]>([]);
    const [cardItems, setCardItems] = React.useState<
        { id: number; name: string; isActive: boolean; isRemoved: boolean }[]
    >([]);
    const [counter, setCounter] = React.useState<number>(0);
    const [activeCards, setActiveCards] = React.useState<string[]>([]);
    const [successCounter, setSuccessCounter] = React.useState<number>(0);

    const doubleImages = cardsImages.reduce(function (res, current) {
        return res.concat([current, current]);
    }, []);

    // Shuffle function
    const shuffle = (array: string[]): string[] => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    // Shuffle initially
    useEffect(() => {
        setImagesArray(shuffle(doubleImages));
    }, []);

    // Generate new array with cards
    useEffect(() => {
        setCardItems(() =>
            imagesArray.map((item, index) => ({
                id: index,
                name: item,
                isActive: false,
                isRemoved: false
            }))
        );
    }, [imagesArray]);

    const handleClick = (index: number) => {
        if (activeCards.length < 2 && counter < maxSteps) {
            // Open card
            if (!cardItems[index].isActive) {
                setCardItems((prevItems) =>
                    prevItems.map((obj, i) => (i === index ? {...obj, isActive: true} : obj))
                );
                setActiveCards((activeCards) => [...activeCards, cardItems[index].name]);
            }
        }
    };

    useEffect(() => {
            // Check two opened cards
            if (activeCards.length === 2) {
                // Increase counter
                setCounter((counter) => counter + 1);
                // If they are equal - remove, else - close
                if (activeCards[0] === activeCards[1]) {
                    setTimeout(() => {
                        setCardItems((prevItems) =>
                            prevItems.map((obj) =>
                                obj.isActive === true ? { ...obj, isRemoved: true } : obj
                            )
                        )
                    }, 800);
                    // Increase success counter
                    setSuccessCounter(successCounter + 2);
                } else {
                    setTimeout(() => {
                        setCardItems((prevItems) =>
                            prevItems.map((obj) => ({ ...obj, isActive: false }))
                        )
                    }, 800);
                }
                setTimeout(() => {
                    // Clean opened cards
                    setActiveCards([]);
                }, 800);
            }

    }, [activeCards]);

    const startAgain = () => {
        // Reshuffle cards
        setImagesArray(shuffle(doubleImages));
        // Clean all counters
        setCounter(0);
        setActiveCards([]);
        setSuccessCounter(0);
    };

    return (
        <React.Fragment>
            <section className="page-wrap">
                <h1 className="title">Memory</h1>
                <main className="main">
                    <div className="sidebar">
                        <div className="status">
                            Сделано ходов
                            <span className="status__number">{counter}</span>
                        </div>
                    </div>
                    <div className="content">
                        <div className="cards">
                            <div className="cards__wrap">
                                {cardItems &&
                                    cardItems.map((item, index) => {
                                        return (
                                            <Card
                                                key={item.id}
                                                name={item.name}
                                                isActive={item.isActive}
                                                isRemoved={item.isRemoved}
                                                onCardClick={() => handleClick(index)}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <div className="sidebar">
                        <div className="status">
                            Осталось попыток
                            <span className="status__number">{maxSteps - counter}</span>
                        </div>
                    </div>
                </main>

                {/* Show success modal or failure modal */}
                {successCounter === cardItems.length ? (
                    <ResultModal success={true} counter={counter} onBtnClick={startAgain} />
                ) : counter >= maxSteps && <ResultModal success={false} onBtnClick={startAgain} />}
            </section>
        </React.Fragment>
    );
};
