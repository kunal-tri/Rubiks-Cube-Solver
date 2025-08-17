# 🎲 Interactive Rubik's Cube Solver

A modern, web-based Rubik's cube solver with interactive 3D visualization, step-by-step solving guidance, and educational features. Built with Next.js and TypeScript for an engaging puzzle-solving experience.

![Rubik's Cube Solver](https://img.shields.io/badge/Status-Active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

### 🎮 Interactive Cube Manipulation
- **Visual 3D Cube**: Clean 2D net representation with hover animations
- **Manual Color Editing**: Click any square to cycle through colors
- **Random Scrambling**: Generate random cube configurations
- **Move Input**: Support for standard notation (U, R, F, D, L, B, U', R', etc.)

### 🧠 Solving Capabilities
- **Auto Solve**: Instant cube solving with detailed step breakdown
- **Guided Mode**: Step-by-step CFOP method instructions
- **Move History**: Track all user moves with undo suggestions
- **Solution Popup**: View complete solving sequence after auto-solve

### 📚 Educational Features
- **Notation Guide**: Complete reference for cube move symbols
- **CFOP Method**: 8-step guided solving approach
- **Algorithm Display**: Visual representation of solving algorithms
- **Progress Tracking**: Real-time move counting and statistics

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React

### Algorithm & Data Structure
- **Cube Representation**: 3D array structure (6 faces × 3×3 grid)
- **Solving Algorithm**: Hybrid approach with pattern-based moves
- **Move System**: Complete implementation of standard Rubik's cube moves
- **Guided Solving**: CFOP method (Cross → F2L → OLL → PLL)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/rubiks-cube-solver.git
   cd rubiks-cube-solver
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Basic Operations
1. **Scramble**: Click "Scramble" to randomize the cube
2. **Manual Moves**: Type moves in the input field (e.g., "R U R' U'")
3. **Auto Solve**: Click "Auto Solve" for instant solving with step breakdown
4. **Color Editing**: Click any cube square to change its color

### Guided Solving
1. Click "Guided Mode" for step-by-step CFOP instructions
2. Follow the 8-step solving process:
   - White Cross Formation
   - White Corners
   - Middle Layer Edges
   - Yellow Cross
   - Yellow Cross Orientation
   - Yellow Corners Position
   - Yellow Corners Orientation
   - Final Layer Permutation

### Move Notation
- **U, D, R, L, F, B**: Clockwise rotations
- **U', D', R', L', F', B'**: Counter-clockwise rotations
- Case insensitive input supported

## 🎯 Key Features Breakdown

### Interactive Elements
- **Hover Effects**: Smooth animations on cube faces and buttons
- **Click Interactions**: Color cycling and move input
- **Responsive Design**: Optimized for desktop and mobile
- **Modal Popups**: Solution steps and guided instructions

### Solving Algorithms
- **Random Move Generation**: Tries random moves until solved
- **Pattern Recognition**: Applies common algorithms every 20 moves
- **Educational Guidance**: CFOP method with detailed explanations
- **Move Optimization**: Efficient solving with minimal moves

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow existing code formatting
- Add comments for complex algorithms
- Test thoroughly before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic Rubik's cube solving algorithms
- Built with modern web technologies for educational purposes
- CFOP method implementation for guided solving
- Community feedback and contributions

## 📞 Support

If you have any questions or run into issues, please:
1. Check the [Issues](https://github.com/yourusername/rubiks-cube-solver/issues) page
2. Create a new issue with detailed description
3. Provide steps to reproduce any bugs

---

**Made with ❤️ for puzzle enthusiasts and learners**
