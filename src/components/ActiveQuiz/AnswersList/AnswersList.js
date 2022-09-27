import React from 'react';
import AnswerItem from './AnswerItem';
import classes from './AnswersList.css';

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, index) => {
            return (<AnswerItem key={index} answer={answer} />)
        })}
    </ul>
)

export default AnswersList;
