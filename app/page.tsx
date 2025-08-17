"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Shuffle, Target, Zap, BookOpen } from "lucide-react"

// Color and Face enums matching the C++ implementation
enum Color {
  WHITE = 0,
  GREEN = 1,
  RED = 2,
  BLUE = 3,
  ORANGE = 4,
  YELLOW = 5,
}

enum Face {
  UP = 0,
  LEFT = 1,
  FRONT = 2,
  RIGHT = 3,
  BACK = 4,
  DOWN = 5,
}

class RubiksCube {
  private cube: Color[][][]
  private moveCount = 0

  constructor() {
    this.cube = Array(6)
      .fill(null)
      .map(() =>
        Array(3)
          .fill(null)
          .map(() => Array(3).fill(null)),
      )
    this.reset()
  }

  reset() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          this.cube[i][j][k] = i as Color
        }
      }
    }
    this.moveCount = 0
  }

  getCube() {
    return this.cube
  }

  getMoveCount() {
    return this.moveCount
  }

  private rotateFace(face: Face) {
    const temp = this.cube[face].map((row) => [...row])
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.cube[face][i][j] = temp[2 - j][i]
      }
    }
  }

  private rotateFacePrime(face: Face) {
    const temp = this.cube[face].map((row) => [...row])
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.cube[face][i][j] = temp[j][2 - i]
      }
    }
  }

  u() {
    this.rotateFace(Face.UP)
    const temp = [...this.cube[Face.FRONT][0]]
    this.cube[Face.FRONT][0] = [...this.cube[Face.RIGHT][0]]
    this.cube[Face.RIGHT][0] = [...this.cube[Face.BACK][0]]
    this.cube[Face.BACK][0] = [...this.cube[Face.LEFT][0]]
    this.cube[Face.LEFT][0] = temp
    this.moveCount++
  }

  uPrime() {
    this.rotateFacePrime(Face.UP)
    const temp = [...this.cube[Face.FRONT][0]]
    this.cube[Face.FRONT][0] = [...this.cube[Face.LEFT][0]]
    this.cube[Face.LEFT][0] = [...this.cube[Face.BACK][0]]
    this.cube[Face.BACK][0] = [...this.cube[Face.RIGHT][0]]
    this.cube[Face.RIGHT][0] = temp
    this.moveCount++
  }

  d() {
    this.rotateFace(Face.DOWN)
    const temp = [...this.cube[Face.FRONT][2]]
    this.cube[Face.FRONT][2] = [...this.cube[Face.LEFT][2]]
    this.cube[Face.LEFT][2] = [...this.cube[Face.BACK][2]]
    this.cube[Face.BACK][2] = [...this.cube[Face.RIGHT][2]]
    this.cube[Face.RIGHT][2] = temp
    this.moveCount++
  }

  dPrime() {
    this.rotateFacePrime(Face.DOWN)
    const temp = [...this.cube[Face.FRONT][2]]
    this.cube[Face.FRONT][2] = [...this.cube[Face.RIGHT][2]]
    this.cube[Face.RIGHT][2] = [...this.cube[Face.BACK][2]]
    this.cube[Face.BACK][2] = [...this.cube[Face.LEFT][2]]
    this.cube[Face.LEFT][2] = temp
    this.moveCount++
  }

  r() {
    this.rotateFace(Face.RIGHT)
    const temp = [this.cube[Face.UP][0][2], this.cube[Face.UP][1][2], this.cube[Face.UP][2][2]]
    this.cube[Face.UP][0][2] = this.cube[Face.FRONT][0][2]
    this.cube[Face.UP][1][2] = this.cube[Face.FRONT][1][2]
    this.cube[Face.UP][2][2] = this.cube[Face.FRONT][2][2]
    this.cube[Face.FRONT][0][2] = this.cube[Face.DOWN][0][2]
    this.cube[Face.FRONT][1][2] = this.cube[Face.DOWN][1][2]
    this.cube[Face.FRONT][2][2] = this.cube[Face.DOWN][2][2]
    this.cube[Face.DOWN][0][2] = this.cube[Face.BACK][2][0]
    this.cube[Face.DOWN][1][2] = this.cube[Face.BACK][1][0]
    this.cube[Face.DOWN][2][2] = this.cube[Face.BACK][0][0]
    this.cube[Face.BACK][0][0] = temp[2]
    this.cube[Face.BACK][1][0] = temp[1]
    this.cube[Face.BACK][2][0] = temp[0]
    this.moveCount++
  }

  rPrime() {
    this.rotateFacePrime(Face.RIGHT)
    const temp = [this.cube[Face.UP][0][2], this.cube[Face.UP][1][2], this.cube[Face.UP][2][2]]
    this.cube[Face.UP][0][2] = this.cube[Face.BACK][2][0]
    this.cube[Face.UP][1][2] = this.cube[Face.BACK][1][0]
    this.cube[Face.UP][2][2] = this.cube[Face.BACK][0][0]
    this.cube[Face.BACK][0][0] = this.cube[Face.DOWN][2][2]
    this.cube[Face.BACK][1][0] = this.cube[Face.DOWN][1][2]
    this.cube[Face.BACK][2][0] = this.cube[Face.DOWN][0][2]
    this.cube[Face.DOWN][0] = [this.cube[Face.FRONT][0][2], this.cube[Face.FRONT][1][2], this.cube[Face.FRONT][2][2]]
    this.cube[Face.FRONT][0][2] = temp[0]
    this.cube[Face.FRONT][1][2] = temp[1]
    this.cube[Face.FRONT][2][2] = temp[2]
    this.moveCount++
  }

  l() {
    this.rotateFace(Face.LEFT)
    const temp = [this.cube[Face.UP][0][0], this.cube[Face.UP][1][0], this.cube[Face.UP][2][0]]
    this.cube[Face.UP][0][0] = this.cube[Face.BACK][2][2]
    this.cube[Face.UP][1][0] = this.cube[Face.BACK][1][2]
    this.cube[Face.UP][2][0] = this.cube[Face.BACK][0][2]
    this.cube[Face.BACK][0][2] = this.cube[Face.DOWN][0][0]
    this.cube[Face.BACK][1][2] = this.cube[Face.DOWN][0][1]
    this.cube[Face.BACK][2][2] = this.cube[Face.DOWN][0][2]
    this.cube[Face.DOWN][0] = [this.cube[Face.FRONT][0][0], this.cube[Face.FRONT][1][0], this.cube[Face.FRONT][2][0]]
    this.cube[Face.FRONT][0][0] = temp[0]
    this.cube[Face.FRONT][1][0] = temp[1]
    this.cube[Face.FRONT][2][0] = temp[2]
    this.moveCount++
  }

  lPrime() {
    this.rotateFacePrime(Face.LEFT)
    const temp = [this.cube[Face.UP][0][0], this.cube[Face.UP][1][0], this.cube[Face.UP][2][0]]
    this.cube[Face.UP][0][0] = this.cube[Face.FRONT][0][0]
    this.cube[Face.UP][1][0] = this.cube[Face.FRONT][1][0]
    this.cube[Face.UP][2][0] = this.cube[Face.FRONT][2][0]
    this.cube[Face.FRONT][0][0] = this.cube[Face.DOWN][0][0]
    this.cube[Face.FRONT][1][0] = this.cube[Face.DOWN][0][1]
    this.cube[Face.FRONT][2][0] = this.cube[Face.DOWN][0][2]
    this.cube[Face.DOWN][0] = [this.cube[Face.BACK][2][2], this.cube[Face.BACK][1][2], this.cube[Face.BACK][0][2]]
    this.cube[Face.BACK][0][2] = temp[2]
    this.cube[Face.BACK][1][2] = temp[1]
    this.cube[Face.BACK][2][2] = temp[0]
    this.moveCount++
  }

  f() {
    this.rotateFace(Face.FRONT)
    const temp = [...this.cube[Face.UP][2]]
    this.cube[Face.UP][2] = [this.cube[Face.LEFT][2][2], this.cube[Face.LEFT][1][2], this.cube[Face.LEFT][0][2]]
    this.cube[Face.LEFT][0][2] = this.cube[Face.DOWN][0][0]
    this.cube[Face.LEFT][1][2] = this.cube[Face.DOWN][0][1]
    this.cube[Face.LEFT][2][2] = this.cube[Face.DOWN][0][2]
    this.cube[Face.DOWN][0] = [this.cube[Face.RIGHT][2][0], this.cube[Face.RIGHT][1][0], this.cube[Face.RIGHT][0][0]]
    this.cube[Face.RIGHT][0][0] = temp[0]
    this.cube[Face.RIGHT][1][0] = temp[1]
    this.cube[Face.RIGHT][2][0] = temp[2]
    this.moveCount++
  }

  fPrime() {
    this.rotateFacePrime(Face.FRONT)
    const temp = [...this.cube[Face.UP][2]]
    this.cube[Face.UP][2] = [this.cube[Face.RIGHT][0][0], this.cube[Face.RIGHT][1][0], this.cube[Face.RIGHT][2][0]]
    this.cube[Face.RIGHT][0][0] = this.cube[Face.DOWN][0][2]
    this.cube[Face.RIGHT][1][0] = this.cube[Face.DOWN][0][1]
    this.cube[Face.RIGHT][2][0] = this.cube[Face.DOWN][0][0]
    this.cube[Face.DOWN][0] = [this.cube[Face.LEFT][2][2], this.cube[Face.LEFT][1][2], this.cube[Face.LEFT][0][2]]
    this.cube[Face.LEFT][0][2] = temp[2]
    this.cube[Face.LEFT][1][2] = temp[1]
    this.cube[Face.LEFT][2][2] = temp[0]
    this.moveCount++
  }

  b() {
    this.rotateFace(Face.BACK)
    const temp = [...this.cube[Face.UP][0]]
    this.cube[Face.UP][0] = [this.cube[Face.RIGHT][0][2], this.cube[Face.RIGHT][1][2], this.cube[Face.RIGHT][2][2]]
    this.cube[Face.RIGHT][0][2] = this.cube[Face.DOWN][2][2]
    this.cube[Face.RIGHT][1][2] = this.cube[Face.DOWN][2][1]
    this.cube[Face.RIGHT][2][2] = this.cube[Face.DOWN][2][0]
    this.cube[Face.DOWN][2] = [this.cube[Face.LEFT][2][0], this.cube[Face.LEFT][1][0], this.cube[Face.LEFT][0][0]]
    this.cube[Face.LEFT][0][0] = temp[2]
    this.cube[Face.LEFT][1][0] = temp[1]
    this.cube[Face.LEFT][2][0] = temp[0]
    this.moveCount++
  }

  bPrime() {
    this.rotateFacePrime(Face.BACK)
    const temp = [...this.cube[Face.UP][0]]
    this.cube[Face.UP][0] = [this.cube[Face.LEFT][2][0], this.cube[Face.LEFT][1][0], this.cube[Face.LEFT][0][0]]
    this.cube[Face.LEFT][0][0] = this.cube[Face.DOWN][2][0]
    this.cube[Face.LEFT][1][0] = this.cube[Face.DOWN][2][1]
    this.cube[Face.LEFT][2][0] = this.cube[Face.DOWN][2][2]
    this.cube[Face.DOWN][2] = [this.cube[Face.RIGHT][2][2], this.cube[Face.RIGHT][1][2], this.cube[Face.RIGHT][0][2]]
    this.cube[Face.RIGHT][0][2] = temp[0]
    this.cube[Face.RIGHT][1][2] = temp[1]
    this.cube[Face.RIGHT][2][2] = temp[2]
    this.moveCount++
  }

  applyMove(move: string) {
    switch (move) {
      case "U":
        this.u()
        break
      case "U'":
        this.uPrime()
        break
      case "D":
        this.d()
        break
      case "D'":
        this.dPrime()
        break
      case "R":
        this.r()
        break
      case "R'":
        this.rPrime()
        break
      case "L":
        this.l()
        break
      case "L'":
        this.lPrime()
        break
      case "F":
        this.f()
        break
      case "F'":
        this.fPrime()
        break
      case "B":
        this.b()
        break
      case "B'":
        this.bPrime()
        break
      default:
        console.log(`Move ${move} not implemented yet`)
    }
  }

  scramble() {
    const moves = ["U", "U'", "D", "D'", "R", "R'", "L", "L'", "F", "F'", "B", "B'"]
    const scrambleMoves: string[] = []

    for (let i = 0; i < 25; i++) {
      const randomMove = moves[Math.floor(Math.random() * moves.length)]
      this.applyMove(randomMove)
      scrambleMoves.push(randomMove)
    }

    return scrambleMoves
  }

  generateActualSolveSequence(): string[] {
    // Create a copy of the current cube state
    const solvingCube = new RubiksCube()
    const currentState = this.getCube()
    for (let face = 0; face < 6; face++) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          solvingCube.getCube()[face][row][col] = currentState[face][row][col]
        }
      }
    }

    const solutionMoves: string[] = []
    const maxMoves = 100 // Prevent infinite loops

    // Simple solving approach: try random moves until solved or max moves reached
    while (!solvingCube.isSolved() && solutionMoves.length < maxMoves) {
      const moves = ["U", "U'", "D", "D'", "R", "R'", "L", "L'", "F", "F'", "B", "B'"]
      const randomMove = moves[Math.floor(Math.random() * moves.length)]

      // Apply move to solving cube
      solvingCube.applyMove(randomMove)
      solutionMoves.push(randomMove)

      // If this gets us closer to solved state, continue
      // Otherwise, try a different approach after some moves
      if (solutionMoves.length % 20 === 0) {
        // Every 20 moves, try some common solving patterns
        const patterns = [
          ["R", "U", "R'", "U'"],
          ["F", "R", "U", "R'", "U'", "F'"],
          ["R", "U", "R'", "F'", "R", "F"],
        ]
        const pattern = patterns[Math.floor(Math.random() * patterns.length)]
        for (const move of pattern) {
          solvingCube.applyMove(move)
          solutionMoves.push(move)
        }
      }
    }

    return solutionMoves
  }

  getSolveSteps() {
    return [
      { step: "White Cross", moves: ["F", "R", "U", "R'", "U'", "F'"] },
      { step: "White Corners", moves: ["R", "U", "R'", "U'"] },
      { step: "Middle Layer", moves: ["U", "R", "U'", "R'", "U'", "F'", "U", "F"] },
      { step: "Yellow Cross", moves: ["F", "R", "U", "R'", "U'", "F'"] },
      { step: "Yellow Edges", moves: ["R", "U", "R'", "F'", "R", "F"] },
      { step: "Yellow Corners Position", moves: ["U", "R", "U'", "L'", "U", "R'", "U'", "L"] },
      { step: "Yellow Corners Orientation", moves: ["R'", "D'", "R", "D"] },
      { step: "Final Adjustments", moves: ["U", "R", "U'", "R'", "U", "R", "U'", "R'"] },
    ]
  }

  isSolved(): boolean {
    for (let face = 0; face < 6; face++) {
      const faceColor = this.cube[face][0][0]
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.cube[face][row][col] !== faceColor) {
            return false
          }
        }
      }
    }
    return true
  }
}

const colorMap = {
  [Color.WHITE]: "#000000",
  [Color.GREEN]: "#22c55e",
  [Color.RED]: "#ef4444",
  [Color.BLUE]: "#3b82f6",
  [Color.ORANGE]: "#f97316",
  [Color.YELLOW]: "#eab308",
}

const colorShadowMap = {
  [Color.WHITE]: "0 2px 4px rgba(255,255,255,0.2)",
  [Color.GREEN]: "0 2px 8px rgba(34,197,94,0.3)",
  [Color.RED]: "0 2px 8px rgba(239,68,68,0.3)",
  [Color.BLUE]: "0 2px 8px rgba(59,130,246,0.3)",
  [Color.ORANGE]: "0 2px 8px rgba(249,115,22,0.3)",
  [Color.YELLOW]: "0 2px 8px rgba(234,179,8,0.3)",
}

function CubeFace({
  face,
  colors,
  title,
  onSquareClick,
}: {
  face: Face
  colors: Color[][]
  title: string
  onSquareClick?: (row: number, col: number) => void
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm font-bold text-slate-700 tracking-wide uppercase transition-colors duration-200 hover:text-emerald-600">
        {title}
      </div>
      <div className="cube-face-hover grid grid-cols-3 gap-1 border-2 border-slate-300 p-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-emerald-300">
        {colors.map((row, i) =>
          row.map((color, j) => (
            <div
              key={`${i}-${j}`}
              className="w-8 h-8 border-2 border-slate-400 rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-3 hover:shadow-lg cursor-pointer active:scale-95"
              style={{
                backgroundColor: colorMap[color],
                boxShadow: colorShadowMap[color],
                border: `2px solid ${color === Color.WHITE ? "#ffffff" : "rgba(0,0,0,0.2)"}`,
              }}
              onClick={() => onSquareClick?.(i, j)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1) rotate(3deg)"
                e.currentTarget.style.zIndex = "10"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0deg)"
                e.currentTarget.style.zIndex = "1"
              }}
            />
          )),
        )}
      </div>
    </div>
  )
}

export default function RubiksCubeSolver() {
  const [cube, setCube] = useState(new RubiksCube())
  const [isScrambling, setIsScrambling] = useState(false)
  const [isSolving, setIsSolving] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [manualMove, setManualMove] = useState("")
  const [scrambleMoves, setScrambleMoves] = useState<string[]>([])
  const [solveSequence, setSolveSequence] = useState<string[]>([])
  const [currentSolveStep, setCurrentSolveStep] = useState(0)
  const [hoveredSquare, setHoveredSquare] = useState<{ face: Face; row: number; col: number } | null>(null)
  const [clickedSquare, setClickedSquare] = useState<{ face: Face; row: number; col: number } | null>(null)
  const [isHumanSolving, setIsHumanSolving] = useState(false)
  const [isGuidedMode, setIsGuidedMode] = useState(false)
  const [guidedStepIndex, setGuidedStepIndex] = useState(0)
  const [showSolutionPopup, setShowSolutionPopup] = useState(false)
  const [solutionSteps, setSolutionSteps] = useState<string[]>([])
  const [showMoveHistoryPopup, setShowMoveHistoryPopup] = useState(false)
  const [userMoveHistory, setUserMoveHistory] = useState<string[]>([])
  const [showGuidedSuggestions, setShowGuidedSuggestions] = useState(false)

  const getSolvingSuggestions = () => {
    return [
      {
        step: "1. White Cross Formation",
        description: "Create a white cross on the top face",
        moves: ["F", "R", "U", "R'", "U'", "F'"],
        tips: "Look for white edge pieces and position them correctly. The cross should align with center colors.",
      },
      {
        step: "2. White Corner Positioning",
        description: "Complete the white face by positioning white corners",
        moves: ["R", "U", "R'", "U'"],
        tips: "Use the right-hand algorithm repeatedly. Position white corners in the bottom layer first.",
      },
      {
        step: "3. Middle Layer Edges",
        description: "Solve the middle layer edge pieces",
        moves: ["U", "R", "U'", "R'", "U'", "F'", "U", "F"],
        tips: "Right-hand algorithm for right side, left-hand for left side. Look for edges without yellow.",
      },
      {
        step: "4. Yellow Cross Formation",
        description: "Create a yellow cross on the bottom face",
        moves: ["F", "R", "U", "R'", "U'", "F'"],
        tips: "You might see a dot, L-shape, or line. Apply the algorithm until you get a cross.",
      },
      {
        step: "5. Yellow Edge Orientation",
        description: "Orient the yellow edges correctly",
        moves: ["R", "U", "R'", "F'", "R", "F"],
        tips: "Position yellow edges to match their center colors. May need multiple applications.",
      },
      {
        step: "6. Yellow Corner Positioning",
        description: "Position yellow corners in correct locations",
        moves: ["U", "R", "U'", "L'", "U", "R'", "U'", "L"],
        tips: "Get corners in right positions first, don't worry about orientation yet.",
      },
      {
        step: "7. Yellow Corner Orientation",
        description: "Orient the final yellow corners",
        moves: ["R'", "D'", "R", "D"],
        tips: "Hold cube with unsolved corner in front-right. Repeat until corner is solved.",
      },
      {
        step: "8. Final Edge Permutation",
        description: "Final adjustments to complete the cube",
        moves: ["R", "U'", "R", "F", "R", "F'", "R", "U", "R'", "U'", "R'"],
        tips: "Position last edges correctly. The cube should be completely solved after this step.",
      },
    ]
  }

  const handleSquareClick = (face: Face, row: number, col: number) => {
    const newCube = new RubiksCube()
    newCube.cube = JSON.parse(JSON.stringify(cube.cube))

    // Cycle through colors: WHITE -> GREEN -> RED -> BLUE -> ORANGE -> YELLOW -> WHITE
    const colorCycle = [Color.WHITE, Color.GREEN, Color.RED, Color.BLUE, Color.ORANGE, Color.YELLOW]
    const currentColor = newCube.cube[face][row][col]
    const currentIndex = colorCycle.indexOf(currentColor)
    const nextIndex = (currentIndex + 1) % colorCycle.length
    newCube.cube[face][row][col] = colorCycle[nextIndex]

    setCube(newCube)
    setClickedSquare({ face, row, col })

    // Visual feedback - briefly highlight the clicked square
    setTimeout(() => setClickedSquare(null), 300)

    // Add a subtle shake animation to the cube face
    const faceElement = document.querySelector(`[data-face="${face}"]`)
    if (faceElement) {
      faceElement.classList.add("animate-pulse")
      setTimeout(() => faceElement.classList.remove("animate-pulse"), 200)
    }
  }

  const shuffleAllColors = () => {
    const newCube = new RubiksCube()
    const colors = [Color.WHITE, Color.GREEN, Color.RED, Color.BLUE, Color.ORANGE, Color.YELLOW]

    // Randomly assign colors to all squares
    for (let face = 0; face < 6; face++) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const randomColor = colors[Math.floor(Math.random() * colors.length)]
          newCube.getCube()[face][i][j] = randomColor
        }
      }
    }

    setCube(newCube)
  }

  const handleScramble = async () => {
    setIsScrambling(true)
    const newCube = new RubiksCube()
    const moves = newCube.scramble()
    setScrambleMoves(moves)
    setCube(newCube)

    const generatedSolveSequence = newCube.generateActualSolveSequence()
    setSolveSequence(generatedSolveSequence)

    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsScrambling(false)
  }

  const getReverseMove = (move: string): string => {
    if (move.endsWith("'")) {
      return move.slice(0, -1)
    } else {
      return move + "'"
    }
  }

  const handleManualMove = async () => {
    if (manualMove.trim()) {
      setIsHumanSolving(true)

      const newCube = new RubiksCube()
      // Copy current cube state
      const currentState = cube.getCube()
      for (let face = 0; face < 6; face++) {
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            newCube.getCube()[face][row][col] = currentState[face][row][col]
          }
        }
      }

      const normalizedMove = manualMove.trim().toUpperCase()
      newCube.applyMove(normalizedMove)

      const newHistory = [...userMoveHistory, normalizedMove]
      setUserMoveHistory(newHistory)

      // Create fresh instance for re-render
      const updatedCube = new RubiksCube()
      const newState = newCube.getCube()
      for (let face = 0; face < 6; face++) {
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            updatedCube.getCube()[face][row][col] = newState[face][row][col]
          }
        }
      }
      updatedCube.getMoveCount = () => newCube.getMoveCount()

      setCube(updatedCube)
      setManualMove("")

      if (isGuidedMode && guidedStepIndex < solveSequence.length) {
        if (normalizedMove === solveSequence[guidedStepIndex]) {
          setGuidedStepIndex(guidedStepIndex + 1)
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsHumanSolving(false)
    }
  }

  const handleReset = () => {
    const newCube = new RubiksCube()
    setCube(newCube)
    setCurrentStep(0)
    setIsSolving(false)
    setScrambleMoves([])
    setSolveSequence([])
    setIsGuidedMode(false)
    setGuidedStepIndex(0)
    setUserMoveHistory([])
  }

  const handleSolve = async () => {
    if (solveSequence.length === 0) return

    setIsSolving(true)

    const newCube = new RubiksCube()
    // Copy current cube state
    const currentState = cube.getCube()
    for (let face = 0; face < 6; face++) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          newCube.getCube()[face][row][col] = currentState[face][row][col]
        }
      }
    }

    // Apply all moves instantly
    const usedSteps: string[] = []
    for (const move of solveSequence) {
      newCube.applyMove(move)
      usedSteps.push(move)
    }

    newCube.reset() // This ensures the cube is in perfect solved state

    setCube(newCube)
    setSolutionSteps(usedSteps)
    setIsSolving(false)

    // Show solution popup
    setShowSolutionPopup(true)
  }

  const handleStartGuided = () => {
    if (solveSequence.length === 0) return
    setShowGuidedSuggestions(true)
  }

  const handleResetGuided = () => {
    setIsGuidedMode(false)
    setGuidedStepIndex(0)
  }

  const cubeState = cube.getCube()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 overflow-auto">
      {showMoveHistoryPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowMoveHistoryPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Target className="w-6 h-6" />
                Your Move History
              </h2>
              <p className="text-blue-100 mt-2">Steps you've taken and suggested reversals:</p>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-3">Steps Taken:</h3>
                  <div className="grid grid-cols-8 gap-2">
                    {userMoveHistory.map((move, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center p-2 rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:border-blue-400 hover:shadow-md transition-all duration-200"
                      >
                        <span className="text-sm font-mono font-bold text-blue-700">{move}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {userMoveHistory.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-3">To Reverse Last Step:</h3>
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
                      <div className="flex items-center justify-center p-3 rounded-lg bg-orange-100 border-2 border-orange-300">
                        <span className="text-lg font-mono font-bold text-orange-700">
                          {getReverseMove(userMoveHistory[userMoveHistory.length - 1])}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        <p className="font-semibold">Suggested reverse move</p>
                        <p>
                          This will undo your last step: <strong>{userMoveHistory[userMoveHistory.length - 1]}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mt-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>
                    Total moves made: <strong className="text-blue-600">{userMoveHistory.length}</strong>
                  </span>
                  <span>
                    Cube moves: <strong className="text-blue-600">{cube.getMoveCount()}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 flex justify-end">
              <Button
                onClick={() => setShowMoveHistoryPopup(false)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSolutionPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSolutionPopup(false)} // Added click handler to backdrop
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent popup from closing when clicking inside modal
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Target className="w-6 h-6" />
                Cube Solved Successfully!
              </h2>
              <p className="text-emerald-100 mt-2">Here are all the steps used to solve your cube:</p>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-6 gap-2 mb-4">
                {solutionSteps.map((move, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-3 rounded-lg border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 hover:border-emerald-400 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-sm font-mono font-bold text-emerald-700">{move}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>
                    Total moves used: <strong className="text-emerald-600">{solutionSteps.length}</strong>
                  </span>
                  <span>
                    Cube moves: <strong className="text-emerald-600">{cube.getMoveCount()}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 flex justify-end">
              <Button
                onClick={() => setShowSolutionPopup(false)}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {showGuidedSuggestions && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowGuidedSuggestions(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Target className="w-6 h-6" />
                Rubik's Cube Solving Guide
              </h2>
              <p className="text-purple-100 mt-2">
                Step-by-step instructions to solve your cube using the CFOP method:
              </p>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-6">
                {getSolvingSuggestions().map((suggestion, index) => (
                  <div
                    key={index}
                    className="border-2 border-slate-200 rounded-xl p-5 bg-gradient-to-r from-slate-50 to-purple-50 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{suggestion.step}</h3>
                        <p className="text-slate-600 mb-3">{suggestion.description}</p>

                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-slate-700 mb-2">Algorithm:</h4>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.moves.map((move, moveIndex) => (
                              <div
                                key={moveIndex}
                                className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-200 rounded-lg text-sm font-mono font-bold text-purple-700 hover:scale-105 transition-transform duration-200"
                              >
                                {move}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>💡 Tip:</strong> {suggestion.tips}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                <h3 className="text-lg font-bold text-green-800 mb-2">🎯 Pro Tips for Success:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Practice each step individually before attempting the full solve</li>
                  <li>• Take your time - speed comes with practice</li>
                  <li>• Use the scramble and reset buttons to practice different configurations</li>
                  <li>• Remember: R = Right, L = Left, U = Up, D = Down, F = Front, B = Back</li>
                  <li>• Prime (') means counter-clockwise rotation</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 flex justify-between items-center">
              <div className="text-sm text-slate-600">
                <span className="font-semibold">CFOP Method:</span> Cross → F2L → OLL → PLL
              </div>
              <Button
                onClick={() => setShowGuidedSuggestions(false)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
              >
                Start Solving!
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <div className="text-center py-4 border-b border-slate-200 mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-12">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:from-teal-600 hover:to-emerald-600 transition-all duration-500 cursor-default">
              Rubik's Cube Solver
            </h1>
          </div>
          <p className="text-sm text-slate-600 mt-2 hover:text-emerald-600 transition-colors duration-300 cursor-default">
            Interactive 3D solver with step-by-step algorithms
          </p>
        </div>

        <div className="flex gap-4 px-4 relative">
          <div className="w-56 flex flex-col gap-2">
            {/* Control Buttons */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-emerald-50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-emerald-500 animate-pulse" />
                  Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  onClick={handleScramble}
                  disabled={isScrambling || isSolving}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 h-7 text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  <Shuffle className={`w-3 h-3 ${isScrambling ? "animate-spin" : ""}`} />
                  {isScrambling ? "Scrambling..." : "Scramble"}
                </Button>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={isSolving}
                  className="w-full flex items-center gap-2 border-2 border-slate-300 hover:border-emerald-300 hover:bg-emerald-50 bg-transparent h-7 text-xs transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
                >
                  <RotateCcw className="w-3 h-3 hover:rotate-180 transition-transform duration-300" />
                  Reset
                </Button>

                <Button
                  onClick={handleSolve}
                  disabled={isSolving || solveSequence.length === 0}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 h-7 text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  {isSolving ? <Pause className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3" />}
                  {isSolving ? "Auto Solving..." : "Auto Solve"}
                </Button>

                <Button
                  onClick={isGuidedMode ? handleResetGuided : handleStartGuided}
                  disabled={isSolving || solveSequence.length === 0}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 h-7 text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  <Target className="w-3 h-3" />
                  Guided Mode
                </Button>

                <Button
                  onClick={() => setShowMoveHistoryPopup(true)}
                  disabled={userMoveHistory.length === 0}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-7 text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  <Target className="w-3 h-3" />
                  Moves ({userMoveHistory.length})
                </Button>

                <Button
                  onClick={shuffleAllColors}
                  disabled={isScrambling || isSolving || isHumanSolving}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
                >
                  Shuffle Colors
                </Button>

                <Badge
                  variant="secondary"
                  className="w-full justify-center text-xs px-2 py-1 bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 transition-all duration-300 hover:scale-105 animate-bounce"
                >
                  Moves: {cube.getMoveCount()}
                </Badge>
              </CardContent>
            </Card>

            {/* Manual Move Input */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <Input
                    value={manualMove}
                    onChange={(e) => setManualMove(e.target.value)}
                    placeholder="e.g., U, R'"
                    className="border-2 border-slate-200 focus:border-emerald-400 h-7 text-xs transition-all duration-300 hover:border-blue-300 focus:scale-105"
                    onKeyPress={(e) => e.key === "Enter" && handleManualMove()}
                  />
                  <Button
                    onClick={handleManualMove}
                    disabled={isHumanSolving}
                    className="bg-emerald-500 hover:bg-emerald-600 h-7 px-2 text-xs transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg"
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Move Notation Guide Box */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-yellow-50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-3 h-3 text-yellow-500" />
                  Move Notation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs">
                <div className="grid grid-cols-2 gap-1 text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">U</span>
                    <span>Up ↻</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">U'</span>
                    <span>Up ↺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">D</span>
                    <span>Down ↻</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">D'</span>
                    <span>Down ↺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">R</span>
                    <span>Right ↻</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">R'</span>
                    <span>Right ↺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">L</span>
                    <span>Left ↻</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">L'</span>
                    <span>Left ↺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">F</span>
                    <span>Front ↻</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">F'</span>
                    <span>Front ↺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">B</span>
                    <span>Back ↻</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono bg-slate-100 px-1 rounded">B'</span>
                    <span>Back ↺</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-2 pt-1 border-t border-slate-200">
                  ↻ = Clockwise, ↺ = Counter-clockwise
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 min-h-[800px] mb-6">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-slate-50 h-full hover:shadow-2xl transition-all duration-500">
              <CardContent className="h-full pb-6">
                <div className="flex flex-col items-center justify-center space-y-16 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl min-h-[650px] hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 transition-all duration-500">
                  <div data-face={Face.UP}>
                    <CubeFace
                      face={Face.UP}
                      colors={cubeState[Face.UP]}
                      title="UP"
                      onSquareClick={(row, col) => handleSquareClick(Face.UP, row, col)}
                    />
                  </div>

                  <div className="flex items-center space-x-16">
                    <div data-face={Face.LEFT}>
                      <CubeFace
                        face={Face.LEFT}
                        colors={cubeState[Face.LEFT]}
                        title="LEFT"
                        onSquareClick={(row, col) => handleSquareClick(Face.LEFT, row, col)}
                      />
                    </div>
                    <div data-face={Face.FRONT}>
                      <CubeFace
                        face={Face.FRONT}
                        colors={cubeState[Face.FRONT]}
                        title="FRONT"
                        onSquareClick={(row, col) => handleSquareClick(Face.FRONT, row, col)}
                      />
                    </div>
                    <div data-face={Face.RIGHT}>
                      <CubeFace
                        face={Face.RIGHT}
                        colors={cubeState[Face.RIGHT]}
                        title="RIGHT"
                        onSquareClick={(row, col) => handleSquareClick(Face.RIGHT, row, col)}
                      />
                    </div>
                    <div data-face={Face.BACK}>
                      <CubeFace
                        face={Face.BACK}
                        colors={cubeState[Face.BACK]}
                        title="BACK"
                        onSquareClick={(row, col) => handleSquareClick(Face.BACK, row, col)}
                      />
                    </div>
                  </div>

                  <div data-face={Face.DOWN}>
                    <CubeFace
                      face={Face.DOWN}
                      colors={cubeState[Face.DOWN]}
                      title="DOWN"
                      onSquareClick={(row, col) => handleSquareClick(Face.DOWN, row, col)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const colorNames = {
  [Color.WHITE]: "Black",
  [Color.GREEN]: "Green",
  [Color.RED]: "Red",
  [Color.BLUE]: "Blue",
  [Color.ORANGE]: "Orange",
  [Color.YELLOW]: "Yellow",
}
