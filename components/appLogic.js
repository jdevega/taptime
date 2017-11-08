import {
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
  lifecycle,
  setStatic,
  compose
} from 'recompose'
const TimerMixin = require('react-timer-mixin')
const TIME_INTERVAL = 10

const enhancer = compose(
  setStatic('mixins', [TimerMixin]),
  withStateHandlers(
    initialState => ({
      playerOneCounter: 0,
      playerTwoCounter: 0,
      playerOneTap: false,
      playerTwoTap: false,
      time: 0,
      timeId: null,
      status: 'stopped',
      message: null
    }),
    {
      incPlayerCounter: state => player => ({
        ...state,
        [`${player}Counter`]: state[`${player}Counter`] + 1
      }),
      setPlayerTap: state => (player, time) =>
        console.log(player, time) || {
          ...state,
          [`${player}Tap`]: time
        },
      setStatus: state => status => console.log(status) || { ...state, status },
      setTime: state => time => ({ ...state, time }),
      setTimeId: state => timeId => ({ ...state, timeId }),
      setMessage: state => message => ({ ...state, message }),
      setPlayerCounter: state => (player, counter) => ({
        ...state,
        [`${player}Counter`]: counter
      })
    }
  ),
  withHandlers({
    reset: props => () => {
      props.setStatus('stopped')
      props.setTime(0)
      props.setTimeId(null)
      props.setPlayerTap('playerOne', false)
      props.setPlayerTap('playerTwo', false)
    },
    showResult: props => () => {
      props.setStatus('showResult')
    },
    playerOneWin: props => () => {
      props.setMessage('Player One Win !')
      props.incPlayerCounter('playerOne')
    },
    playerTwoWin: props => () => {
      props.setMessage('Player Two Win !')
      props.incPlayerCounter('playerTwo')
    }
  }),
  withHandlers({
    checkResult: props => () =>
      Promise.resolve()
        .then(() => this.clearInterval(props.timeId))
        .then(() => {
          console.log(props.playerOneTap, props.playerTwoTap)
          if (props.playerOneTap && !props.playerTwoTap)
            return props.playerOneWin()
          if (props.playerTwoTap && !props.playerOneTap)
            return props.playerTwoWin()
          if (props.playerOneTap === props.playerTwoTap)
            return props.setMessage("It's a tie !")
          if (props.playerOneTap < props.playerTwoTap)
            return props.playerOneWin()
          if (props.playerOneTap > props.playerTwoTap)
            return props.playerTwoWin()
        })
        .then(() => props.showResult())
        .then(() => setTimeout(() => props.reset(), 3000))
  }),
  withHandlers({
    onTap: props => player => {
      console.log(player)
      return (
        props.status === 'running' &&
        !props[`${player}Tap`] &&
        Promise.resolve().then(() => props.setPlayerTap(player, props.time))
      )
    },
    onRestartClick: props => () => {
      props.setPlayerCounter('playerOne', 0)
      props.setPlayerCounter('playerTwo', 0)
    },
    onStartClick: props => () => {
      return Promise.resolve()
        .then(() => {
          const time = Math.floor(Math.random() * 2 + 2) * 1000
          props.setTime(time)
          props.setStatus('running')
          return time
        })
        .then(time => {
          const timeId = this.setInterval(function() {
            time -= TIME_INTERVAL
            props.setTime(time)
            debugger
            if (time <= 0) {
              this.clearInterval(timeId)
              props.checkResult()
            }
          }, TIME_INTERVAL)
        })
    }
  })
)
export default enhancer
