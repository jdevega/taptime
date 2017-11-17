import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import enhancer from './components/appLogic'
import numeral from 'numeral'

const App = props => (
  <View style={styles.container}>
    <View style={styles.scores}>
      <View style={styles.score}>
        <Text style={styles.scoreText}>Player 1: {props.playerOneCounter}</Text>
      </View>
      <View style={styles.score}>
        <Text style={styles.scoreText}>Player 2: {props.playerTwoCounter}</Text>
      </View>
    </View>
    <View style={styles.playZone}>
      <TouchableOpacity
        style={[styles.tap, styles.playerOne]}
        onPress={() => props.onTap('playerOne')}
      >
        <Text>{props.playerOneTap ? 'TAPPED !' : 'TAP'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tap, styles.playerTwo]}
        onPress={props.onTap.bind(this, 'playerTwo')}
      >
        <Text>{props.playerTwoTap ? 'TAPPED !' : 'TAP'}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>
      {props.status === 'stopped' && (
        <TouchableOpacity
          onPress={props.onStartClick}
          style={[styles.footerArea, styles.newRoundButton]}
        >
          <Text>New Round</Text>
        </TouchableOpacity>
      )}
      {props.status === 'stopped' &&
        (props.playerOneCounter > 0 || props.playerTwoCounter > 0) && (
          <TouchableOpacity
            onPress={props.onRestartClick}
            style={[styles.footerArea, styles.restartButton]}
          >
            <Text>Restart</Text>
          </TouchableOpacity>
        )}
      {props.status === 'running' && (
        <View style={styles.footerArea}>
          {!props.hideTime && (
            <Text>Time left: {numeral(props.time / 1000).format('0.00')}</Text>
          )}
        </View>
      )}
      {props.status === 'showResult' && (
        <View style={styles.footerArea}>
          <Text>{props.message}</Text>
        </View>
      )}
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scores: {
    flex: 20,
    flexDirection: 'row',
    backgroundColor: 'blue'
  },
  score: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreText: {
    fontSize: 20,
    color: 'white'
  },
  playZone: {
    flex: 70,
    flexDirection: 'row',
    width: null,
    backgroundColor: 'red'
  },
  tap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerOne: {
    backgroundColor: 'green'
  },
  playerTwo: {
    backgroundColor: 'pink'
  },
  footer: {
    flex: 10,
    flexDirection: 'row',
    width: null,
    backgroundColor: 'purple',
    justifyContent: 'center'
  },
  footerArea: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    flex: 1
  },
  newRoundButton: {
    backgroundColor: 'green'
  },
  restartButton: {
    backgroundColor: 'red'
  }
})

export default enhancer(App)
