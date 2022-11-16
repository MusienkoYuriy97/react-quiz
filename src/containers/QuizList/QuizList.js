import React, { Component } from 'react'
import classes from './QuizList.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/ui/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.props.loading ?
            <Loader /> :
            <ul>
              {this.renderQuizes()}
            </ul>}

        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }),
  (dispatch) => ({
    fetchQuizes: () => dispatch(fetchQuizes())
  }))
  (QuizList)