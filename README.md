# SortDynamics

SortDynamics is an interactive, web-based sorting algorithm visualizer. It provides a real-time, animated view of how popular sorting algorithms work, making it easier to understand their internal mechanics and performance characteristics.

## Features

- **Interactive Animations**: Watch algorithms sort arrays in real-time with smooth, physics-inspired "rolling" and "shifting" animations.
- **Multiple Algorithms**:
  - 🫧 **Bubble Sort**: Adjacent comparisons and rolling swaps.
  - 🎯 **Selection Sort**: Minimum-finding scans with single swaps.
  - 📥 **Insertion Sort**: Lift-and-shift element insertion.
  - ⚡ **Quick Sort**: Pivot-based partitioning and recursive sorting.
  - 🔀 **Merge Sort**: In-place rotation merging with clear divide-and-conquer steps.
  - 📚 **Heap Sort**: Max-heap building and root extraction.
- **Dynamic Array Sizing**: Adjust the number of elements to sort on the fly (up to 20 elements).
- **Adjustable Speed**: Speed up or slow down animations to observe the algorithm in detail.
- **Live Statistics**: Tracks comparisons, swaps, and elapsed time during execution.
- **Educational Context**: Automatically updates an information panel with the algorithm's description, time/space complexities, stability, in-place traits, best use cases, and pseudocode.
- **Premium UI/UX**: Built with modern web design principles including glassmorphism, vibrant gradients, and intuitive controls.

## Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Pure CSS styling, flexbox layouts, CSS variables, and modern glassmorphism effects.
- **Vanilla JavaScript**: Core logic, DOM manipulation, state management, and `requestAnimationFrame` driven animations without external libraries.

## How to Run Locally

You don't need any special build tools to run SortDynamics. It's a static web application.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Priyanshu2228/SortDynamics.git
    cd SortDynamics
    ```

2.  **Open in your browser:**
    Simply open the `sorting.html` file in any modern web browser.
    *Alternatively, you can serve it using a simple local server if you prefer:*
    ```bash
    # Using python 3
    python -m http.server 8080
    
    # Or using npx
    npx http-server -p 8080
    ```
    Then navigate to `http://localhost:8080/sorting.html`.

## Usage

1.  **Select an Algorithm**: Use the dropdown menu to choose which sorting algorithm you want to visualize.
2.  **Adjust Settings**: Use the sliders to change the array size or animation speed.
3.  **Generate**: Click the "↻ Generate" button to create a new randomized array.
4.  **Start/Stop**: Click "▶ Start" to begin the visualization. You can pause the current run by clicking "⏹ Stop".
