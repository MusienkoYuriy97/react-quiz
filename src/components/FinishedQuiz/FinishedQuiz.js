import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button/Button';
import classes from './FinishedQuiz.css';

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ];

                    return (
                        <li
                            key={index}
                        >
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>
            <div>
                <Button
                    onClick={props.onRetry}
                    type="primary"
                >Повторить
                </Button>
                <Link to="/">
                    <Button type="success">Вернуться в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz;