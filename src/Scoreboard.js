import React,{useState,useEffect,useRef} from 'react';
import { useAlert } from 'react-alert';

import './scoreBoard.css'

export default function Scoreboard(){
  const left = useRef(0);
  const right = useRef(0);
  const [leftScore, setLeftScore] = useState('00');
  const [rightScore, setRightScore] = useState('00');
  const [leftName, setLeftName] = useState('');
  const [rightName, setRightName] = useState('');
  const alert = useAlert()
  const plus = (direction) => {
    if(direction === 'left') {
      if(left.current <=99) {
        left.current = left.current + 1
        if(left.current <=9 ) {
          setLeftScore(`0${left.current}`)
        } else {
          setLeftScore(String(left.current))
        }
      }
    } else {
      if(right.current <= 99){
        right.current = right.current + 1
        if(right.current <=9 ) {
          setRightScore(`0${right.current}`)
        } else {
          setRightScore(String(right.current))
        }
      }
    }
    
  }
  const minus = (direction) => {
    if(direction === 'left') {
      if((+leftScore) >=1 ) {
        left.current = left.current - 1
        if(left.current <=9 ) {
          setLeftScore(`0${left.current}`)
        } else {
          setLeftScore(String(left.current))
        }
      }
    } else {
      if((+rightScore) >=1 ) {
        right.current = right.current - 1
        if(right.current <=9 ) {
          setRightScore(`0${right.current}`)
        } else {
          setRightScore(String(right.current))
        }
      }
    }
  }
  const reset = () => {
    setLeftScore('00')
    setRightScore('00')
    left.current = right.current = 0
  }
  const createTeam = direction => {
    alert.show(<div className='create-name-dialog'><span>Team Name</span><input type='text' onChange={e => {
      if(direction === 'left') {
        setLeftName(e.target.value)
      } else {
        setRightName(e.target.value)
      }
    }} /></div>)
  }
  return (
    <div>
      <h1>Score board</h1>
      <div className='team-name'>
        <div className='left'>
          {leftName ? leftName : <span className='create' onClick={() => createTeam('left')}>Click to Create Team Name</span>}
        </div>
        <div className='right'>
          {rightName ? rightName : <span className='create' onClick={() => createTeam('right')}>Click to Create Team Name</span>}
        </div>
      </div>
      <div className="main">
        <div className="left">
          <div className='half'>{leftScore.substring(0,1)}</div>
          <div className='half'>{leftScore.substring(1,2)}</div>
        </div>
        <div className="right">
          <div className='half'>{rightScore.substring(0,1)}</div>
          <div className='half'>{rightScore.substring(1,2)}</div>
        </div>
      </div>
      <div className='action'>
        <div className='left'>
          <div className='plus' onClick={() => plus('left')}>+</div>
          <div className='minus' onClick={() => minus('left')}>-</div>
        </div>
        <div className='reset' onClick={reset}>Reset</div>
        <div className='right'>
          <div className='plus' onClick={() => plus('right')}>+</div>
          <div className='minus' onClick={() => minus('right')}>-</div>
        </div>
      </div>
    </div>
  )
}