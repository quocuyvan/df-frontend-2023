/* eslint-disable react/jsx-no-bind */
import { OpenAIMessage } from 'api'
import { Chess } from 'chess.js'
import { Button } from 'components/Button'
import { useEffect, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { getChatCompletions } from '../api/chat/chat'

export default function Home() {
  const [game, setGame] = useState(new Chess())
  const [matchResult, setMatchResult] = useState('win')

  const msgs = useRef([] as OpenAIMessage[])
  const botPossibleMoves = useRef([] as string[])
  const recentMove = useRef('')

  useEffect(() => {
    msgs.current.push({
      role: 'system',
      content: `You are playing a game of chess against a user. Please tell me your move in algebraic notation (eg: e2-e4, eg: Be7, eg: Nxc4) and nothing else. Do not mention my moves.`,
    })
  }, [])

  useEffect(() => {
    if (game.turn() === 'b') {
      botPossibleMoves.current = game.moves()
      makeBOTMove()
    }
  }, [game, makeBOTMove])

  const safeGameMutate = (modify: (game: Chess) => void) => {
    setGame((g) => {
      const update = new Chess(g.fen())
      modify(update)
      return update
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function makeBOTMove() {
    if (
      game.isGameOver() ||
      game.isDraw() ||
      botPossibleMoves.current.length === 0
    )
      return

    const botPossibleMovesString = botPossibleMoves.current.join(' or ')
    msgs.current.push({
      role: 'user',
      content: `I play ${recentMove.current}. Your turn with the black side; and you must choose only one best move from the following available moves: ${botPossibleMovesString}.`,
    })

    // Use the OpenAI API to get the best move
    const openAIResponse = await getChatCompletions({
      model: 'openai/gpt-3.5-turbo',
      messages: msgs.current,
    })

    if (openAIResponse && openAIResponse.choices) {
      const responseContent = openAIResponse.choices[0].message.content

      if (responseContent !== '') {
        const bestMoves: string[] = responseContent.split(',')
        if (bestMoves.length > 0) {
          safeGameMutate((game) => {
            game.move(bestMoves[0])
          })
          msgs.current.push({ role: 'assistant', content: `${bestMoves[0]}` })
        }
      }
    }
  }

  const onDrop = (source: string, target: string, piece: string) => {
    let move = {}
    recentMove.current = `${piece[1]}${source}-${target}` // from-to
    safeGameMutate((game) => {
      try {
        move = game.move({
          from: source,
          to: target,
          promotion: piece[1].toLowerCase() ?? 'q',
        })
      } catch (error) {
        return 'snapback'
      }
    })

    if (!move) return false

    return true
  }

  const handleRestartGame = () => {
    // handle restart game
    setMatchResult('')
  }

  return (
    <div className="app">
      <div className="w-full min-h-screen flex-col flex justify-center items-center relative bg-white dark:bg-gray-700">
        <div className="sm:w-3/4 md:w-1/2 lg:w-1/3">
          {matchResult && (
            <div className="flex flex-col items-center p-5 gap-2 text-gray-900 dark:text-white z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow dark:bg-gray-700">
              {`You ${matchResult}!`}
              <Button appearance="primary" onClick={() => handleRestartGame()}>
                Restart game
              </Button>
            </div>
          )}
          <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
      </div>
    </div>
  )
}
